import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { mockData } from '../../test/mock.data';
import { OMDBService } from '../services/omdb.service';
import { AppController, SearchParams } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  let omdbService: OMDBService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [OMDBService, ConfigService],
    }).compile();

    omdbService = moduleRef.get<OMDBService>(OMDBService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('Get Search', () => {
    it('should return a movie', async () => {
      const params: SearchParams = { q: 'xpto' };
      const result = { count: 1, content: mockData };
      jest
        .spyOn(omdbService, 'getMovieByTitle')
        .mockImplementation(async () => result);

      expect(await appController.getSearch(params)).toBe(result);
    });
  });
});
