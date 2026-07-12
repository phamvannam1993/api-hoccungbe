-- =============================================================================
-- HOCCUNGBE — MIGRATION GỘP (Giai đoạn 1 + 2)
-- Chạy MỘT PHÁT trên DB vì synchronize đang tắt. TẤT CẢ an toàn chạy lại nhiều lần
-- (IF NOT EXISTS / INSERT IGNORE). Thứ tự: tạo bảng trước → seed dữ liệu sau.
--
-- Cách chạy:
--   mysql -h <host> -u <user> -p <database> < 00-full-migration.sql
-- Gộp từ: attempts-tables, phase2-tables, phase2b-skills-reports,
--         phase2-seed, phase2c-skills-seed.
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- [1/5] GIAI ĐOẠN 1 — Lưu kết quả làm bài chi tiết
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS `quiz_attempts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `childId` int unsigned NOT NULL,
  `lessonId` int unsigned NOT NULL,
  `courseId` int unsigned DEFAULT NULL,
  `exerciseNumber` tinyint unsigned NOT NULL DEFAULT '1',
  `difficultyLevel` enum('easy','medium','hard') DEFAULT NULL,
  `totalQuestions` int unsigned NOT NULL DEFAULT '0',
  `correctCount` int unsigned NOT NULL DEFAULT '0',
  `score` decimal(5,2) NOT NULL DEFAULT '0.00',
  `timeSpentSec` int unsigned NOT NULL DEFAULT '0',
  `status` enum('in_progress','completed') NOT NULL DEFAULT 'completed',
  `completedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_qa_child_lesson` (`childId`,`lessonId`),
  KEY `IDX_qa_child_created` (`childId`,`createdAt`),
  CONSTRAINT `FK_qa_child` FOREIGN KEY (`childId`) REFERENCES `children_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_qa_lesson` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `attempt_answers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `attemptId` int unsigned NOT NULL,
  `quizId` int unsigned NOT NULL,
  `childId` int unsigned NOT NULL,
  `isCorrect` tinyint(1) NOT NULL DEFAULT '0',
  `selectedAnswer` json DEFAULT NULL,
  `timeSpentSec` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `IDX_aa_child_correct` (`childId`,`isCorrect`),
  KEY `IDX_aa_child_quiz` (`childId`,`quizId`),
  CONSTRAINT `FK_aa_attempt` FOREIGN KEY (`attemptId`) REFERENCES `quiz_attempts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_aa_quiz` FOREIGN KEY (`quizId`) REFERENCES `quizzes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- [2/5] GIAI ĐOẠN 2 — streaks, gợi ý, thông báo, chứng nhận, huy hiệu, nhiệm vụ
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS `learning_streaks` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `childId` int unsigned NOT NULL,
  `currentStreak` int unsigned NOT NULL DEFAULT '0',
  `longestStreak` int unsigned NOT NULL DEFAULT '0',
  `totalActiveDays` int unsigned NOT NULL DEFAULT '0',
  `lastActiveDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_streak_child` (`childId`),
  CONSTRAINT `FK_streak_child` FOREIGN KEY (`childId`) REFERENCES `children_profiles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `daily_recommendations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `childId` int unsigned NOT NULL,
  `forDate` date NOT NULL,
  `lessonId` int unsigned NOT NULL,
  `courseId` int unsigned DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `status` enum('pending','done','skipped') NOT NULL DEFAULT 'pending',
  `sortOrder` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `IDX_rec_child_date` (`childId`,`forDate`),
  CONSTRAINT `FK_rec_child` FOREIGN KEY (`childId`) REFERENCES `children_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_rec_lesson` FOREIGN KEY (`lessonId`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `userId` int unsigned DEFAULT NULL,
  `childId` int unsigned DEFAULT NULL,
  `type` varchar(50) NOT NULL DEFAULT 'system',
  `title` varchar(255) NOT NULL,
  `body` text,
  `data` json DEFAULT NULL,
  `scheduledAt` datetime DEFAULT NULL,
  `sentAt` datetime DEFAULT NULL,
  `readAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_notif_user_read` (`userId`,`readAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `certificates` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `childId` int unsigned NOT NULL,
  `courseId` int unsigned NOT NULL,
  `code` varchar(40) NOT NULL,
  `title` varchar(255) NOT NULL,
  `issuedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `meta` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_cert_code` (`code`),
  UNIQUE KEY `UQ_cert_child_course` (`childId`,`courseId`),
  CONSTRAINT `FK_cert_child` FOREIGN KEY (`childId`) REFERENCES `children_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cert_course` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `badges` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `points` int unsigned NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_badge_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `child_badges` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `childId` int unsigned NOT NULL,
  `badgeId` int unsigned NOT NULL,
  `earnedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_child_badge` (`childId`,`badgeId`),
  CONSTRAINT `FK_cb_child` FOREIGN KEY (`childId`) REFERENCES `children_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cb_badge` FOREIGN KEY (`badgeId`) REFERENCES `badges` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `quests` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `code` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(40) NOT NULL,
  `target` int unsigned NOT NULL DEFAULT '1',
  `rewardPoints` int unsigned NOT NULL DEFAULT '0',
  `rewardBadgeCode` varchar(50) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_quest_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `child_quest_progress` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `childId` int unsigned NOT NULL,
  `questId` int unsigned NOT NULL,
  `progress` int unsigned NOT NULL DEFAULT '0',
  `completed` tinyint(1) NOT NULL DEFAULT '0',
  `completedAt` datetime DEFAULT NULL,
  `claimedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_child_quest` (`childId`,`questId`),
  CONSTRAINT `FK_cqp_child` FOREIGN KEY (`childId`) REFERENCES `children_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_cqp_quest` FOREIGN KEY (`questId`) REFERENCES `quests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- [3/5] SKILLS (kỹ năng) + Weekly report
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS `skills` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `code` varchar(60) NOT NULL,
  `name` varchar(120) NOT NULL,
  `subject` varchar(40) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_skill_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `lesson_skills` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `lessonId` int unsigned NOT NULL,
  `skillId` int unsigned NOT NULL,
  `weight` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_lesson_skill` (`lessonId`,`skillId`),
  CONSTRAINT `FK_ls_skill` FOREIGN KEY (`skillId`) REFERENCES `skills` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `game_skills` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `gameId` int unsigned NOT NULL,
  `skillId` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_game_skill` (`gameId`,`skillId`),
  CONSTRAINT `FK_gs_skill` FOREIGN KEY (`skillId`) REFERENCES `skills` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `child_skill_mastery` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `childId` int unsigned NOT NULL,
  `skillId` int unsigned NOT NULL,
  `totalCount` int unsigned NOT NULL DEFAULT '0',
  `correctCount` int unsigned NOT NULL DEFAULT '0',
  `masteryPercent` decimal(5,2) NOT NULL DEFAULT '0.00',
  `level` tinyint unsigned NOT NULL DEFAULT '0',
  `lastPracticedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_child_skill` (`childId`,`skillId`),
  CONSTRAINT `FK_csm_child` FOREIGN KEY (`childId`) REFERENCES `children_profiles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_csm_skill` FOREIGN KEY (`skillId`) REFERENCES `skills` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `weekly_reports` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `childId` int unsigned NOT NULL,
  `weekStart` date NOT NULL,
  `stats` json NOT NULL,
  `sentAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_report_child_week` (`childId`,`weekStart`),
  CONSTRAINT `FK_wr_child` FOREIGN KEY (`childId`) REFERENCES `children_profiles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ─────────────────────────────────────────────────────────────────────────────
