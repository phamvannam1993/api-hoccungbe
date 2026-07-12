-- Seed kỹ năng + gắn bài học vào kỹ năng theo môn (course.courseType).
-- Chạy sau phase2b-skills-reports.sql. An toàn chạy lại.

INSERT IGNORE INTO `skills` (`code`,`name`,`subject`,`description`,`icon`,`isActive`) VALUES
  ('doc-hieu','Đọc hiểu','language','Hiểu nội dung bài đọc','📖',1),
  ('tu-vung','Từ vựng','language','Vốn từ tiếng Việt','🔤',1),
  ('luyen-tu-cau','Luyện từ và câu','language','Từ loại, kiểu câu, dấu câu','✏️',1),
  ('chinh-ta','Chính tả','language','Viết đúng chính tả','📝',1),
  ('dem-so','Đếm & số lượng','math','Nhận biết số, đếm','🔢',1),
  ('cong-tru','Cộng trừ','math','Phép cộng, phép trừ','➕',1),
  ('nhan-chia','Nhân chia','math','Phép nhân, phép chia','✖️',1),
  ('tu-duy-toan','Tư duy toán','math','Suy luận, giải toán','🧠',1),
  ('nghe-noi-en','Nghe nói tiếng Anh','english','Nghe và phát âm','🎧',1),
  ('tu-vung-en','Từ vựng tiếng Anh','english','Vốn từ tiếng Anh','🅰️',1);

-- Gắn mỗi bài học đã publish vào tất cả kỹ năng cùng môn với khóa học của nó.
INSERT IGNORE INTO `lesson_skills` (`lessonId`,`skillId`,`weight`)
SELECT l.id, s.id, 1
FROM `lessons` l
JOIN `courses` c ON c.id = l.courseId
JOIN `skills` s ON s.subject = c.courseType COLLATE utf8mb4_unicode_ci
WHERE l.isPublished = 1;
