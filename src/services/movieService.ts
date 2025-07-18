import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const myToken = import.meta.env.VITE_TMDB_TOKEN;

export interface FetchMoviesResult {
  page: number;
  results: Movie[];
  totalPages: number;
  totalResults: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<FetchMoviesResult> {
  const response = await axios.get<{
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }>(BASE_URL, {
    params: {
      query,
      include_adult: false,
      language: "en-US",
      page,
    },
    headers: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return {
    page: response.data.page,
    results: response.data.results,
    totalPages: response.data.total_pages,
    totalResults: response.data.total_results,
  };
}
