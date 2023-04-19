import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { validate } from 'class-validator';
import { OMDBMovieDto } from '../v1/OMDBMovieDto';

export type ResponseData = {
  content: OMDBMovieDto | null;
  count: number;
};

@Injectable()
export class OMDBService {
  private apiBaseUrl: string;
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiBaseUrl = this.configService.get<string>('API_BASE_URL');
    this.apiKey = this.configService.get<string>('API_KEY');
  }

  async getMovieByTitle(title: string): Promise<ResponseData> {
    try {
      // Use axios to request OMDB service api
      const response = await axios({
        method: 'get',
        url: this.apiBaseUrl,
        params: {
          t: title,
          apikey: this.apiKey,
        },
      });

      // Movie not found
      if (response.data.Response === 'False') {
        return { count: 0, content: null };
      }

      // Create a new instance of OMDBMovieDto object
      const movieDto = new OMDBMovieDto(response.data);

      // Validate the new instance
      const isValid = await validate(movieDto);

      if (isValid.length > 0) {
        throw new Error('DTO error format');
      }

      // Return DTO
      return { count: 1, content: movieDto };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
