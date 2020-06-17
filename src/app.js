const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const validateRepo = (response, id) => {
  const repositoryIndex = repositories.findIndex((item) => item.id === id);

  if (repositoryIndex < 0)
    return response.status(400).json({ error: "Repository not found." });

  const repositoryFind = repositories.find((item) => item.id === id);

  return { repositoryIndex, repositoryFind };
};

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  const {
    params: { id },
    body: { title, techs },
  } = request;

  const { repositoryFind, repositoryIndex } = validateRepo(response, id);

  const repository = {
    id,
    title,
    techs,
    likes: repositoryFind.likes,
  };

  repositories[repositoryIndex] = repository;

  return response.json(repositories);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const { repositoryIndex } = validateRepo(response, id);

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const { repositoryFind, repositoryIndex } = validateRepo(response, id);

  const repository = {
    ...repositoryFind,
    likes: repositoryFind.likes + 1,
  };

  repositories[repositoryIndex] = repository;

  return response.json(repositories);
});

module.exports = app;
