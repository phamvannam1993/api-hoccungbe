# Audio Library API - Quick Start Guide

Get the Audio Library API up and running in 5 minutes.

## Prerequisites

- PHP 8.2+
- Composer
- An audio file (.mp3, .wav, or .m4a)

## 5-Minute Setup

### Step 1: Create Project Structure (Already Done)
All files have been created in the project. You just need to set up the database.

### Step 2: Configure Environment
```bash
cd /Users/phamvannam/nam/demo-php/api-hoccungbe

# Copy the audio environment file
cp .env.audio.example .env

# If .env doesn't exist, also copy from example
# cp .env.example .env
```

### Step 3: Generate Application Key (if needed)
```bash
php artisan key:generate
```

### Step 4: Create Storage Directories
```bash
# Create audios directory
mkdir -p storage/app/audios
chmod -R 775 storage
```

### Step 5: Run Migrations
```bash
php artisan migrate
```

### Step 6: Start Development Server
```bash
php artisan serve
```

The API is now available at `http://localhost:8000`

## Test the API (2 minutes)

### In another terminal:

```bash
# 1. List audios (should be empty)
curl http://localhost:8000/api/audios

# 2. Upload an audio file
curl -X POST http://localhost:8000/api/audios \
  -F "title=My First Audio" \
  -F "description=This is my first audio" \
  -F "file=@/path/to/your/audio.mp3"

# 3. List audios again (should show your uploaded audio)
curl http://localhost:8000/api/audios

# 4. Get statistics
curl http://localhost:8000/api/audios/statistics
```

## File Structure

```
Key files created:
├── app/Models/Audio.php                         # Data model
├── app/Repositories/AudioRepository.php         # Data access
├── app/Services/AudioStorageService.php         # File management
├── app/Http/Controllers/Api/AudioController.php # API endpoints
├── app/Http/Requests/                           # Validation
├── database/migrations/                         # Database schema
├── routes/api.php                               # API routes
├── config/audio.php                             # Configuration
└── AUDIO_API_DOCUMENTATION.md                   # Full docs
```

## API Endpoints

| Method | URL | Purpose |
|--------|-----|---------|
| GET | `/api/audios` | List all audios |
| POST | `/api/audios` | Upload new audio |
| GET | `/api/audios/{id}` | Get audio details |
| PUT | `/api/audios/{id}` | Update audio info |
| DELETE | `/api/audios/{id}` | Delete audio |
| GET | `/api/audios/search?q=...` | Search by title |
| GET | `/api/audios/statistics` | Get statistics |

## Example: Upload and Retrieve

```bash
# Upload audio
curl -X POST http://localhost:8000/api/audios \
  -F "title=Song" \
  -F "description=My song" \
  -F "file=@song.mp3"

# Response (note the ID)
# {
#   "success": true,
#   "message": "Audio uploaded successfully",
#   "data": {
#     "id": 1,
#     "title": "Song",
#     ...
#   }
# }

# Get the audio (use ID from response)
curl http://localhost:8000/api/audios/1

# Update
curl -X PUT http://localhost:8000/api/audios/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Song"}'

# Delete
curl -X DELETE http://localhost:8000/api/audios/1
```

## Features Included

- ✓ Upload audio files (MP3, WAV, M4A)
- ✓ Automatic duration detection
- ✓ File size validation (max 50MB)
- ✓ Search by title
- ✓ Full CRUD operations
- ✓ Pagination
- ✓ Storage statistics
- ✓ Soft delete (recoverable)
- ✓ Comprehensive error handling
- ✓ JSON API responses

## Troubleshooting

### "Audio not found"
- Make sure the audio ID exists
- Check: `curl http://localhost:8000/api/audios`

### "File size exceeds maximum"
- File is larger than 50MB
- Use smaller files or increase limit in .env

### "No such file or directory"
- Storage directory doesn't exist
- Create it: `mkdir -p storage/app/audios`

### Database error
- Run migrations: `php artisan migrate`
- Check `.env` database configuration

### Port 8000 already in use
```bash
# Use different port
php artisan serve --port=8001
```

## Documentation

For detailed information, see:

- **Full API Docs**: `AUDIO_API_DOCUMENTATION.md`
- **Setup Instructions**: `SETUP_GUIDE.md`
- **Code Examples**: `API_EXAMPLES.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`

## Next Steps

1. **Test the API** with the examples above
2. **Read** `AUDIO_API_DOCUMENTATION.md` for full API details
3. **Integrate** with your frontend application
4. **Add authentication** when ready (future enhancement)
5. **Deploy** to production (see SETUP_GUIDE.md)

## Quick Command Reference

```bash
# Start server
php artisan serve

# Run migrations
php artisan migrate

# Clear cache
php artisan cache:clear

# View logs
tail -f storage/logs/laravel.log

# List routes
php artisan route:list

# Reset everything
php artisan migrate:reset && php artisan migrate
```

## API Response Format

### Success (200, 201)
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error (400, 422, 500)
```json
{
  "success": false,
  "message": "Error description"
}
```

## Environment Variables

Key settings in `.env`:

```env
AUDIO_STORAGE_PATH=audios              # Where files are stored
AUDIO_MAX_SIZE=52428800                # Max file size (50MB)
AUDIO_AUTO_DETECT_DURATION=true        # Auto-detect audio length
AUDIO_DEFAULT_PER_PAGE=15              # Items per page
```

## Testing Tools

Use any of these to test the API:

- **cURL** (command line)
- **Postman** (desktop app)
- **Thunder Client** (VS Code)
- **Insomnia** (API client)
- **Curl commands** (see API_EXAMPLES.md)

## Ready to Go!

Your Audio Library API is now ready to use. Start with:

```bash
# 1. Start server
php artisan serve

# 2. In another terminal, test upload
curl -X POST http://localhost:8000/api/audios \
  -F "title=Test" \
  -F "file=@audio.mp3"

# 3. View your audio
curl http://localhost:8000/api/audios
```

## Support

Need help?

1. Check the troubleshooting section above
2. Read `SETUP_GUIDE.md` for detailed setup
3. See `AUDIO_API_DOCUMENTATION.md` for API details
4. Check Laravel docs: https://laravel.com/docs

---

**All files are production-ready. Start testing now!**
