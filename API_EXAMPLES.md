# Audio Library API - Usage Examples

Complete examples for testing and using the Audio Library API endpoints.

## Prerequisites

- Development server running: `php artisan serve`
- Base URL: `http://localhost:8000`
- Sample audio files (.mp3, .wav, .m4a)

## 1. List All Audios

### Basic Request
```bash
curl -X GET "http://localhost:8000/api/audios"
```

### With Pagination
```bash
curl -X GET "http://localhost:8000/api/audios?per_page=10"
```

### Response Example
```json
{
  "data": [
    {
      "id": 1,
      "title": "Sample Song",
      "description": "A great song",
      "file_path": "audios/550e8400-e29b-41d4-a716-446655440000.mp3",
      "file_url": "http://localhost:8000/storage/audios/550e8400-e29b-41d4-a716-446655440000.mp3",
      "duration": 240,
      "formatted_duration": "00:04:00",
      "file_size": 3145728,
      "formatted_file_size": "3 MB",
      "mime_type": "audio/mpeg",
      "status": "active",
      "created_at": "2026-06-16T10:30:00.000000Z",
      "updated_at": "2026-06-16T10:30:00.000000Z"
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/audios?page=1",
    "last": "http://localhost:8000/api/audios?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "path": "http://localhost:8000/api/audios",
    "per_page": 15,
    "to": 1,
    "total": 1
  }
}
```

## 2. Upload New Audio

### Using cURL
```bash
curl -X POST "http://localhost:8000/api/audios" \
  -H "Accept: application/json" \
  -F "title=My Favorite Song" \
  -F "description=This is my favorite song ever" \
  -F "file=@/path/to/audio.mp3"
```

### Using PowerShell
```powershell
$filePath = "C:\path\to\audio.mp3"
$form = @{
    title = "My Favorite Song"
    description = "This is my favorite song ever"
    file = Get-Item -Path $filePath
}
$response = Invoke-WebRequest -Uri "http://localhost:8000/api/audios" `
    -Method POST `
    -Form $form
$response.Content | ConvertFrom-Json
```

### Using Python
```python
import requests

url = "http://localhost:8000/api/audios"
files = {
    'file': open('/path/to/audio.mp3', 'rb')
}
data = {
    'title': 'My Favorite Song',
    'description': 'This is my favorite song ever'
}

response = requests.post(url, files=files, data=data)
print(response.json())
```

### Using JavaScript (Fetch API)
```javascript
const formData = new FormData();
formData.append('title', 'My Favorite Song');
formData.append('description', 'This is my favorite song ever');
formData.append('file', fileInput.files[0]);

fetch('http://localhost:8000/api/audios', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

### Using JavaScript (Axios)
```javascript
const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
};

const formData = new FormData();
formData.append('title', 'My Favorite Song');
formData.append('description', 'This is my favorite song ever');
formData.append('file', document.getElementById('file').files[0]);

axios.post('http://localhost:8000/api/audios', formData, config)
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
```

### Successful Response (201 Created)
```json
{
  "success": true,
  "message": "Audio uploaded successfully",
  "data": {
    "id": 1,
    "title": "My Favorite Song",
    "description": "This is my favorite song ever",
    "file_path": "audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "file_url": "http://localhost:8000/storage/audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "duration": 240,
    "formatted_duration": "00:04:00",
    "file_size": 3145728,
    "formatted_file_size": "3 MB",
    "mime_type": "audio/mpeg",
    "status": "active",
    "created_at": "2026-06-16T10:30:00.000000Z",
    "updated_at": "2026-06-16T10:30:00.000000Z"
  }
}
```

### Error Response (400 Bad Request - File Too Large)
```json
{
  "success": false,
  "message": "Failed to upload audio: File size exceeds maximum limit of 50MB"
}
```

### Error Response (422 Validation Error)
```json
{
  "message": "The given data was invalid.",
  "errors": {
    "title": [
      "The title field is required."
    ],
    "file": [
      "The file field is required."
    ]
  }
}
```

## 3. Get Audio Details

### Basic Request
```bash
curl -X GET "http://localhost:8000/api/audios/1"
```

### Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "My Favorite Song",
    "description": "This is my favorite song ever",
    "file_path": "audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "file_url": "http://localhost:8000/storage/audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "duration": 240,
    "formatted_duration": "00:04:00",
    "file_size": 3145728,
    "formatted_file_size": "3 MB",
    "mime_type": "audio/mpeg",
    "status": "active",
    "created_at": "2026-06-16T10:30:00.000000Z",
    "updated_at": "2026-06-16T10:30:00.000000Z"
  }
}
```

