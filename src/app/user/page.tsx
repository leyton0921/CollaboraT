'use client';

import { Navbar } from "../UI/navbaruser";
import styled from "styled-components";
import { useEffect, useState } from "react";

// Definición de interfaces
interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'in progress' | 'completed';
  comment: string;
  showComment?: boolean;
  collaboratorAssignedName: string;
}

export default function Users() {
  const links = [
    { href: "/user", name: "Mis Tareas" },
    { href: "/taskunassign", name: "Tareas Sin Asignar" },
    { href: "/profile", name: "Perfil" },
    { href: "/", name: "Salir" },
  ];

  const collaboratorName = 'Juan Pérez';

  const initialTasks: Task[] = [
    {
      id: '1',
      name: 'Actualizar la base de datos',
      description: 'Revisar y actualizar la base de datos del sistema.',
      priority: 'high',
      dueDate: '2024-09-30',
      status: 'in progress',
      comment: '',
      collaboratorAssignedName: collaboratorName
    },
    {
      id: '2',
      name: 'Revisión de código',
      description: 'Hacer revisión de código del último sprint.',
      priority: 'medium',
      dueDate: '2024-10-01',
      status: 'pending',
      comment: '',
      collaboratorAssignedName: collaboratorName
    },
    {
      id: '3',
      name: 'Reunión con cliente',
      description: 'Reunirse con el cliente para revisión del proyecto.',
      priority: 'low',
      dueDate: '2024-10-05',
      status: 'completed',
      comment: 'Revisado y aprobado por el cliente.',
      collaboratorAssignedName: collaboratorName
    },
    {
      id: '4',
      name: 'Enviar informe final',
      description: 'Preparar y enviar el informe final al cliente.',
      priority: 'medium',
      dueDate: '2024-10-10',
      status: 'pending',
      comment: '',
      collaboratorAssignedName: collaboratorName
    },
    {
      id: '5',
      name: 'Realizar pruebas unitarias',
      description: 'Ejecutar pruebas unitarias en el módulo de autenticación.',
      priority: 'high',
      dueDate: '2024-10-15',
      status: 'in progress',
      comment: '',
      collaboratorAssignedName: collaboratorName
    },
    {
      id: '6',
      name: 'Actualizar documentación',
      description: 'Asegurarse de que toda la documentación esté actualizada.',
      priority: 'low',
      dueDate: '2024-10-20',
      status: 'completed',
      comment: 'Documentación actualizada.',
      collaboratorAssignedName: collaboratorName
    },
    {
      id: '7',
      name: 'Revisar requisitos del cliente',
      description: 'Revisar los requisitos con el cliente antes de la entrega.',
      priority: 'medium',
      dueDate: '2024-10-25',
      status: 'pending',
      comment: '',
      collaboratorAssignedName: collaboratorName
    },
    {
      id: '8',
      name: 'Planificar próximo sprint',
      description: 'Definir los objetivos para el próximo sprint.',
      priority: 'high',
      dueDate: '2024-10-30',
      status: 'in progress',
      comment: '',
      collaboratorAssignedName: collaboratorName
    },
    {
      id: '9',
      name: 'Configurar servidor de producción',
      description: 'Asegurarse de que el servidor de producción esté configurado correctamente.',
      priority: 'low',
      dueDate: '2024-11-01',
      status: 'completed',
      comment: 'Servidor configurado correctamente.',
      collaboratorAssignedName: collaboratorName
    },
    {
      id: '10',
      name: 'Hacer revisión final',
      description: 'Revisar todo el proyecto antes de la entrega final.',
      priority: 'high',
      dueDate: '2024-11-05',
      status: 'pending',
      comment: '',
      collaboratorAssignedName: collaboratorName
    }
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleStatusChange = (id: string, newStatus: 'pending' | 'in progress' | 'completed') => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleCommentChange = (id: string, comment: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, comment } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const toggleCommentVisibility = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, showComment: !task.showComment } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <Container>
      <Navbar links={links} />
      <Content>
        <TaskColumns>
          <Column>
            <h2>Tareas Pendientes</h2>
            {tasks.filter(task => task.status === 'pending').map((task) => (
              <TaskCard key={task.id} status={task.status}>
                <h3>{task.name}</h3>
                <p><strong>Descripción:</strong> {task.description}</p>
                <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
                <p><strong>Fecha de Vencimiento:</strong> {task.dueDate}</p>
                <p><strong>Estado:</strong> {task.status}</p>
                <p><strong>Asignado a:</strong> {task.collaboratorAssignedName}</p>
                <ToggleButton onClick={() => toggleCommentVisibility(task.id)}>
                  {task.showComment ? 'Ocultar Comentario' : 'Dejar Comentario'}
                </ToggleButton>
                {task.showComment && (
                  <CommentField 
                    value={task.comment} 
                    onChange={(e) => handleCommentChange(task.id, e.target.value)} 
                    placeholder="Deja un comentario..."
                  />
                )}
                <SmallButton onClick={() => handleStatusChange(task.id, 'in progress')}>
                  Marcar como En Progreso
                </SmallButton>
                <SmallButton onClick={() => handleStatusChange(task.id, 'completed')}>
                  Marcar como Completada
                </SmallButton>
              </TaskCard>
            ))}
          </Column>
          <Column>
            <h2>Tareas en Progreso</h2>
            {tasks.filter(task => task.status === 'in progress').map((task) => (
              <TaskCard key={task.id} status={task.status}>
                <h3>{task.name}</h3>
                <p><strong>Descripción:</strong> {task.description}</p>
                <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
                <p><strong>Fecha de Vencimiento:</strong> {task.dueDate}</p>
                <p><strong>Estado:</strong> {task.status}</p>
                <p><strong>Asignado a:</strong> {task.collaboratorAssignedName}</p>
                <CommentField 
                  value={task.comment} 
                  onChange={(e) => handleCommentChange(task.id, e.target.value)} 
                  placeholder="Edita tu comentario..."
                />
                <SmallButton onClick={() => handleStatusChange(task.id, 'pending')}>
                  Marcar como Pendiente
                </SmallButton>
                <SmallButton onClick={() => handleStatusChange(task.id, 'completed')}>
                  Marcar como Completada
                </SmallButton>
              </TaskCard>
            ))}
          </Column>
          <Column>
            <h2>Tareas Completadas</h2>
            {tasks.filter(task => task.status === 'completed').map((task) => (
              <TaskCard key={task.id} status={task.status}>
                <h3>{task.name}</h3>
                <p><strong>Descripción:</strong> {task.description}</p>
                <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
                <p><strong>Fecha de Vencimiento:</strong> {task.dueDate}</p>
                <p><strong>Estado:</strong> {task.status}</p>
                <p><strong>Asignado a:</strong> {task.collaboratorAssignedName}</p>
                <CommentField 
                  value={task.comment} 
                  onChange={(e) => handleCommentChange(task.id, e.target.value)} 
                  placeholder="Edita tu comentario..."
                />
                <SmallButton onClick={() => handleStatusChange(task.id, 'pending')}>
                  Marcar como Pendiente
                </SmallButton>
                <SmallButton onClick={() => handleStatusChange(task.id, 'in progress')}>
                  Marcar como En Progreso
                </SmallButton>
              </TaskCard>
            ))}
          </Column>
        </TaskColumns>
      </Content>
    </Container>
  );
}

