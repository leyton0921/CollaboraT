import { 
    IBodyResponseGetAllProjects,
    BodyRequestCreateProject,
    BodyResponseCreateProject,
    BodyResponseUpdateProject,
    BodyResponseDeleteProject,
    BodyRequestUpdateProject,
    Project
  } from '../interface/project.interface';
  
  const BASE_URL = 'https://simuate-test-backend-1.onrender.com/api/projects';
  
  export const getAllProjects = async (): Promise<IBodyResponseGetAllProjects | null> => {
    try {
      const response = await fetch(`${BASE_URL}/`, { method: 'GET' });
      
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
      const response = await fetch(`${BASE_URL}/`, {
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
      const response = await fetch(`${BASE_URL}/${id}`, {
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
      const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      
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
  