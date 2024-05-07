import React from "react";

// Importing types for the movie
import { IMovie } from "./types";
import "./Movie.css";

// Importing CSS styles for the Movie component
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import CardHeader from "@mui/material/CardHeader";

// Define props interface for Movie component
interface MovieProps {
  movie: IMovie;
  onDelete: () => void;
  onUpdate: (updatedMovie: IMovie) => void;
}

/**
 * Functional component Movie with React.FC type and MovieProps interface
 * @param params
 * @returns
 */
const Movie: React.FC<MovieProps> = ({ movie, onDelete, onUpdate }) => {
  // Function to handle like button click
  const handleLikeClick = () => {
    const updatedMovie = { ...movie, likes: movie.likes + 1 };
    onUpdate(updatedMovie);
  };

  // Function to handle dislike button click
  const handleDislikeClick = () => {
    const updatedMovie = { ...movie, dislikes: movie.dislikes + 1 };
    onUpdate(updatedMovie);
  };

  // Function to handle rating change
  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newRating: number | null
  ) => {
    const updatedMovie = { ...movie, rating: newRating ?? 0 }; // Set new rating valu
    onUpdate(updatedMovie); // Call onUpdate with updated movie object
  };

  return (
    <Card className="movie">
      <CardContent>
        <CardHeader title={movie.title} subheader={movie.releaseYear} />
        <Typography variant="body2" color="text.secondary" paragraph>
          {movie.description}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={movie.rating}
              onChange={handleRatingChange}
            />
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Typography component="legend">Duration</Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.duration} mins
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions>
        <IconButton onClick={handleLikeClick}>
          <ThumbUpIcon /> {movie.likes}
        </IconButton>
        <IconButton onClick={handleDislikeClick}>
          <ThumbDownIcon /> {movie.dislikes}
        </IconButton>
        <Button className="delete_button" size="small" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Movie;
