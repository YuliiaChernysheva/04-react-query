import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const myToken = import.meta.env.VITE_TMDB_TOKEN;

interface MovieApiResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export default async function fetchMovies(query: string): Promise<Movie[]> {
  try {
    const response = await axios.get<MovieApiResponse>(BASE_URL, {
      params: {
        query,
        include_adult: false,
        language: "en-US",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies", error);
    throw new Error("Unable to fetch movies");
  }
}
