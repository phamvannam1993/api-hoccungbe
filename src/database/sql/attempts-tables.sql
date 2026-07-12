-- Bảng lưu kết quả làm bài chi tiết (Giai đoạn 1: "Lưu kết quả và tiến độ thật").
-- Chạy trên DB vì synchronize đang tắt. An toàn chạy lại (IF NOT EXISTS).

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
