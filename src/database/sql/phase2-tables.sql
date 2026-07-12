-- Giai đoạn 2: streaks, gợi ý hằng ngày, thông báo, chứng nhận, huy hiệu & nhiệm vụ.
-- Chạy trên DB (synchronize đang tắt). An toàn chạy lại.

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
