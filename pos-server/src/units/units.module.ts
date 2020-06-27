import { Module } from '@nestjs/common';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';
import { Units } from './units.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Units]),
      ],
  controllers: [UnitsController],
  providers: [UnitsService],
  exports: [UnitsService]
})
export class UnitsModule {}