### Error Response (404 Not Found)
```json
{
  "success": false,
  "message": "Audio not found"
}
```

## 4. Update Audio Metadata

### Using cURL
```bash
curl -X PUT "http://localhost:8000/api/audios/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Song Title",
    "description": "Updated description"
  }'
```

### Using JavaScript
```javascript
const data = {
    title: "Updated Song Title",
    description: "Updated description"
};

fetch('http://localhost:8000/api/audios/1', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => console.log(data));
```

### Using Python
```python
import requests
import json

url = "http://localhost:8000/api/audios/1"
data = {
    "title": "Updated Song Title",
    "description": "Updated description"
}

response = requests.put(url, json=data)
print(response.json())
```

### Successful Response
```json
{
  "success": true,
  "message": "Audio updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Song Title",
    "description": "Updated description",
    "file_path": "audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "file_url": "http://localhost:8000/storage/audios/550e8400-e29b-41d4-a716-446655440000.mp3",
    "duration": 240,
    "formatted_duration": "00:04:00",
    "file_size": 3145728,
    "formatted_file_size": "3 MB",
    "mime_type": "audio/mpeg",
    "status": "active",
    "created_at": "2026-06-16T10:30:00.000000Z",
    "updated_at": "2026-06-16T10:30:01.000000Z"
  }
}
```

## 5. Delete Audio

### Using cURL
```bash
curl -X DELETE "http://localhost:8000/api/audios/1"
```

### Using JavaScript
```javascript
fetch('http://localhost:8000/api/audios/1', {
    method: 'DELETE'
})
.then(response => response.json())
.then(data => console.log(data));
```

### Successful Response
```json
{
  "success": true,
  "message": "Audio deleted successfully"
}
```

## 6. Search Audios

### Basic Search
```bash
curl -X GET "http://localhost:8000/api/audios/search?q=favorite"
```

### Search with Pagination
```bash
curl -X GET "http://localhost:8000/api/audios/search?q=favorite&per_page=10"
```

### Using JavaScript
```javascript
const query = 'favorite';
const perPage = 10;

fetch(`http://localhost:8000/api/audios/search?q=${query}&per_page=${perPage}`)
    .then(response => response.json())
    .then(data => console.log(data));
