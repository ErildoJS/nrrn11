const express = require( "express")
const cors = require("cors")
const { uuid } = require("uuidv4")

//const { v4: uuid } = require('uuid')

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title, url, techs} =request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository)
  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params
  const {title, url, techs} = request.body

  const findRepositoryIndex = repositories.findIndex(repository => //procurando pelo indice no array
    repository.id === id
  )

  if(findRepositoryIndex === -1) {//nao exist
    return response.json({error: 'Repository does not exists'})
  }

  const repository = {
    id,
     title,
      url, 
      techs,
       likes: repositories[findRepositoryIndex].likes //n de likes que ja tinha antes
      }
  repositories[findRepositoryIndex] = repository//subscrevendo os valores

  return response.json(repository)
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params

  const findRepositoryIndex = repositories.findIndex(repository => //procurando pelo indice no array
    repository.id === id
  )

  if(findRepositoryIndex >= 0) {//se encontrar
    repositories.splice(findRepositoryIndex, 1)//remova na primeira posicao
  }else {
    return response.status(400).json({error: 'Repository does not exists'})
  }

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params

  const findRepositoryIndex = repositories.findIndex(repository => {//procurando pelo indice no array
    repository.id === id
  })

  if(findRepositoryIndex === -1) {//se encontrar
    return response.json({error: 'Repository does not exists'})
  }

  repositories[findRepositoryIndex].likes++

  return response.json(repositories[findRepositoryIndex])

});

module.exports = app;
