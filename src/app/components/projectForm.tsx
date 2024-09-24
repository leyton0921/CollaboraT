// src/ProjectForm.tsx
import React, { useState, useEffect } from 'react';
import { Project, BodyRequestCreateProject } from '../interface/project.interface';

interface ProjectFormProps {
  project?: Project;
  onSave: (project: BodyRequestCreateProject) => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState<BodyRequestCreateProject>({
    name: '',
    description: '',
    goals: '',
    deadline: '',
    companyId: '',
    leaderId: '',
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description,
        goals: project.goals,
        deadline: project.deadline.toString().slice(0, 10), // Formato YYYY-MM-DD
        companyId: project.companyId,
        leaderId: project.leaderId,
      });
    }
  }, [project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <label>Objetivos:</label>
        <textarea name="goals" value={formData.goals} onChange={handleChange} required />
      </div>
      <div>
        <label>Fecha Límite:</label>
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
      </div>
      <div>
        <label>ID de Empresa:</label>
        <input type="text" name="companyId" value={formData.companyId} onChange={handleChange} required />
      </div>
      <div>
        <label>ID de Líder:</label>
        <input type="text" name="leaderId" value={formData.leaderId} onChange={handleChange} required />
      </div>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default ProjectForm;
