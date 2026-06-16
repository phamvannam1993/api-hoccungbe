# Audio Library API - Setup Guide

Complete setup instructions for the Audio Library backend API system.

## Prerequisites

- PHP 8.2 or higher
- Laravel 12.x or higher
- Composer
- SQLite or MySQL database
- (Optional) FFmpeg for automatic audio duration detection

## Installation Steps

### 1. Install Dependencies

If this is a new Laravel project, install dependencies:

```bash
cd /Users/phamvannam/nam/demo-php/api-hoccungbe
composer install
```

### 2. Create Storage Directories

Create the necessary storage directories:

```bash
# Create audios storage directory
mkdir -p storage/app/audios
mkdir -p storage/app/public

# Set proper permissions
chmod -R 775 storage/app/audios
chmod -R 775 storage
```

### 3. Create Storage Symbolic Link

Make audio files publicly accessible:

```bash
php artisan storage:link
```

This creates a symlink at `public/storage` pointing to `storage/app/public`. For audio files, you may need to configure this differently or access files through the API.

### 4. Configure Environment Variables

Update your `.env` file with audio-specific settings:

```env
# Database configuration
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

# Audio storage configuration
AUDIO_STORAGE_DISK=local
AUDIO_STORAGE_PATH=audios
AUDIO_MAX_SIZE=52428800
AUDIO_AUTO_DETECT_DURATION=true
AUDIO_SOFT_DELETE=true
AUDIO_DEFAULT_PER_PAGE=15
AUDIO_MAX_PER_PAGE=100
```

### 5. Run Database Migrations

Execute migrations to create the audios table:

```bash
php artisan migrate
```

This will:
- Create the `audios` table with all required columns
- Create indexes on `title` and `status` columns

To rollback (if needed):

```bash
php artisan migrate:rollback
```

### 6. Register the Service Provider (If Using New Installation)

If using a new Laravel installation, register the AudioServiceProvider in `config/app.php`:

```php
'providers' => [
    // ... existing providers
    App\Providers\AudioServiceProvider::class,
],
```

**Note**: If using Laravel 11+, you may need to manually load the provider or register it in a bootstrap file since auto-discovery might not apply to your custom service provider.

### 7. Verify Routes Are Registered

Ensure your `routes/api.php` file exists and contains the audio routes. Check by running:

```bash
php artisan route:list | grep audios
```

You should see output like:
```
GET|HEAD   /api/audios                                         audios.index
POST       /api/audios                                         audios.store
GET|HEAD   /api/audios/search                                  audios.search
GET|HEAD   /api/audios/statistics                              audios.statistics
GET|HEAD   /api/audios/{audio}                                 audios.show
PUT|PATCH  /api/audios/{audio}                                 audios.update
DELETE     /api/audios/{audio}                                 audios.destroy
```

### 8. Install Optional Dependencies

For automatic audio duration detection, install FFmpeg and getID3:

**FFmpeg Installation:**

```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt-get install ffmpeg

# CentOS
sudo yum install ffmpeg
```

**getID3 Library (PHP):**

```bash
composer require james-heinrich/getid3
```

If ffmpeg or getID3 is not available, the API will still work but won't be able to automatically detect audio duration.

### 9. Test the API

Start the development server:

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

Test the API endpoints:

```bash
# Test list audios (should return empty list)
curl http://localhost:8000/api/audios

# Test upload (requires an audio file)
curl -X POST http://localhost:8000/api/audios \
  -F "title=Test Audio" \
  -F "description=Test Description" \
  -F "file=@/path/to/audio.mp3"

# Test statistics
curl http://localhost:8000/api/audios/statistics
```

## Project Structure

```
api-hoccungbe/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/
│   │   │       └── AudioController.php          # API endpoints
│   │   ├── Requests/
│   │   │   ├── StoreAudioRequest.php            # Upload validation
│   │   │   └── UpdateAudioRequest.php           # Update validation
│   │   └── Resources/
│   │       └── AudioResource.php                # Response formatting
│   ├── Models/
│   │   └── Audio.php                            # Audio model with accessors
│   ├── Repositories/
│   │   └── AudioRepository.php                  # Data access layer
│   ├── Services/
│   │   └── AudioStorageService.php              # File storage logic
│   └── Providers/
│       └── AudioServiceProvider.php             # Service registration
├── config/
│   └── audio.php                                # Audio configuration
├── database/
│   └── migrations/
│       └── 2026_06_16_000001_create_audios_table.php  # Database schema
├── routes/
│   └── api.php                                  # API routes
├── storage/
│   └── app/
│       └── audios/                              # Audio files storage
├── AUDIO_API_DOCUMENTATION.md                   # API documentation
└── SETUP_GUIDE.md                               # This file
```

## File Locations and Purposes

### Controllers
- **AudioController.php**: Handles all HTTP requests for audio endpoints
  - index(): List audios with pagination
  - store(): Upload new audio
  - show(): Get audio details
  - update(): Update audio metadata
  - destroy(): Delete audio
  - search(): Search audios by title
  - statistics(): Get storage statistics

### Models
- **Audio.php**: Represents audio database record
  - Fillable properties for mass assignment
  - Type casting for dates and numbers
  - Accessor methods for formatting

