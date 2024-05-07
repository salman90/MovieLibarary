// import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
// import axios from "axios";

// jest.mock("axiosInstance");

describe("Movie app tests", () => {
  // beforeAll(() => {
  //   // Mock the implementation of getRequest
  //   (axios.get as jest.Mock).mockResolvedValueOnce([
  //     {
  //       title: "Movie 1",
  //       description: "lorem ipsum",
  //       duration: 120,
  //       rating: 4,
  //     },
  //   ]);
  // });

  test("renders movie UI header", () => {
    render(<App />);
    const headerElement = screen.getByText(/Movie Library/i);
    expect(headerElement).toBeInTheDocument();
  });

  // test("displays title of Movie 1", async () => {
  //   render(<App />);

  //   // Simulate user typing in the search input
  //   const searchInput = screen.getByLabelText("Search by Title");
  //   // fireEvent.change(searchInput, { target: { value: "Movie 1" } });

  //   // Wait for the movie to be rendered
  //   await waitFor(() => {
  //     expect(screen.getByText("Movie 1")).toBeInTheDocument();
  //   });
  // });
});