```

### Response
```json
{
  "data": [
    {
      "id": 1,
      "title": "My Favorite Song",
      "description": "This is my favorite song ever",
      "file_path": "audios/550e8400-e29b-41d4-a716-446655440000.mp3",
      "file_url": "http://localhost:8000/storage/audios/550e8400-e29b-41d4-a716-446655440000.mp3",
      "duration": 240,
      "formatted_duration": "00:04:00",
      "file_size": 3145728,
      "formatted_file_size": "3 MB",
      "mime_type": "audio/mpeg",
      "status": "active",
      "created_at": "2026-06-16T10:30:00.000000Z",
      "updated_at": "2026-06-16T10:30:00.000000Z"
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/audios/search?q=favorite&page=1",
    "last": "http://localhost:8000/api/audios/search?q=favorite&page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "path": "http://localhost:8000/api/audios/search",
    "per_page": 15,
    "to": 1,
    "total": 1
  }
}
```

### Error Response (No Query)
```json
{
  "success": false,
  "message": "Search query is required"
}
```

## 7. Get Statistics

### Basic Request
```bash
curl -X GET "http://localhost:8000/api/audios/statistics"
```

### Using JavaScript
```javascript
fetch('http://localhost:8000/api/audios/statistics')
    .then(response => response.json())
    .then(data => console.log(data));
```

### Response
```json
{
  "success": true,
  "data": {
    "total_audios": 5,
    "total_storage_bytes": 15728640,
    "total_storage_formatted": "15 MB"
  }
}
```

## Testing with Postman

### 1. Create Collection
- Name: "Audio Library API"

### 2. Create Environment Variables
```json
{
  "base_url": "http://localhost:8000",
  "api_url": "http://localhost:8000/api"
}
```

### 3. Create Requests

#### List Audios
```
GET {{api_url}}/audios
```

#### Upload Audio
```
POST {{api_url}}/audios
Body:
  form-data:
    - title: "My Song"
    - description: "My description"
    - file: [select audio.mp3]
```

#### Get Audio
```
GET {{api_url}}/audios/1
```

#### Update Audio
```
PUT {{api_url}}/audios/1
Body (raw JSON):
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

#### Delete Audio
```
DELETE {{api_url}}/audios/1
```

#### Search Audio
```
GET {{api_url}}/audios/search?q=keyword
```

#### Statistics
```
GET {{api_url}}/audios/statistics
```

## Testing with Thunder Client (VS Code Extension)

Create a `.thunder-collection.json` file in your project root:

```json
{
  "client": "Thunder Client",
  "collectionName": "Audio Library API",
  "dateExport": "2026-06-16T10:00:00.000Z",
  "version": "1.1",
  "folders": [
    {
      "name": "Audio Management",
      "requests": [
        {
          "name": "List Audios",
          "method": "GET",
          "url": "http://localhost:8000/api/audios",
          "params": [
            {"name": "per_page", "value": "15"}
          ]
        },
        {
          "name": "Upload Audio",
          "method": "POST",
          "url": "http://localhost:8000/api/audios",
          "body": {
            "type": "formdata",
            "formdata": [
              {"name": "title", "value": "Test Audio"},
              {"name": "description", "value": "Test Description"},
              {"name": "file", "type": "file"}
            ]
          }
        }
      ]
    }
  ]
}
```

## Common Test Scenarios

### Scenario 1: Complete Upload and Retrieval Flow
```bash
# 1. Upload audio
UPLOAD_RESPONSE=$(curl -s -X POST "http://localhost:8000/api/audios" \
  -F "title=Test Song" \
  -F "description=Test Description" \
  -F "file=@test.mp3")

# Extract ID from response
AUDIO_ID=$(echo $UPLOAD_RESPONSE | grep -o '"id":[0-9]*' | head -1 | grep -o '[0-9]*')

# 2. Get audio details
curl -X GET "http://localhost:8000/api/audios/$AUDIO_ID"

# 3. Update audio
curl -X PUT "http://localhost:8000/api/audios/$AUDIO_ID" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title"}'

# 4. Delete audio
curl -X DELETE "http://localhost:8000/api/audios/$AUDIO_ID"
```

### Scenario 2: Search and Pagination
```bash
# 1. Upload multiple audios
for i in {1..5}; do
  curl -X POST "http://localhost:8000/api/audios" \
    -F "title=Song $i" \
    -F "file=@song.mp3"
done

# 2. List with pagination
curl -X GET "http://localhost:8000/api/audios?per_page=2"

# 3. Search
curl -X GET "http://localhost:8000/api/audios/search?q=Song"

# 4. Get statistics
curl -X GET "http://localhost:8000/api/audios/statistics"
```

## Troubleshooting API Calls

### Issue: 404 Not Found
**Cause**: Endpoint doesn't exist or ID is invalid
**Solution**: 
- Check endpoint path matches routes
- Verify audio ID exists: `GET /api/audios`
- Clear route cache: `php artisan route:clear`

### Issue: 422 Validation Error
**Cause**: Invalid request data
**Solution**: 
- Check required fields in request
- Verify field types and formats
- Check file size and type for uploads

### Issue: 500 Server Error
**Cause**: Application error
**Solution**: 
- Check Laravel logs: `tail -f storage/logs/laravel.log`
- Ensure storage directory is writable
- Verify database connection

### Issue: File Upload Fails
**Cause**: File too large or wrong format
**Solution**: 
- Check file size (max 50MB)
- Verify file format (mp3, wav, m4a)
- Check server upload limits in php.ini

## Performance Testing

### Load Test with Apache Bench
```bash
# Test list endpoint with 100 requests, 10 concurrent
ab -n 100 -c 10 "http://localhost:8000/api/audios"

# Test with POST data
ab -n 100 -c 10 -p data.json -T application/json \
  "http://localhost:8000/api/audios/search?q=test"
```

### Load Test with wrk
```bash
# Install wrk (macOS)
brew install wrk

# Run load test
wrk -t12 -c400 -d30s "http://localhost:8000/api/audios"
```

## API Response Time Expectations

| Endpoint | Method | Expected Time |
|----------|--------|---------------|
| List audios | GET | < 200ms |
| Upload audio | POST | < 5000ms (depends on file size) |
| Get audio | GET | < 100ms |
| Update audio | PUT | < 100ms |
| Delete audio | DELETE | < 100ms |
| Search | GET | < 200ms |
| Statistics | GET | < 100ms |

## Next Steps

1. Save examples as `.sh` files for easy testing
2. Set up Postman collection for team sharing
3. Implement automated API testing
4. Monitor performance in production
5. Add authentication when required
