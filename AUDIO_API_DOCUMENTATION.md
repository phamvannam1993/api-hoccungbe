# Audio Library API Documentation

Complete backend API implementation for the Audio Library system in Laravel.

## Project Structure

### Database
- **Migration**: `database/migrations/2026_06_16_000001_create_audios_table.php`
  - Creates `audios` table with all required columns
  - Indexes on title and status for optimized queries

### Models
- **Audio Model**: `app/Models/Audio.php`
  - Fillable attributes for mass assignment
  - Type casting for dates and integers
  - Accessor methods for formatted file size and duration

### Repositories
- **AudioRepository**: `app/Repositories/AudioRepository.php`
  - Data access layer following Repository pattern
  - Methods: getAllAudios, getAudioById, createAudio, updateAudio, deleteAudio, searchAudioByTitle
  - Additional utility methods for statistics

### Services
- **AudioStorageService**: `app/Services/AudioStorageService.php`
  - File upload handling with validation
  - Audio metadata extraction (duration, MIME type, size)
  - File deletion and management
  - Support for mp3, wav, and m4a formats
  - Maximum file size: 50MB

### HTTP Layer
- **AudioController**: `app/Http/Controllers/Api/AudioController.php`
  - RESTful API endpoints
  - Request validation and error handling
  - JSON responses with consistent format
  - Dependency injection for Repository and Service

### Requests
- **StoreAudioRequest**: `app/Http/Requests/StoreAudioRequest.php`
  - Validates: title (required, max 255), description (optional), file (required, mimes, max 50MB)
- **UpdateAudioRequest**: `app/Http/Requests/UpdateAudioRequest.php`
  - Validates: title (optional, max 255), description (optional)

### Resources
- **AudioResource**: `app/Http/Resources/AudioResource.php`
  - Formats audio data for API responses
  - Includes file URL, formatted sizes, and timestamps

### Routes
- **api.php**: `routes/api.php`
  - All endpoints prefixed with `/api/audios`
  - RESTful resource routes with additional search and statistics endpoints

## API Endpoints

### 1. List All Audios
```
GET /api/audios?per_page=15
```

**Query Parameters:**
- `per_page` (optional): Number of items per page (default: 15)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Sample Audio",
      "description": "A sample audio file",
      "file_path": "audios/550e8400-e29b-41d4-a716-446655440000.mp3",
      "file_url": "http://localhost/storage/audios/550e8400-e29b-41d4-a716-446655440000.mp3",
      "duration": 180,
      "formatted_duration": "00:03:00",
      "file_size": 2097152,
      "formatted_file_size": "2 MB",
      "mime_type": "audio/mpeg",
      "status": "active",
      "created_at": "2026-06-16T10:30:00+00:00",
      "updated_at": "2026-06-16T10:30:00+00:00"
    }
  ],
  "links": {...},
  "meta": {...}
}
```

### 2. Upload New Audio
```
POST /api/audios
Content-Type: multipart/form-data
```

**Request Body:**
```
title: string (required, max 255 characters)
description: string (optional, max 1000 characters)
file: file (required, mimes: mp3, wav, m4a, max 50MB)
```

**Example cURL:**
```bash
curl -X POST http://localhost/api/audios \
  -H "Accept: application/json" \
  -F "title=My Audio" \
  -F "description=Audio description" \
  -F "file=@path/to/audio.mp3"
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Audio uploaded successfully",
  "data": {
    "id": 1,
    "title": "My Audio",
    "description": "Audio description",
    "file_path": "audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "file_url": "http://localhost/storage/audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "duration": 180,
    "formatted_duration": "00:03:00",
    "file_size": 2097152,
    "formatted_file_size": "2 MB",
    "mime_type": "audio/mpeg",
    "status": "active",
    "created_at": "2026-06-16T10:30:00+00:00",
    "updated_at": "2026-06-16T10:30:00+00:00"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Failed to upload audio: File size exceeds maximum limit of 50MB"
}
```

### 3. Get Audio Details
```
GET /api/audios/{id}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Sample Audio",
    "description": "A sample audio file",
    "file_path": "audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "file_url": "http://localhost/storage/audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "duration": 180,
    "formatted_duration": "00:03:00",
    "file_size": 2097152,
    "formatted_file_size": "2 MB",
    "mime_type": "audio/mpeg",
    "status": "active",
    "created_at": "2026-06-16T10:30:00+00:00",
    "updated_at": "2026-06-16T10:30:00+00:00"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Audio not found"
}
```

### 4. Update Audio Metadata
```
PUT /api/audios/{id}
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "description": "Updated description"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Audio updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Title",
    "description": "Updated description",
    ...
  }
}
```

### 5. Delete Audio
```
DELETE /api/audios/{id}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Audio deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Audio not found"
}
```

### 6. Search Audios by Title
```
GET /api/audios/search?q=query&per_page=15
```

**Query Parameters:**
- `q` (required): Search query string
- `per_page` (optional): Number of items per page (default: 15)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Sample Audio",
      ...
    }
  ],
  "links": {...},
  "meta": {...}
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Search query is required"
}
```

