import { Controller, Get, Query } from '@nestjs/common';
import { IsString, Length } from 'class-validator';
import { OMDBService, ResponseData } from '../services/omdb.service';

export class SearchParams {
  @IsString()
  @Length(3, 45)
  q: string;
}

@Controller()
export class AppController {
  constructor(private readonly omdbService: OMDBService) {}

  @Get('v1/search')
  async getSearch(@Query() params: SearchParams): Promise<ResponseData> {
    return await this.omdbService.getMovieByTitle(params.q);
  }
}
