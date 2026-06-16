# SEO Description Generation for Lessons

Hướng dẫn tạo SEO descriptions duy nhất cho từng bài học từ database.

## 🚀 Quick Start

### 1. Kiểm tra database đã sẵn sàng

```bash
# Trong project api-hoccungbe
npm install  # Nếu chưa install
```

### 2. Chạy SEO generation

```bash
npm run seed:seo
```

**Quá trình:**
1. Connect đến MySQL database
2. Fetch tất cả lessons
3. Generate unique SEO descriptions
4. Update vào `seoDescription` column
5. Show samples

**Output:**
```
🚀 Starting SEO Description Generation...

✅ Found 45 lessons

📝 Generating SEO descriptions...

✅ 10/45 descriptions generated
✅ 20/45 descriptions generated
...
✅ Successfully generated 45 descriptions

📄 Sample generated descriptions:

🔹 Lesson 1: Chữ cái A, a
   Bài học "Chữ cái A, a" giúp bé nắm vững chữ cái trong chương trình Tiếng Việt...

✅ Generation Complete!
```

---

## 📋 Implementation Details

### Database Schema

Added `seoDescription` column to `lessons` table:

```sql
ALTER TABLE lessons ADD COLUMN seoDescription LONGTEXT NULL;
```

**Note:** Với TypeORM `synchronize: true`, schema tự động update khi entity thay đổi.

### Entity Update

File: `src/modules/lessons/entities/lesson.entity.ts`

```typescript
@Column({ type: 'longtext', nullable: true })
seoDescription?: string;
```

### Generation Algorithm

**Deterministic** - Mỗi bài luôn có cùng description:

```
Lesson ID Hash = ID % 4
```

**Variation Components:**
- 4 opening sentences (rotate by ID)
- 3-4 content variations per type (Language, Math, Science, Generic)
- 4 closing sentences (rotate by ID)

**Lesson Type Detection:**
- **Language:** courseTitle includes 'việt'/'anh', lessonTitle includes 'chữ'/'từ'/'âm'
- **Math:** courseTitle includes 'toán'/'số', lessonTitle includes 'đếm'/'tính'/'nhiều'/'ít'
- **Science:** courseTitle includes 'khoa học'/'tự nhiên', lessonTitle includes 'động vật'/'thực vật'
- **Generic:** All others

### Example Generated Content

**Bài 3: Nhiều hơn, ít hơn, bằng nhau** (Math - ID=3, hash=3)
```
Với bài "Nhiều hơn, ít hơn, bằng nhau", bé có cơ hội phát triển tư duy 
so sánh từ từ qua bài học bài bản. Luyện tập không ngừng. Video sinh động, 
bài tập đa dạng, kiểm tra kiến thức tổng hợp giúp bé nắm vững. Nội dung 
được thiết kế vui vẻ và khắc sâu kiến thức.
```

**Bài 5: Chữ cái A, a** (Language - ID=5, hash=1)
```
Trong bài "Chữ cái A, a", bé sẽ phát triển kỹ năng chữ cái một cách tự 
nhiên. Bé sẽ khám phá và học hỏi. Qua video hấp dẫn, bài tập đa dạng, 
bài kiểm tra ngắn, bé sẽ thấy tiến bộ từng ngày. Nội dung được thiết kế 
vui vẻ và khắc sâu kiến thức.
```

---

## 🔄 How It Works

```
npm run seed:seo
    ↓
Load TypeORM connection
    ↓
Query MySQL: SELECT id, title, courseTitle FROM lessons
    ↓
For each lesson:
  - Detect type (Language/Math/Science/Generic)
  - Extract keywords from title
  - Generate unique description using lesson ID hash
    ↓
UPDATE lessons SET seoDescription = '...' WHERE id = ?
    ↓
Show sample results
```

---

## ✅ Files Modified/Created

| File | Action | Description |
|------|--------|-------------|
| `src/modules/lessons/entities/lesson.entity.ts` | Modified | Added `seoDescription` column |
| `src/database/generate-seo-descriptions.ts` | **NEW** | Generation script |
| `package.json` | Modified | Added `seed:seo` script |

---

## 🔧 Troubleshooting

### "Error: connect ECONNREFUSED"
MySQL not running or wrong credentials.

**Solution:**
```bash
# Check .env
DB_HOST=localhost      # or your host
DB_PORT=3306          # or your port
DB_USERNAME=root      # or your username
DB_PASSWORD=          # or your password
DB_NAME=hoccungbe     # or your database
```

### "Unknown column 'seoDescription'"
TypeORM synchronize not enabled or entity not loaded.

**Solution:**
- Restart dev server: `npm run start:dev`
- Check `src/app.module.ts` has `synchronize: true`

### All lessons generated but nothing appears
Database not synced or wrong table name.

**Solution:**
```bash
# Check table structure
mysql -u root -p hoccungbe
DESCRIBE lessons;
# Should show: seoDescription | longtext | YES
```

---

## 📊 Results

After running `npm run seed:seo`:

✅ All lessons have unique descriptions  
✅ Descriptions saved to `seoDescription` column  
✅ Frontend automatically uses them  
✅ SEO optimized for search engines  

---

## 🔗 Integration with Frontend

Frontend (`hoccungbe` Next.js app) automatically uses:

File: `app/components/edu/LessonDetailPage.tsx`

```typescript
const seoText = lesson.seoDescription || generateAutoSeoDescription(lesson);
```

If `seoDescription` exists in DB → use it  
Otherwise → generate on-the-fly (fallback)

---

## 📝 Next Steps

1. ✅ Run: `npm run seed:seo`
2. ✅ Verify in database: `SELECT id, title, seoDescription FROM lessons LIMIT 5`
3. ✅ Check on frontend: Each lesson page shows unique SEO section
4. ✅ Test Google: Inspect page meta tags

Done! 🎉
