import axios from "axios";

export const TMBD_API_KEY = "2aba01b0fce18e86ed1cee2e83403b06";
export const TMBD_API_URL = "https://api.themoviedb.org/3";
export const TMBD_IMAGE_URL = "https://image.tmdb.org/t/p/original";

export const getMovies = async () => {
  const { data } = await axios({
    method: "get",
    url: `${TMBD_API_URL}/movie/popular`,
    params: {
      api_key: TMBD_API_KEY,
    },
  });

  return data;
};

export const getMovieDetail = async (id: number) => {
  const { data } = await axios({
    method: "get",
    url: `${TMBD_API_URL}/movie/${id}`,
    params: {
      api_key: TMBD_API_KEY,
    },
  });

  return data;
};

export const postMovieRate = async (id: number, score: number) => {
  const { data } = await axios({
    method: "post",
    url: `${TMBD_API_URL}/movie/${id}/rating`,
    params: {
      api_key: TMBD_API_KEY,
    },
    data: {
      value: score,
    },
  });

  return data;
};
