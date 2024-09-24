'use client';

import { Navbar } from "../UI/navbaruser";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from './modal'; // Asegúrate de que esta ruta sea correcta

interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  status: 'pending' | 'in progress' | 'completed';
  collaboratorAssignedName?: string;
}

export default function AssignTasks() {
  const links = [
    { href: "/user", name: "Mis tareas" },
    { href: "/taskunassign", name: "Tareas sin asignar" }
  ];

  const initialTasks: Task[] = [
    // ... tus tareas iniciales
  ];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToUnassign, setTaskToUnassign] = useState<Task | null>(null);

  useEffect(() => {
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
    // Aquí puedes llamar a tu API para guardar el cambio
  };

  const handleOpenModal = (task: Task) => {
    setTaskToUnassign(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskToUnassign(null);
  };

  const handleConfirmUnassign = async () => {
    if (!taskToUnassign) return;

    // Actualiza el estado
    setAssignedTasks((prev) => prev.filter(t => t.id !== taskToUnassign.id));

    // Aquí puedes llamar a tu API para guardar el cambio
    try {
      await fetch(`http://localhost:4000/api/v1/tasks/unassign/${taskToUnassign.id}`, {
        method: 'PUT', // O el método que corresponda
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ assigned: false })
      });
    } catch (error) {
      console.error("Error desasignando tarea:", error);
    }

    handleCloseModal();
  };

  return (
    <Container>
      <Navbar links={links} />
      <Content>
        <Section>
          <SectionTitle>Tareas Sin Asignar</SectionTitle>
          <TaskGrid>
            {tasks.map((task) => (
              <TaskCard key={task.id}>
                <h3>{task.name}</h3>
                <p><strong>Descripción:</strong> {task.description}</p>
                <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
                <p><strong>Fecha de Vencimiento:</strong> {task.dueDate}</p>
                <p><strong>Estado:</strong> {task.status}</p>
                <AssignButton onClick={() => handleAssignTask(task)}>
                  Asignar a Ti Mismo
                </AssignButton>
              </TaskCard>
            ))}
          </TaskGrid>
        </Section>

        <Section>
          <SectionTitle>Tareas Asignadas</SectionTitle>
          <AssignedTaskGrid>
            {assignedTasks.map((task) => (
              <TaskCard key={task.id}>
                <h3>{task.name}</h3>
                <p><strong>Descripción:</strong> {task.description}</p>
                <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
                <p><strong>Fecha de Vencimiento:</strong> {task.dueDate}</p>
                <p><strong>Estado:</strong> {task.status}</p>
                <p><strong>Colaborador Asignado:</strong> {task.collaboratorAssignedName}</p>
                <AssignButton onClick={() => handleOpenModal(task)}>
                  Desasignar
                </AssignButton>
              </TaskCard>
            ))}
          </AssignedTaskGrid>
        </Section>
      </Content>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmUnassign}
      />
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

const Section = styled.section`
  margin-top: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: #28a745;
  margin-bottom: 20px;
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const AssignedTaskGrid = styled(TaskGrid)``;

const TaskCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;

  h3 {
    color: #28a745;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
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
