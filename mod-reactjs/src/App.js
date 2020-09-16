import React, {useState, useEffect} from 'react'
import Header from './components/Header'

import './App.css'
//import back from './assets/back.jfif'
import api from './services/api'

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    //cadastrando 
    const response = await api.post('/projects', {
      title: `New project ${Date.now()}`,
      owner: 'erik'
    })

    const project = response.data
    setProjects([...projects, project])
  }

  return (
    <>
    <Header title="homepage">
      <ul>
        <li>
  {projects.map(project => <li key={project.id}>{project.title}</li>)}
        </li>
      </ul>

      <button type="button" onClick={handleAddProject}>Add new Project</button>
    </Header>
    <Header title="about"/>
    
    </>
    ) 
    
}

export default App