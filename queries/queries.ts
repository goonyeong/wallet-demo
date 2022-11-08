import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { QUERY_KEYS } from "queries/queryKeys";
import { getMovieDetail, getMovies, postMovieRate } from "apis/api";
import { AxiosError } from "axios";

export const useFetchMovies = (): UseQueryResult<{ results: IMovieDetail[] }, AxiosError> =>
  useQuery(QUERY_KEYS.MOVIE_LIST, () => getMovies());

export const useFetchMovieDetail = (movie_id: number): UseQueryResult<IMovieDetail, AxiosError> => {
  return useQuery(QUERY_KEYS.MOVIE_DETAIL, () => getMovieDetail(movie_id), {
    enabled: movie_id > 0,
  });
};

export const usePostMovieRate = () =>
  useMutation(({ movie_id, score }: { movie_id: number; score: number }) =>
    postMovieRate(movie_id, score)
  );
