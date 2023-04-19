import { IsString, ValidateNested } from 'class-validator';

// DTO Object
export class RatingType {
  constructor(entity: any) {
    Object.keys(entity).map((key: string) => {
      this[key] = entity[key];
    });
  }

  @IsString()
  Source: string;

  @IsString()
  Value: string;
}

// DTO Object
export class OMDBMovieDto {
  constructor(entity: any) {
    Object.keys(entity).forEach((key: string) => {
      // Create a new instance of RatingType for each item
      if (key === 'Ratings') {
        const items = entity[key];
        const ratings: RatingType[] = [];

        items.forEach((item: any) => {
          ratings.push(new RatingType(item));
        });

        this[key] = ratings;
      } else {
        this[key] = entity[key];
      }
    });
  }

  @IsString()
  Title: string;

  @IsString()
  Year: string;

  @IsString()
  Rated: string;

  @IsString()
  Released: string;

  @IsString()
  Runtime: string;

  @IsString()
  Genre: string;

  @IsString()
  Director: string;

  @IsString()
  Writer: string;

  @IsString()
  Actors: string;

  @IsString()
  Plot: string;

  @IsString()
  Language: string;

  @IsString()
  Country: string;

  @IsString()
  Awards: string;

  @IsString()
  Poster: string;

  @IsString()
  Metascore: string;

  @IsString()
  imdbRating: string;

  @IsString()
  imdbVotes: string;

  @IsString()
  imdbID: string;

  @IsString()
  Type: string;

  @IsString()
  DVD: string;

  @IsString()
  BoxOffice: string;

  @IsString()
  Production: string;

  @IsString()
  Website: string;

  @IsString()
  Response: string;

  @ValidateNested({ each: true })
  Ratings: RatingType[];
}
