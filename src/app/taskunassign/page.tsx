'use client';

import Navbar from "../UI/navbaruser";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from './modal';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  startDate: string;
  status: 'pending' | 'in progress' | 'completed';
  collaboratorAssignedId?: string | null;
  comment?: string;
}

export default function AssignTasks() {
  const links = [
    { href: "/user", name: "My Tasks" },
    { href: "/taskunassign", name: "Unassigned Tasks" }
  ];

  const [tasks, setTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToUnassign, setTaskToUnassign] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/tasks/collaborator?projectId=3bea95d3-31a4-4307-9e4a-055ae943ef65');
        if (!response.ok) {
          throw new Error(`Error fetching tasks: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setTasks(data || []);
        localStorage.setItem('availableTasks', JSON.stringify(data || []));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const storedTasks = localStorage.getItem('availableTasks');
    const storedAssignedTasks = localStorage.getItem('assignedTasks');
    
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      fetchTasks();
    }

    if (storedAssignedTasks) {
      setAssignedTasks(JSON.parse(storedAssignedTasks));
    }
  }, []);

  const handleAssignTask = (task: Task) => {
    const alreadyAssigned = assignedTasks.some(t => t.id === task.id);
    if (alreadyAssigned) {
      alert('This task is already assigned.');
      return;
    }

    const assignedTask: Task = {
      ...task,
      collaboratorAssignedId: 'Juan Pérez',
      status: 'pending'
    };

    setAssignedTasks(prev => {
      const updatedTasks = [...prev, assignedTask];
      localStorage.setItem('assignedTasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setTasks(prev => {
      const updatedTasks = prev.filter(t => t.id !== task.id);
      localStorage.setItem('availableTasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    allTasks.push(assignedTask);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
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

    setAssignedTasks(prev => {
      const updatedTasks = prev.filter(t => t.id !== taskToUnassign.id);
      localStorage.setItem('assignedTasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    });

    setTasks(prev => {
      const updatedAvailableTasks = [...prev, { ...taskToUnassign, collaboratorAssignedId: null }];
      localStorage.setItem('availableTasks', JSON.stringify(updatedAvailableTasks));
      return updatedAvailableTasks;
    });

    try {
      await fetch(`http://localhost:4000/api/v1/tasks/unassign/${taskToUnassign.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ assigned: false })
      });
    } catch (error) {
      console.error("Error unassigning task:", error);
    }

    handleCloseModal();
  };

  const handleCommentChange = (id: string, comment: string) => {
    setAssignedTasks(prev =>
      prev.map(task => (task.id === id ? { ...task, comment } : task))
    );
    const updatedTasks = assignedTasks.map(task => 
      task.id === id ? { ...task, comment } : task
    );
    localStorage.setItem('assignedTasks', JSON.stringify(updatedTasks));
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'in progress' | 'completed') => {
    setAssignedTasks(prev =>
      prev.map(task => 
        task.id === id ? { ...task, status: newStatus } : task
      )
    );

    try {
      await fetch(`http://localhost:4000/api/v1/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <Container>
      <Navbar />
      <Content>
        <Section>
          <SectionTitle>Unassigned Tasks</SectionTitle>
          <TaskGrid>
            {tasks.map((task) => (
              <TaskCard key={task.id} status={task.status}>
                <h3>{task.title}</h3>
                <p><strong>Description:</strong> {task.description}</p>
                <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
                <p><strong>Due Date:</strong> {task.dueDate}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <CommentArea
                  value={task.comment || ''}
                  onChange={(e) => handleCommentChange(task.id, e.target.value)}
                  placeholder="Add a comment..."
                />
                <AssignButton onClick={() => handleAssignTask(task)}>
                  Assign to Yourself
                </AssignButton>
              </TaskCard>
            ))}
          </TaskGrid>
        </Section>

        <Section>
          <SectionTitle>Assigned Tasks</SectionTitle>
          <AssignedTaskGrid>
            {assignedTasks.map((task) => (
              <TaskCard key={task.id} status={task.status}>
                <h3>{task.title}</h3>
                <p><strong>Description:</strong> {task.description}</p>
                <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
                <p><strong>Due Date:</strong> {task.dueDate}</p>
                <p><strong>Status:</strong> {task.status}</p>
                <p><strong>Assigned Collaborator:</strong> {task.collaboratorAssignedId || 'Not Assigned'}</p>
                <CommentArea
                  value={task.comment || ''}
                  onChange={(e) => handleCommentChange(task.id, e.target.value)}
                  placeholder="Add a comment..."
                />
                <ButtonContainer>
                  <ActionButton onClick={() => handleStatusChange(task.id, 'in progress')}>
                    Mark as In Progress
                  </ActionButton>
                  <ActionButton onClick={() => handleStatusChange(task.id, 'completed')}>
                    Mark as Completed
                  </ActionButton>
                  <ActionButton onClick={() => handleOpenModal(task)}>
                    Unassign
                  </ActionButton>
                </ButtonContainer>
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

// Styles
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

const TaskCard = styled.div<{ status: 'pending' | 'in progress' | 'completed' }>`
  background: ${({ status }) => {
    switch (status) {
      case 'in progress': return '#e7f3ff'; // Light blue for in progress
      case 'completed': return '#d4edda'; // Light green for completed
      default: return 'white'; // Default color
    }
  }};
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
      case 'high': return '#dc3545'; // Red
      case 'medium': return '#ffc107'; // Yellow
      case 'low': return '#28a745'; // Green
      default: return '#ccc';
    }
  }};
`;

const CommentArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const ActionButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  margin-right: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AssignButton = styled(ActionButton)`
  background-color: #28a745; // Green for assign button

  &:hover {
    background-color: #218838; // Darker green on hover
  }
`;
