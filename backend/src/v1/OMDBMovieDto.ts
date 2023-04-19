import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

// DTO Object
export class RatingType {
  constructor(entity: any) {
    Object.keys(entity).map((key: string) => {
      this[key] = entity[key];
    });
  }

  @IsNotEmpty()
  @IsString()
  Source: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  Title: string;

  @IsNotEmpty()
  @IsString()
  Year: string;

  @IsNotEmpty()
  @IsString()
  Rated: string;

  @IsNotEmpty()
  @IsString()
  Released: string;

  @IsNotEmpty()
  @IsString()
  Runtime: string;

  @IsNotEmpty()
  @IsString()
  Genre: string;

  @IsNotEmpty()
  @IsString()
  Director: string;

  @IsNotEmpty()
  @IsString()
  Writer: string;

  @IsNotEmpty()
  @IsString()
  Actors: string;

  @IsNotEmpty()
  @IsString()
  Plot: string;

  @IsNotEmpty()
  @IsString()
  Language: string;

  @IsNotEmpty()
  @IsString()
  Country: string;

  @IsNotEmpty()
  @IsString()
  Awards: string;

  @IsNotEmpty()
  @IsString()
  Poster: string;

  @IsNotEmpty()
  @IsString()
  Metascore: string;

  @IsNotEmpty()
  @IsString()
  imdbRating: string;

  @IsNotEmpty()
  @IsString()
  imdbVotes: string;

  @IsNotEmpty()
  @IsString()
  imdbID: string;

  @IsNotEmpty()
  @IsString()
  Type: string;

  @IsNotEmpty()
  @IsString()
  DVD: string;

  @IsNotEmpty()
  @IsString()
  BoxOffice: string;

  @IsNotEmpty()
  @IsString()
  Production: string;

  @IsNotEmpty()
  @IsString()
  Website: string;

  @IsNotEmpty()
  @IsString()
  Response: string;

  @ValidateNested({ each: true })
  Ratings: RatingType[];
}
