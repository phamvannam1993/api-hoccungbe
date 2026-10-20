import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IqActivationCode } from './entities/iq-activation-code.entity';
import { IqEntitlement } from './entities/iq-entitlement.entity';
import { IqOrder } from './entities/iq-order.entity';
import { IqOrdersService } from './iq-orders.service';
import { IqOrdersController } from './iq-orders.controller';
import { PayosService } from './payos.service';
import { MailModule } from '../mail/mail.module';
import { UsersModule } from '../users/users.module';
import { IqCodesService } from './iq-codes.service';
import { IqCodesController } from './iq-codes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([IqActivationCode, IqEntitlement, IqOrder]),
    ConfigModule,
    MailModule,
    UsersModule,
  ],
  providers: [IqCodesService, IqOrdersService, PayosService],
  controllers: [IqCodesController, IqOrdersController],
})
export class IqCodesModule {}
