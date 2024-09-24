// src/services/projectService.ts

import { 
    IBodyResponseGetAllProjects,
    BodyRequestCreateProject,
    BodyResponseCreateProject,
    BodyResponseUpdateProject,
    BodyResponseDeleteProject,
    BodyRequestUpdateProject,
  } from '../interface/project.interface';
  
  const BASE_URL = 'http://localhost:4000/api/v1/projects/';
  
  const getCompanyId = (): string => {
    const companyId = localStorage.getItem('id');
    if (!companyId) {
      throw new Error('Company ID not found in local storage');
    }
    return companyId;
  };
  
  export const getAllProjects = async (): Promise<IBodyResponseGetAllProjects | null> => {
    try {
      const companyId = getCompanyId();
      const response = await fetch(`${BASE_URL}${companyId}/`, { method: 'GET' });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: IBodyResponseGetAllProjects = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return null;
    }
  };
  
  export const createProject = async (project: BodyRequestCreateProject): Promise<BodyResponseCreateProject | null> => {
    try {
      const companyId = getCompanyId();
      const response = await fetch(`${BASE_URL}${companyId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: BodyResponseCreateProject = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating project:', error);
      return null;
    }
  };
  
  export const updateProject = async (id: string, project: BodyRequestUpdateProject): Promise<BodyResponseUpdateProject | null> => {
    try {
      const companyId = getCompanyId();
      const response = await fetch(`${BASE_URL}${companyId}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: BodyResponseUpdateProject = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating project:', error);
      return null;
    }
  };
  
  export const deleteProject = async (id: string): Promise<BodyResponseDeleteProject | null> => {
    try {
      const companyId = getCompanyId();
      const response = await fetch(`${BASE_URL}${companyId}/${id}`, { method: 'DELETE' });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: BodyResponseDeleteProject = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting project:', error);
      return null;
    }
  };
  