### 7. Get Audio Statistics
```
GET /api/audios/statistics
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "total_audios": 5,
    "total_storage_bytes": 104857600,
    "total_storage_formatted": "100 MB"
  }
}
```

## Database Schema

### audios Table

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | BIGINT UNSIGNED | No | AUTO_INCREMENT | Primary key |
| title | VARCHAR(255) | No | - | Audio title |
| description | TEXT | Yes | NULL | Audio description |
| file_path | VARCHAR(255) | No | - | Path to audio file in storage |
| duration | UNSIGNED INT | Yes | NULL | Duration in seconds |
| file_size | UNSIGNED BIGINT | No | - | File size in bytes |
| mime_type | VARCHAR(255) | No | - | MIME type of audio file |
| status | ENUM('active', 'deleted') | No | 'active' | Audio status |
| created_at | TIMESTAMP | Yes | NULL | Creation timestamp |
| updated_at | TIMESTAMP | Yes | NULL | Update timestamp |

**Indexes:**
- Primary: id
- Index: title
- Index: status

## Setup Instructions

### 1. Create Migration
```bash
# Run migration to create audios table
php artisan migrate
```

### 2. Create Storage Directory
```bash
# Create storage directory for audios
mkdir -p storage/audios
chmod -R 775 storage/audios
```

### 3. Create Storage Link (Optional)
```bash
# Create symlink for public access
php artisan storage:link
```

### 4. Environment Configuration
Add the following to `.env`:
```env
AUDIO_MAX_SIZE=52428800
AUDIO_STORAGE_PATH=audios
```

### 5. Dependencies (Optional)
If you want automatic audio duration detection:
```bash
# Install getID3 library
composer require james-heinrich/getid3

# Or use ffprobe (system command)
# Mac: brew install ffmpeg
# Linux: apt-get install ffmpeg
```

## Validation Rules

### Upload Audio (StoreAudioRequest)
- `title`: Required, String, Max 255 characters
- `description`: Optional, String, Max 1000 characters
- `file`: Required, File, MIME types (audio/mpeg, audio/wav, audio/mp4), Max 50MB

### Update Audio (UpdateAudioRequest)
- `title`: Optional, String, Max 255 characters
- `description`: Optional, String, Max 1000 characters

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes
- `200 OK`: Successful GET, PUT, DELETE request
- `201 Created`: Successful POST request
- `400 Bad Request`: Validation error or file upload error
- `404 Not Found`: Audio not found

## File Storage

- **Storage Location**: `storage/app/audios/`
- **Public Access**: `storage/audios/` (after running `php artisan storage:link`)
- **File Naming**: UUID-based unique filenames to prevent conflicts
- **Supported Formats**: MP3, WAV, M4A
- **Max File Size**: 50MB

## Features

1. **RESTful API**: Standard REST conventions for CRUD operations
2. **Pagination**: List and search endpoints support pagination
3. **Search**: Full-text search by audio title
4. **File Management**: Automatic file storage and deletion
5. **Metadata**: Automatic extraction of audio duration
6. **Soft Delete**: Audio files are soft-deleted (marked as deleted, not removed)
7. **Validation**: Comprehensive input validation
8. **Error Handling**: Consistent error responses with helpful messages
9. **Resource Formatting**: Consistent JSON response structure
10. **Repository Pattern**: Clean separation of concerns

## Security Considerations

1. **File Validation**: Files are validated by MIME type, extension, and size
2. **File Naming**: UUID-based naming prevents file path traversal attacks
3. **Status Checks**: Deleted files cannot be accessed or modified
4. **Error Logging**: All errors are logged for debugging

## Performance Optimization

1. **Database Indexes**: Indexed on title and status for fast queries
2. **Pagination**: Large result sets are paginated automatically
3. **Eager Loading**: Ready for query optimization with relationships
4. **Soft Deletes**: Files marked as deleted without physical removal

## Future Enhancements

1. Add authentication and authorization
2. Add role-based access control
3. Implement rate limiting
4. Add audio file processing (conversion, compression)
5. Add user-specific audio libraries
6. Add sharing and permissions system
7. Add audio tagging and categories
8. Add advanced search filters
9. Add analytics and statistics tracking
10. Add batch upload support

## Testing

Example API calls:

```bash
# List audios
curl http://localhost/api/audios

# Upload audio
curl -X POST http://localhost/api/audios \
  -F "title=My Audio" \
  -F "description=My Description" \
  -F "file=@audio.mp3"

# Get audio details
curl http://localhost/api/audios/1

# Update audio
curl -X PUT http://localhost/api/audios/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"New Title","description":"New Description"}'

# Delete audio
curl -X DELETE http://localhost/api/audios/1

# Search audio
curl "http://localhost/api/audios/search?q=keyword"

# Get statistics
curl http://localhost/api/audios/statistics
```
