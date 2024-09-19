import FormTaskManagerProps from "./tasks.interface";
export interface User {
    id: number;
    name: string;
    role?: string;
    tasks: FormTaskManagerProps[]; 
}
  