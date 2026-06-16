<?php

namespace App\Repositories;

use App\Models\Audio;

class AudioRepository
{
    /**
     * Get all active audios.
     *
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function getAllAudios(int $perPage = 15)
    {
        return Audio::where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get audio by ID.
     *
     * @param int $id
     * @return \App\Models\Audio|null
     */
    public function getAudioById(int $id): ?Audio
    {
        return Audio::find($id);
    }

    /**
     * Create a new audio.
     *
     * @param array $data
     * @return \App\Models\Audio
     */
    public function createAudio(array $data): Audio
    {
        return Audio::create($data);
    }

    /**
     * Update audio.
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function updateAudio(int $id, array $data): bool
    {
        $audio = Audio::find($id);

        if (!$audio) {
            return false;
        }

        return $audio->update($data);
    }

    /**
     * Delete audio (soft delete).
     *
     * @param int $id
     * @return bool
     */
    public function deleteAudio(int $id): bool
    {
        $audio = Audio::find($id);

        if (!$audio) {
            return false;
        }

        return $audio->update(['status' => 'deleted']);
    }

    /**
     * Search audios by title.
     *
     * @param string $title
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function searchAudioByTitle(string $title, int $perPage = 15)
    {
        return Audio::where('status', 'active')
            ->where('title', 'like', '%' . $title . '%')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    /**
     * Get total count of active audios.
     *
     * @return int
     */
    public function getTotalCount(): int
    {
        return Audio::where('status', 'active')->count();
    }

    /**
     * Get total storage used.
     *
     * @return int
     */
    public function getTotalStorageUsed(): int
    {
        return Audio::where('status', 'active')->sum('file_size');
    }
}
