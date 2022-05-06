import { Test, TestingModule } from '@nestjs/testing';
import { DataHandlerController } from './data_handler.controller';

describe('DataHandlerController', () => {
  let controller: DataHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataHandlerController],
    }).compile();

    controller = module.get<DataHandlerController>(DataHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
