import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ChildrenModule } from './modules/children/children.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { ProgressModule } from './modules/progress/progress.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { AuthModule } from './modules/auth/auth.module';
import { GamesModule } from './modules/games/games.module';
import { PlayModule } from './modules/play/play.module';
import { FeedbackController } from './modules/feedback/feedback.controller';
import { VolumesModule } from './modules/volumes/volumes.module';
import { TopicsModule } from './modules/topics/topics.module';

@Module({
  controllers: [FeedbackController],
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
        synchronize: true,
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
    ProgressModule,
    AuthModule,
    RewardsModule,
    SubscriptionsModule,
    GamesModule,
    PlayModule,
    VolumesModule,
    TopicsModule,
  ],
})
export class AppModule {}
