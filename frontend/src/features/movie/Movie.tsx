import styles from "./movie.module.scss";
import {
  Button,
  Icon,
  Input,
  FlexBox,
  Loader,
  MessageStrip,
} from "@ui5/webcomponents-react";
import { Layout } from "../../components/Layout";
import { MovieCard } from "./MovieCard";
import { useMovie } from "./useMovie";

export function Movie() {
  const {
    handleRequest,
    handleReset,
    handleOnChange,
    handleOnKeyDown,
    isLoading,
    isFailed,
    isNotFound,
    currentMovie,
    inputErrorState,
    query,
  } = useMovie();

  return (
    <Layout>
      <div className={styles.root}>
        <div data-layout-span="XL12 L12 M12 S0">
          <h1>Movie finder</h1>
          <p>Use the text field below to search for a movie.</p>
          <FlexBox alignItems="Center" justifyContent="Center">
            <Input
              onKeyDown={handleOnKeyDown}
              className={styles.controller}
              placeholder="Movie title..."
              value={query}
              icon={<Icon name="search" />}
              onInput={handleOnChange}
              valueState={inputErrorState}
              valueStateMessage={<div>Minimum 3 letters</div>}
            />
            <Button
              className={styles.controller}
              onClick={handleRequest}
            >
              Search
            </Button>
            <Button className={styles.controller} onClick={handleReset}>
              Reset
            </Button>
          </FlexBox>
        </div>
        {isFailed && (
          <MessageStrip
            style={{ margin: "3em auto" }}
            onClose={handleReset}
            design="Negative"
          >
            Something went wrong
          </MessageStrip>
        )}
        {isNotFound && (
          <MessageStrip
            style={{ margin: "3em auto" }}
            onClose={handleReset}
            design="Information"
          >
            Sorry, movie not found.
          </MessageStrip>
        )}
        {isLoading && (
          <Loader style={{ margin: "3em auto" }} delay={100} progress="60%" />
        )}
        {currentMovie && !isLoading ? (
          <MovieCard currentMovie={currentMovie} />
        ) : null}
      </div>
    </Layout>
  );
}
