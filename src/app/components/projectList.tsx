"use client"
import React, { useEffect, useState } from 'react';
import { Project } from '../interface/project.interface';
import { getProjects, createProject, deleteProject } from '../controllers/project.controller';
import ProjectForm from '../components/projectForm';

interface ProjectListProps {
  token: string;
  companyId: string;
  leaderId: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ token, companyId, leaderId }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects(token);
      setProjects(data);
    };
    fetchProjects();
  }, [token]);

  const handleProjectCreated = async (project: Omit<Project, 'companyId' | 'leaderId'>) => {
    const newProject = { ...project, companyId, leaderId };
    const createdProject = await createProject(newProject, token);
    setProjects(prev => [...prev, createdProject]);
  };

  const handleProjectDeleted = async (projectId: string) => {
    await deleteProject(projectId, token);
    setProjects(prev => prev.filter(project => project.name !== projectId));
  };

  return (
    <div>
      <h1>Gestión de Proyectos</h1>
      <ProjectForm token={token} companyId={companyId} leaderId={leaderId} onProjectCreated={handleProjectCreated} />
      <ul>
        {projects.map(project => (
          <li key={project.name}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>{project.goals}</p>
            <p>{project.deadline}</p>
            <button onClick={() => handleProjectDeleted(project.name)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
