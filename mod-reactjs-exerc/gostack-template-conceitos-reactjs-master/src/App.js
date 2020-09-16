import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })    
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: 'react and hooks',
      url: 'https://www.github.com/ErildoJS/reactjs',
      techs: ['reactjs', 'api', 'hooks']
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)

    const newRepository = repositories.filter(
      repository =>  repository.id !== id
    )

    setRepositories(newRepository)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
           {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
