const express = require('express')
const cors = require('cors')
const {uuid, isUuid} = require('uuidv4')
const app = express()

app.use(cors())
app.use(express.json())

const projects = []

function logRequest(request, response, next) {
  const {method, url} = request

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.time(logLabel)
  next()
  console.timeEnd(logLabel)

}

function validateProjectI(request, response, next) {
  const {id} = request.params

  if(!isUuid(id)) {
    return response.status(400).json({error: 'Invalid project Id'})
  }

  return next()
}

app.use(logRequest)
app.use('/projects/:id', validateProjectI)
app.get('/projects', (request, response) => {
  const {owner} = request.query

  //se o owner foi preenchido eu vou filtrar

  const results = owner 
  ? projects.filter(project => project.owner.includes(owner)): projects
  return response.json(results)
})

app.post('/projects', (request, response) => {
  const {title, owner} = request.body

  const project = {id: uuid(), title, owner}

  projects.push(project)

  return response.json(project)//exibo so o projecto criado
})

app.put('/projects/:id', (request, response) => {
  const {id} = request.params
  const {title, owner} = request.body


  //buscando pelo projeto que tem o id qu 
  //recebemos com parametro na rota
  const projectIndex = projects.findIndex(project => project.id === id)

  //se ele nao encontrou retorno erro
  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'})
  }

  const project = {
    id, title, owner
  }

  projects[projectIndex] = project


  return response.json(project)
})

app.delete('/projects/:id', (request, response) => {
  const {id} = request.params

  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex < 0) {
    return response.status(400).json({error: 'Project not found'})
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send()
})

app.listen(3333, () => {
  console.log('🚀 back-end started')
})