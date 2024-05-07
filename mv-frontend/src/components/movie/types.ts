// Define Movie type
export interface IMovie {
  id: number;
  title: string;
  releaseYear: string;
  description: string;
  duration: number;
  rating: number;
  likes: number;
  dislikes: number;
}

// Define the shape of the custom hook's return value
export interface UseMovieSearchResult {
  movies: IMovie[];
  loading: boolean;
  error: string | null;
  setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>; // Add this line
  setError: React.Dispatch<React.SetStateAction<string | null>>; // Add this line
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
}
