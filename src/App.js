import React, { useState, useEffect } from 'react';

import api from './services/api';
import './App.css';

import Header from './components/Header';
function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Jhonatan'
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <div className='content'>
        <Header title='My Projects' />
        <ul>
          {projects.map(project => <li key={project.id} >{project.title}</li>)}
        </ul>

        <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
      </div>
    </>
  );
}
export default App;
