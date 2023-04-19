import { Badge, Grid, RatingIndicator } from "@ui5/webcomponents-react";
import styles from "./movie.card.module.scss";
import { calcRating, normalizeGenre } from "../../lib/helpers";

type MovieCardProps = {
  currentMovie: any;
};

export function MovieCard(props: MovieCardProps) {
  const { currentMovie } = props;
  const rating = calcRating(currentMovie.Ratings, 5);
  const genres = normalizeGenre(currentMovie.Genre);

  return (
    <Grid className={styles.root}>
      <>
        <div className={styles.detailBox} data-layout-span="XL8 L8 M12 S12">
          <h1>{currentMovie.Title}</h1>
          <div>
            {genres.map((item) => (
              <Badge className={styles.genreBox}>{item}</Badge>
            ))}
          </div>
          <div className={styles.infoBox}>
            <b>Review:</b>{" "}
            <RatingIndicator
              className={styles.rating}
              readonly={true}
              value={rating}
            />
          </div>
          <div className={styles.infoBox}>
            <b>Released:</b> {currentMovie.Released}
          </div>
          <div className={styles.infoBox}>{currentMovie.Plot}</div>
          <div className={styles.infoBox}>
            <b>Actors:</b> {currentMovie.Actors}
          </div>
          <div className={styles.infoBox}>
            <b>Writer:</b> {currentMovie.Writer}
          </div>
          <div className={styles.infoBox}>
            <b>Director:</b> {currentMovie.Director}
          </div>
        </div>
        <div data-layout-span="XL4 L4 M12 S12">
          <img className={styles.poster} src={currentMovie.Poster}></img>
        </div>
      </>
    </Grid>
  );
}
