import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Movie app tests", () => {
  test("renders movie UI header", () => {
    render(<App />);
    const headerElement = screen.getByText(/Movie Library/i);
    expect(headerElement).toBeInTheDocument();
  });
});
