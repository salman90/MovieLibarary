# Movie Library Project Setup Guide

This guide provides step-by-step instructions on how to set up and run the Movie Library project using Docker Compose.

## Prerequisites

- Git installed on your local machine
- Docker installed on your local machine

## Step 1: Clone the Repository

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command to clone the repository:
   `git clone https://github.com/salman90/MovieLibarary.git`

## Step 2: Navigate to the Project Directory

1. Change into the directory of the cloned repository:

## Step 3: Run Docker Compose

1. Ensure that Docker is running on your machine.
2. Run the following command to start the Docker containers defined in the `docker-compose.yml` file: `docker compose up`

This command will build the Docker images and start the containers for the Movie Library project.

## Step 4: Access the Application

Once Docker Compose has finished setting up the containers, you can access the Movie Library application in your web browser.

- Open your web browser.
- - The API is running on `http://localhost:4000`.
- Navigate to `http://localhost:3000` to access the frontend.

## Step 5: Interacting with the Application

You can now interact with the Movie Library application through the web interface. Use the search bar to search for movies, view movie details, and perform other actions available in the application.

## Step 6: To run the tests

1. Ensure that Docker is running on your machine.
2. Run command `docker compose -f docker-test-compose.yml up`

## Additional Information

- If you encounter any issues during the setup process, refer to the project's documentation or seek assistance from the project maintainers.
- To stop the Docker containers and remove the associated resources, use the keyboard shortcut `Ctrl + C` in the terminal where `docker-compose up` is running. Then run `docker-compose down`.

## Conclusion

You have successfully set up and run the Movie Library project using Docker Compose. Enjoy exploring the features of the application!
