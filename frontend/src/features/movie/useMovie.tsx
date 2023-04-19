import { useAppSelector, useAppDispatch } from "../../redux/hooks";

import {
  reset,
  fetchMovieAction,
  selectCurrentMovie,
  selectStatus,
  FetchStatus,
} from "../../redux/movieSlice";
import {
  Ui5CustomEvent,
  InputDomRef,
} from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";

enum InputErrorState {
  ERROR = "Error",
  NONE = "None",
}

export function useMovie() {
  const [query, setQuery] = useState<string>("");
  const [inputErrorState, setInputErrorState] = useState<InputErrorState>(
    InputErrorState.NONE
  );
  const currentMovie = useAppSelector(selectCurrentMovie);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const isLoading = status === FetchStatus.LOADING;
  const isFailed = status === FetchStatus.FAILED;
  const isNotFound = status === FetchStatus.NOTFOUND;

  const handleOnChange = (e: Ui5CustomEvent<InputDomRef>) => {
    if (!e.target.value) return;
    setQuery(e.target.value);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      handleRequest();
    }
  };

  const handleRequest = () => {
    if (query && query.length >= 3) {
      dispatch(fetchMovieAction(query));
    } else {
      setInputErrorState(InputErrorState.ERROR);
    }
  };

  useEffect(() => {
    if (query?.length >= 3) {
      setInputErrorState(InputErrorState.NONE);
    }
  }, [query]);

  const handleReset = () => {
    setQuery("");
    dispatch(reset());
  };

  return {
    handleRequest,
    handleReset,
    handleOnChange,
    handleOnKeyDown,
    isLoading,
    isFailed,
    isNotFound,
    currentMovie,
    inputErrorState,
    query
  };
}
