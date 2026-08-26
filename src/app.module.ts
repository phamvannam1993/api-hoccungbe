import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ChildrenModule } from './modules/children/children.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { IqQuestionsModule } from './modules/iq-questions/iq-questions.module';
import { ProgressModule } from './modules/progress/progress.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { AuthModule } from './modules/auth/auth.module';
import { GamesModule } from './modules/games/games.module';
import { PlayModule } from './modules/play/play.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { VolumesModule } from './modules/volumes/volumes.module';
import { TopicsModule } from './modules/topics/topics.module';
import { ExamsModule } from './modules/exams/exams.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { UploadModule } from './modules/upload/upload.module';
import { MediaModule } from './modules/media/media.module';
import { MiniGamesModule } from './modules/mini-games/mini-games.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { VocabImagesModule } from './modules/vocab-images/vocab-images.module';
import { TtsModule } from './modules/tts/tts.module';
import { AttemptsModule } from './modules/attempts/attempts.module';
import { StreaksModule } from './modules/streaks/streaks.module';
import { RecommendationsModule } from './modules/recommendations/recommendations.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CertificatesModule } from './modules/certificates/certificates.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { SkillsModule } from './modules/skills/skills.module';
import { PlacementModule } from './modules/placement/placement.module';
import { ReportsModule } from './modules/reports/reports.module';
import { BatchModule } from './modules/batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql', // Chắc chắn rằng 'mysql' vẫn được sử dụng
        host: configService.get<string>('DB_HOST'),
        port: Number(configService.get<string>('DB_PORT')),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        // synchronize chỉ bật khi DB_SYNCHRONIZE=true (dev). Mặc định false để tránh
        // TypeORM tự ALTER schema/thêm FK trên DB production đã có dữ liệu (gãy khi có hàng mồ côi).
        synchronize: configService.get<string>('DB_SYNCHRONIZE') === 'true',
        // Bổ sung cấu hình extra cho mysql2
        extra: {
          // Nếu cần thêm các tùy chọn cho mysql2, bạn có thể thêm vào đây
        },
        // Bổ sung tùy chọn dialectOptions để hỗ trợ mysql2 và các tính năng xác thực:
        dialectOptions: {
          useUTC: true, // Đảm bảo thời gian được xử lý đúng
          dateStrings: true,
          charset: 'utf8mb4', // Giới hạn vấn đề với mã hóa ký tự
        },
      }),
    }),
    UsersModule,
    ChildrenModule,
    CoursesModule,
    LessonsModule,
    QuizzesModule,
    IqQuestionsModule,
    ProgressModule,
    AuthModule,
    RewardsModule,
    SubscriptionsModule,
    GamesModule,
    PlayModule,
    VolumesModule,
    AttemptsModule,
    StreaksModule,
    RecommendationsModule,
    NotificationsModule,
    CertificatesModule,
    GamificationModule,
    SkillsModule,
    PlacementModule,
    ReportsModule,
    BatchModule,
    TopicsModule,
    ExamsModule,
    ArticlesModule,
    UploadModule,
    MediaModule,
    FeedbackModule,
    MiniGamesModule,
    CategoriesModule,
    VocabImagesModule,
    DocumentsModule,
    TtsModule,
  ],
})
export class AppModule {}
