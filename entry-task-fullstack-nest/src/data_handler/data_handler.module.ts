import { Module } from '@nestjs/common';
import { DataHandlerService } from './data_handler.service';
import { DataHandlerController } from './data_handler.controller';

@Module({
  providers: [DataHandlerService],
  controllers: [DataHandlerController]
})
export class DataHandlerModule {}
