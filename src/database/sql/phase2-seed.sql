-- Dữ liệu khởi tạo huy hiệu & nhiệm vụ (chạy sau phase2-tables.sql). An toàn chạy lại.

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