-- [4/5] SEED — huy hiệu & nhiệm vụ
-- ─────────────────────────────────────────────────────────────────────────────

INSERT IGNORE INTO `badges` (`code`,`name`,`description`,`icon`,`points`,`isActive`) VALUES
  ('first_lesson','Bài học đầu tiên','Hoàn thành bài học đầu tiên','🌟',10,1),
  ('streak_3','Chăm học 3 ngày','Học liên tục 3 ngày','🔥',20,1),
  ('streak_7','Siêu chăm 7 ngày','Học liên tục 7 ngày','🏆',50,1),
  ('perfect_5','Điểm 10 x5','Đạt 5 lần điểm tuyệt đối','💯',40,1),
  ('explorer_10','Nhà khám phá','Hoàn thành 10 bài học','🧭',60,1);

INSERT IGNORE INTO `quests` (`code`,`name`,`description`,`type`,`target`,`rewardPoints`,`rewardBadgeCode`,`isActive`) VALUES
  ('q_attempts_5','Luyện tập 5 lần','Làm 5 bài tập bất kỳ','attempts',5,10,NULL,1),
  ('q_lessons_10','Chinh phục 10 bài','Hoàn thành 10 bài học','lessons_completed',10,30,'explorer_10',1),
  ('q_streak_7','Giữ lửa 7 ngày','Học liên tục 7 ngày','streak_days',7,50,'streak_7',1),
  ('q_perfect_5','Bậc thầy điểm 10','Đạt 5 lần điểm tuyệt đối','perfect_scores',5,40,'perfect_5',1);

-- ─────────────────────────────────────────────────────────────────────────────
-- [5/5] SEED — kỹ năng + gắn bài học vào kỹ năng theo môn (course.courseType)
-- ─────────────────────────────────────────────────────────────────────────────

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
-- Bảng cũ (courses) dùng utf8mb4_unicode_ci, bảng skills dùng collation mặc định của DB
-- → ép cùng collation để so sánh chuỗi không lỗi "Illegal mix of collations".
JOIN `skills` s ON s.subject = c.courseType COLLATE utf8mb4_unicode_ci
WHERE l.isPublished = 1;

-- ─────────────────────────────────────────────────────────────────────────────
-- KIỂM TRA — chạy xong nên thấy đủ 15 bảng + số dòng seed
-- ─────────────────────────────────────────────────────────────────────────────

SELECT 'quiz_attempts' AS t, COUNT(*) AS rows_ FROM `quiz_attempts`
UNION ALL SELECT 'attempt_answers', COUNT(*) FROM `attempt_answers`
UNION ALL SELECT 'learning_streaks', COUNT(*) FROM `learning_streaks`
UNION ALL SELECT 'daily_recommendations', COUNT(*) FROM `daily_recommendations`
UNION ALL SELECT 'notifications', COUNT(*) FROM `notifications`
UNION ALL SELECT 'certificates', COUNT(*) FROM `certificates`
UNION ALL SELECT 'badges (seed=5)', COUNT(*) FROM `badges`
UNION ALL SELECT 'child_badges', COUNT(*) FROM `child_badges`
UNION ALL SELECT 'quests (seed=4)', COUNT(*) FROM `quests`
UNION ALL SELECT 'child_quest_progress', COUNT(*) FROM `child_quest_progress`
UNION ALL SELECT 'skills (seed=10)', COUNT(*) FROM `skills`
UNION ALL SELECT 'lesson_skills', COUNT(*) FROM `lesson_skills`
UNION ALL SELECT 'game_skills', COUNT(*) FROM `game_skills`
UNION ALL SELECT 'child_skill_mastery', COUNT(*) FROM `child_skill_mastery`
UNION ALL SELECT 'weekly_reports', COUNT(*) FROM `weekly_reports`;
