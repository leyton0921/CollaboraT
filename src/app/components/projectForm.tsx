// src/components/ProjectForm.tsx
import React, { useState } from 'react';
import { Project } from '../interface/project.interface';
import { createProject } from '../controllers/project.controller';

interface ProjectFormProps {
  token: string;
  companyId: string;
  leaderId: string;
  onProjectCreated: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ token, companyId, leaderId, onProjectCreated }) => {
  const [project, setProject] = useState<Omit<Project, 'companyId' | 'leaderId'>>({
    name: '',
    description: '',
    goals: '',
    deadline: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = { ...project, companyId, leaderId };
    const createdProject = await createProject(newProject, token);
    onProjectCreated(createdProject);
    setProject({ name: '', description: '', goals: '', deadline: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Nombre" value={project.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Descripción" value={project.description} onChange={handleChange} required />
      <input name="goals" placeholder="Objetivos" value={project.goals} onChange={handleChange} required />
      <input type="datetime-local" name="deadline" value={project.deadline} onChange={handleChange} required />
      <button type="submit">Crear Proyecto</button>
    </form>
  );
};

export default ProjectForm;
