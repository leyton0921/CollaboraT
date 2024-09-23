'use client';

import { Navbar } from "../UI/navbaruser"; // Asegúrate de que la ruta sea correcta
import styled from "styled-components";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'in progress' | 'completed';
  comment?: string;
  collaboratorAssignedName?: string;
}

export default function AssignTasks() {
  const links = [
    { href: "/user", name: "Mis tareas" },
    { href: "/taskunassign", name: "Tareas sin asignar" }
  ];

  const initialTasks: Task[] = [
    {
      id: '1',
      name: 'Actualizar la base de datos',
      description: 'Revisar y actualizar la base de datos del sistema.',
      priority: 'high',
      dueDate: '2024-09-30',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Revisión de código',
      description: 'Hacer revisión de código del último sprint.',
      priority: 'medium',
      dueDate: '2024-10-01',
      status: 'pending',
    },
    {
      id: '3',
      name: 'Reunión con cliente',
      description: 'Reunirse con el cliente para revisión del proyecto.',
      priority: 'low',
      dueDate: '2024-10-05',
      status: 'pending',
    },
    {
      id: '4',
      name: 'Enviar informe final',
      description: 'Preparar y enviar el informe final al cliente.',
      priority: 'medium',
      dueDate: '2024-10-10',
      status: 'pending',
    }
  ];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Solo se ejecuta en el cliente
    setTasks(initialTasks);
  }, []);

  const handleAssignTask = (task: Task) => {
    const assignedTask: Task = {
      ...task,
      collaboratorAssignedName: 'Juan Pérez',
      status: 'pending'
    };

    setAssignedTasks((prev) => [...prev, assignedTask]);
    setTasks((prev) => prev.filter(t => t.id !== task.id));
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
                    Asignar a Ti Mismo
                  </AssignButton>
                </td>
              </TaskRow>
            ))}
          </tbody>
        </TaskTable>

        <h2>Tareas Asignadas</h2>
        <AssignedTaskTable>
          <thead>
            <tr>
              <th>Tarea</th>
              <th>Descripción</th>
              <th>Prioridad</th>
              <th>Fecha de Vencimiento</th>
              <th>Estado</th>
              <th>Colaborador Asignado</th>
            </tr>
          </thead>
          <tbody>
            {assignedTasks.map((task) => (
              <AssignedTaskRow key={task.id}>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>{task.collaboratorAssignedName}</td>
              </AssignedTaskRow>
            ))}
          </tbody>
        </AssignedTaskTable>
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

const AssignedTaskTable = styled(TaskTable)`
  margin-top: 40px; // Espaciado entre las tablas
`;

const TaskRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const AssignedTaskRow = styled(TaskRow)``;

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
