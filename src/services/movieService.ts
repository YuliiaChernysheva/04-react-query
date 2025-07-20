import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const myToken = import.meta.env.VITE_TMDB_TOKEN;

export interface FetchMoviesResult {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies(
  query: string,
  page: number
): Promise<FetchMoviesResult> {
  try {
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

    return response.data;
  } catch {
    throw new Error("There was an error, please try again...");
  }
}
