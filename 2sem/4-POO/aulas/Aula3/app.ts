import express from "express";

console.log("Starting Game...");

const app = express();
const port = process.env.PORT;

import routes from "./routes";

app.use(routes);

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
