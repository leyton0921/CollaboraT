// src/app/components/projectList.tsx
"use client"; // Asegúrate de agregar esta línea al principio

import React, { useState, useEffect } from 'react';
import ProjectForm from './projectForm';
import { 
  getAllProjects, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projects.post.controller';
import { 
  IBodyResponseGetAllProjects, 
  BodyRequestCreateProject, 
  BodyRequestUpdateProject, 
  Project 
} from '../interface/project.interface';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProjects = async () => {
    const data: IBodyResponseGetAllProjects | null = await getAllProjects();
    if (data) {
      setProjects(data.projects);
    }
  };

  const handleCreateProject = async (project: BodyRequestCreateProject) => {
    await createProject(project);
    fetchProjects();
  };

  const handleUpdateProject = async (project: BodyRequestUpdateProject & { id: string }) => {
    if (currentProject) {
      await updateProject(currentProject.id, project);
      fetchProjects();
    }
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const handleSave = (project: Project) => {
    if (isEditing && currentProject) {
      handleUpdateProject({ ...project, id: currentProject.id });
    } else {
      handleCreateProject(project);
    }
    setCurrentProject(null);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCurrentProject(null);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Lista de Proyectos</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.name}</h2>
            <button onClick={() => handleEdit(project)}>Editar</button>
            <button onClick={() => handleDeleteProject(project.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleCancel()}>Nuevo Proyecto</button>
      {(isEditing || currentProject) && (
        <ProjectForm
          project={isEditing ? currentProject : undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ProjectList;
