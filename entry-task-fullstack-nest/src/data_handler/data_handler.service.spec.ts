import { Test, TestingModule } from '@nestjs/testing';
import { DataHandlerService } from './data_handler.service';

describe('DataHandlerService', () => {
  let service: DataHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataHandlerService],
    }).compile();

    service = module.get<DataHandlerService>(DataHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
