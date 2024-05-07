import main from "./app";
import waitOn from "wait-on";

waitOn({
  resources: [
    "tcp:mysql-db:3306", // Check if MySQL is listening on port 3306
  ],
})
  .then(() => {
    startServer();
  })
  .catch((error) => {
    console.error("Error waiting for database:", error);
  });

export const startServer = async () => {
  const app = await main();
  const SERVER_PORT = process.env.PORT || 4000;
  app.listen(SERVER_PORT, () =>
    console.log(`Server running at http://localhost:${SERVER_PORT}`)
  );
};
