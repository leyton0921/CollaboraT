// src/interfaces/project.interface.ts

export interface IBodyResponseGetAllProjects {
    message: string;
    projects: Project[];
  }
  
  export interface Project {
    id: string;
    name: string;
    description: string;
    goals: string;
    deadline: string;
    companyId: string;
    leaderId: string;
  }
  
  export interface BodyRequestCreateProject {
    name: string;
    description: string;
    goals: string;
    deadline: string;
    companyId: string;
    leaderId: string;
  }
  
  export interface BodyResponseCreateProject {
    message: string;
    data: Project;
  }
  
  export interface BodyResponseUpdateProject {
    message: string;
    data: Project;
  }
  
  export interface BodyResponseDeleteProject {
    message: string;
    data: null;
  }
  
  export interface BodyRequestUpdateProject {
    name?: string;
    description?: string;
    goals?: string;
    deadline?: string;
    companyId?: string;
    leaderId?: string;
  }
  