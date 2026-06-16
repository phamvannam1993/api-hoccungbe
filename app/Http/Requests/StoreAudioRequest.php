<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAudioRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'file' => 'required|file|mimes:mp3,wav,m4a|max:51200', // max 50MB in KB
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The audio title is required.',
            'title.max' => 'The audio title may not be greater than 255 characters.',
            'file.required' => 'The audio file is required.',
            'file.file' => 'The file must be a valid file.',
            'file.mimes' => 'The file must be an audio file (mp3, wav, or m4a).',
            'file.max' => 'The file size may not be greater than 50MB.',
            'description.max' => 'The description may not be greater than 1000 characters.',
        ];
    }
}