### Repositories
- **AudioRepository.php**: Data access layer
  - getAllAudios(): Get paginated list
  - getAudioById(): Get single audio
  - createAudio(): Create new record
  - updateAudio(): Update record
  - deleteAudio(): Mark as deleted
  - searchAudioByTitle(): Search functionality
  - getTotalCount(): Get statistics
  - getTotalStorageUsed(): Get storage info

### Services
- **AudioStorageService.php**: File management
  - storeAudioFile(): Upload and validate file
  - deleteAudioFile(): Remove file from storage
  - getAudioDuration(): Extract audio metadata
  - validateFile(): Validate file specifications
  - generateUniqueFilename(): Create unique names

### Requests (Validation)
- **StoreAudioRequest.php**: Validates upload requests
  - title: Required, string, max 255
  - description: Optional, string, max 1000
  - file: Required, audio file, max 50MB

- **UpdateAudioRequest.php**: Validates update requests
  - title: Optional, string, max 255
  - description: Optional, string, max 1000

### Resources (Response Formatting)
- **AudioResource.php**: Formats audio data for API responses
  - Includes all audio properties
  - Adds file URL
  - Formats sizes and durations

## Database Schema

The `audios` table includes:

```sql
CREATE TABLE audios (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NULL,
  file_path VARCHAR(255) NOT NULL,
  duration INT UNSIGNED NULL,
  file_size BIGINT UNSIGNED NOT NULL,
  mime_type VARCHAR(255) NOT NULL,
  status ENUM('active', 'deleted') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL,
  INDEX idx_title (title),
  INDEX idx_status (status)
);
```

## Troubleshooting

### Issue: Routes not found (404)

**Solution:**
1. Ensure `routes/api.php` exists and contains audio routes
2. Clear route cache: `php artisan route:clear`
3. Check RouteServiceProvider configuration

### Issue: File upload fails

**Solution:**
1. Check storage directory permissions: `chmod -R 775 storage`
2. Verify disk configuration in config/filesystems.php
3. Check PHP `upload_max_filesize` and `post_max_size` settings

### Issue: Audio duration not detected

**Solution:**
1. Install ffmpeg: `brew install ffmpeg` (macOS) or `apt-get install ffmpeg` (Linux)
2. Verify ffprobe is in system PATH: `which ffprobe`
3. Or install getID3: `composer require james-heinrich/getid3`

### Issue: Database migration fails

**Solution:**
1. Ensure database connection is configured in `.env`
2. For SQLite, ensure database directory exists: `mkdir -p database`
3. Check Laravel logs: `tail -f storage/logs/laravel.log`

### Issue: Permission denied creating storage directory

**Solution:**
1. Use `sudo` to create directories
2. Or contact your system administrator to set proper permissions
3. Ensure the web server user has write access

## Configuration Options

Edit `.env` to customize behavior:

```env
# Storage location
AUDIO_STORAGE_DISK=local
AUDIO_STORAGE_PATH=audios

# File upload limits (bytes)
AUDIO_MAX_SIZE=52428800  # 50MB

# Features
AUDIO_AUTO_DETECT_DURATION=true
AUDIO_SOFT_DELETE=true

# Pagination
AUDIO_DEFAULT_PER_PAGE=15
AUDIO_MAX_PER_PAGE=100
```

## Security Checklist

- [ ] Create `.env` from `.env.example`
- [ ] Set `APP_KEY`: Run `php artisan key:generate`
- [ ] Ensure storage directories have proper permissions
- [ ] Configure database with strong credentials
- [ ] Enable HTTPS in production
- [ ] Implement authentication middleware (future)
- [ ] Set up rate limiting (future)
- [ ] Enable CORS if needed (separate configuration)

## Performance Tips

1. **Database Optimization**
   - Indexes on `title` and `status` are already created
   - Consider adding index on `created_at` for time-based queries

2. **Caching**
   - Consider caching statistics query
   - Implement Redis for large deployments

3. **File Management**
   - Clean up deleted files periodically
   - Consider S3 storage for large-scale deployments

4. **Query Optimization**
   - Use pagination to limit result sets
   - Monitor slow queries in logs

## Next Steps

After setup, consider:

1. **Testing**: Write unit and feature tests for endpoints
2. **Authentication**: Implement user authentication and authorization
3. **Rate Limiting**: Add API rate limiting
4. **Documentation**: Generate API docs with tools like Swagger/OpenAPI
5. **Monitoring**: Set up logging and error tracking
6. **CI/CD**: Configure continuous integration and deployment
7. **Performance**: Profile and optimize for production

## Support and Documentation

- Full API Documentation: See `AUDIO_API_DOCUMENTATION.md`
- Laravel Documentation: https://laravel.com/docs
- API Endpoints: `/api/audios` (all endpoints)

## Development Commands

```bash
# Start development server
php artisan serve

# Run migrations
php artisan migrate

# Reset migrations (CAREFUL - deletes data)
php artisan migrate:reset

# View routes
php artisan route:list

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# View logs (real-time)
php artisan pail

# Run tests (when added)
php artisan test

# Generate API documentation (if installed)
php artisan api:docs
```

## License

This project is open-source software. All code is provided as-is for the Audio Library system.
