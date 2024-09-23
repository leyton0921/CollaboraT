'use client';

import { Navbar } from "../UI/navbaruser";
import styled from "styled-components";
import { useState } from "react";

interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'in progress' | 'completed';
  comment: string;
  collaboratorAssignedName?: string;
}

interface UnassignedTasksProps {
  onTaskAssigned: (task: Task) => void;
}

export default function UnassignedTasks({ onTaskAssigned }: UnassignedTasksProps) {
  const links = [
    { href: "/", name: "Task" },
    { href: "/about", name: "Home Admin" }
  ];

  const initialTasks: Task[] = [
    {
      id: '1',
      name: 'Actualizar la base de datos',
      description: 'Revisar y actualizar la base de datos del sistema.',
      priority: 'high',
      dueDate: '2024-09-30',
      status: 'pending',
      comment: '',
    },
    {
      id: '2',
      name: 'Revisión de código',
      description: 'Hacer revisión de código del último sprint.',
      priority: 'medium',
      dueDate: '2024-10-01',
      status: 'pending',
      comment: '',
    },
    {
      id: '3',
      name: 'Reunión con cliente',
      description: 'Reunirse con el cliente para revisión del proyecto.',
      priority: 'low',
      dueDate: '2024-10-05',
      status: 'pending',
      comment: '',
    },
    {
      id: '4',
      name: 'Enviar informe final',
      description: 'Preparar y enviar el informe final al cliente.',
      priority: 'medium',
      dueDate: '2024-10-10',
      status: 'pending',
      comment: '',
    }
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleAssignTask = (task: Task) => {
    onTaskAssigned({ ...task, collaboratorAssignedName: 'Juan Pérez', status: 'pending' });
    setTasks(tasks.filter(t => t.id !== task.id)); // Eliminar tarea de la lista
  };

  return (
    <Container>
      <Navbar links={links} />
      <Content>
        <h2>Tareas Sin Asignar</h2>
        <TaskTable>
          <thead>
            <tr>
              <th>Tarea</th>
              <th>Descripción</th>
              <th>Prioridad</th>
              <th>Fecha de Vencimiento</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskRow key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>
                  <AssignButton onClick={() => handleAssignTask(task)}>
                    Asignar a Juan Pérez
                  </AssignButton>
                </td>
              </TaskRow>
            ))}
          </tbody>
        </TaskTable>
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

const TaskTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th, td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }
`;

const TaskRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
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
      case 'high': return '#dc3545'; // Rojo
      case 'medium': return '#ffc107'; // Amarillo
      case 'low': return '#28a745'; // Verde
      default: return '#ccc';
    }
  }};
`;

const AssignButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background-color: #0056b3;
  }
`;
