export default interface FormTaskManagerProps {
  taskName: string;
  setTaskName: React.Dispatch<React.SetStateAction<string>>;
  taskDescription: string;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  dueDate: string;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
  taskPriority: string;
  setTaskPriority: React.Dispatch<React.SetStateAction<string>>;
  selectedRole: string;
  setSelectedRole: React.Dispatch<React.SetStateAction<string>>;
  status?: string; // Opcional
  setStatus?: React.Dispatch<React.SetStateAction<string>>; // Opcional
  selectedUserId: number | null;
  setSelectedUserId: React.Dispatch<React.SetStateAction<number | null>>;
  loading: boolean;
  error: string | null; // Cambiado a string | null
  handleAddTask: () => void;
  users: { id: number; name: string }[]; // Esta es la estructura correcta para los usuarios
  onClose?: () => void;  
}