// Estilos
const Container = styled.div`
  font-family: 'Segoe UI', 'Arial', sans-serif;
  text-align: center;
  margin-top: 20px;
`;

const Content = styled.div`
  padding: 0 20px;
`;

const TaskColumns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Column = styled.div`
  flex: 1;
  margin: 0 10px;
`;

const TaskCard = styled.div<{ status: string }>`
  background-color: ${({ status }) => (status === 'pending' ? '#ffffff' : (status === 'in progress' ? '#fff3cd' : '#e3f9e5'))};
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  margin-bottom: 15px;
  width: 100%;
  
  h3 {
    color: #28a745;
    margin-bottom: 10px;
    font-size: 1.2rem;
    font-weight: bold;
  }

  p {
    margin: 5px 0;
    font-family: 'Segoe UI', 'Arial', sans-serif;
  }
`;

const PriorityBadge = styled.span<{ priority: 'high' | 'medium' | 'low' }>`
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  color: white;
  margin: 5px 0;
  font-size: 0.8rem;
  background-color: ${({ priority }) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#ccc';
    }
  }};
`;

const CommentField = styled.textarea`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  box-sizing: border-box;
  resize: none;
`;

const Button = styled.button`
  background-color: #28a745;
  color: white;
  padding: 6px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const ToggleButton = styled(Button)`
  background-color: #007bff;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const SmallButton = styled(Button)`
  padding: 4px;
  font-size: 12px;
`;
