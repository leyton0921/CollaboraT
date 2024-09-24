// src/controllers/projectController.ts
import { Project } from '../interface/project.interface';

const API_URL = 'http://localhost:4000/api/v1/projects/'; // Cambia esto según tu API

// Recuperar el ID de la compañía desde el local storage
const getCompanyId = (): string => {
  return localStorage.getItem('id') || ''; // Asegúrate de que el ID esté almacenado con esta clave
};

export const getProjects = async (token: string): Promise<Project[]> => {
  const companyId = getCompanyId();
  const response = await fetch(`${API_URL}?companyId=${companyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al obtener proyectos');
  }
  return response.json();
};

export const createProject = async (project: Omit<Project, 'companyId'>, token: string): Promise<Project> => {
  const companyId = getCompanyId();
  const newProject = { ...project, companyId }; // Añadir companyId al proyecto
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newProject),
  });
  if (!response.ok) {
    throw new Error('Error al crear el proyecto');
  }
  return response.json();
};

export const deleteProject = async (projectId: string, token: string): Promise<void> => {
  const companyId = getCompanyId(); // Podrías usar companyId para verificar o manejar la lógica
  const response = await fetch(`${API_URL}/${projectId}?companyId=${companyId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Error al eliminar el proyecto');
  }
};
