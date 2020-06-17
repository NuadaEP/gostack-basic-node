const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    techs,
  };

  repositories.push(repository);

  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const {
    params: { id },
    body: { title, techs },
  } = request;

  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex < 0)
    return response.status(400).json({ error: "Repository not found." });

  const repository = {
    id,
    title,
    techs,
  };

  repositories[repositoryIndex] = repository;

  return response.json(repositories);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex < 0)
    return response.status(400).json({ error: "Repository not found." });

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
