<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAudioRequest;
use App\Http\Requests\UpdateAudioRequest;
use App\Http\Resources\AudioResource;
use App\Models\Audio;
use App\Repositories\AudioRepository;
use App\Services\AudioStorageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AudioController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param AudioRepository $audioRepository
     * @param AudioStorageService $storageService
     */
    public function __construct(
        protected AudioRepository $audioRepository,
        protected AudioStorageService $storageService
    ) {}

    /**
     * Get list of all audios.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $perPage = $request->query('per_page', 15);
        $audios = $this->audioRepository->getAllAudios((int) $perPage);

        return AudioResource::collection($audios);
    }

    /**
     * Store a newly created audio.
     *
     * @param StoreAudioRequest $request
     * @return JsonResponse
     */
    public function store(StoreAudioRequest $request): JsonResponse
    {
        try {
            $file = $request->file('file');

            // Store the audio file
            $fileData = $this->storageService->storeAudioFile($file);

            // Create audio record
            $audio = $this->audioRepository->createAudio([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'file_path' => $fileData['path'],
                'duration' => $fileData['duration'],
                'file_size' => $fileData['file_size'],
                'mime_type' => $fileData['mime_type'],
                'status' => 'active',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Audio uploaded successfully',
                'data' => new AudioResource($audio),
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Failed to upload audio', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to upload audio: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Get audio details.
     *
     * @param Audio $audio
     * @return JsonResponse
     */
    public function show(Audio $audio): JsonResponse
    {
        if ($audio->status === 'deleted') {
            return response()->json([
                'success' => false,
                'message' => 'Audio not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => new AudioResource($audio),
        ]);
    }

    /**
     * Update audio metadata.
     *
     * @param UpdateAudioRequest $request
     * @param Audio $audio
     * @return JsonResponse
     */
    public function update(UpdateAudioRequest $request, Audio $audio): JsonResponse
    {
        if ($audio->status === 'deleted') {
            return response()->json([
                'success' => false,
                'message' => 'Audio not found',
            ], 404);
        }

        try {
            $updateData = $request->only(['title', 'description']);

            $this->audioRepository->updateAudio($audio->id, $updateData);

            $audio->refresh();

            return response()->json([
                'success' => true,
                'message' => 'Audio updated successfully',
                'data' => new AudioResource($audio),
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to update audio', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update audio: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Delete audio.
     *
     * @param Audio $audio
     * @return JsonResponse
     */
    public function destroy(Audio $audio): JsonResponse
    {
        if ($audio->status === 'deleted') {
            return response()->json([
                'success' => false,
                'message' => 'Audio not found',
            ], 404);
        }

        try {
            // Delete file from storage
            $this->storageService->deleteAudioFile($audio->file_path);

            // Mark as deleted in database
            $this->audioRepository->deleteAudio($audio->id);

            return response()->json([
                'success' => true,
                'message' => 'Audio deleted successfully',
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to delete audio', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete audio: ' . $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Search audios by title.
     *
     * @param Request $request
     * @return JsonResponse|AnonymousResourceCollection
     */
    public function search(Request $request): JsonResponse|AnonymousResourceCollection
    {
        $query = $request->query('q');

        if (!$query) {
            return response()->json([
                'success' => false,
                'message' => 'Search query is required',
            ], 400);
        }

        $perPage = $request->query('per_page', 15);
        $audios = $this->audioRepository->searchAudioByTitle($query, (int) $perPage);

        return AudioResource::collection($audios);
    }

    /**
     * Get audio statistics.
     *
     * @return JsonResponse
     */
    public function statistics(): JsonResponse
    {
        try {
            $totalCount = $this->audioRepository->getTotalCount();
            $totalStorageUsed = $this->audioRepository->getTotalStorageUsed();

            // Format storage
            $storageService = app(AudioStorageService::class);
            $audioInstance = new Audio();
            $formattedStorage = $audioInstance->formatFileSize($totalStorageUsed);

            return response()->json([
                'success' => true,
                'data' => [
                    'total_audios' => $totalCount,
                    'total_storage_bytes' => $totalStorageUsed,
                    'total_storage_formatted' => $formattedStorage,
                ],
            ]);
        } catch (\Exception $e) {
            \Log::error('Failed to get statistics', ['error' => $e->getMessage()]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to get statistics',
            ], 400);
        }
    }
}
