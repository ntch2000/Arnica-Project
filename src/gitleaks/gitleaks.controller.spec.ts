import { Test, TestingModule } from '@nestjs/testing';
import { GitleaksController } from './gitleaks.controller';

describe('GitleaksController', () => {
  let controller: GitleaksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GitleaksController],
    }).compile();

    controller = module.get<GitleaksController>(GitleaksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
