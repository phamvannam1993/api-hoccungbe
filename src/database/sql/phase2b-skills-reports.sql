-- Skills (kỹ năng) + Weekly report. Chạy trên DB. An toàn chạy lại.

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
