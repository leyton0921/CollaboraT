'use client';

import NavbarUser from "../UI/navbaruser";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Spinner from "../UI/Spiner/spiner";


// Interface definitions
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

function Users() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const projectId = '3bea95d3-31a4-4307-9e4a-055ae943ef65'; // Change this to your project ID

  const router = useRouter(); 
  const role = localStorage.getItem('role');
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (role !== 'collaborator') {
      router.push("/"); 
    }
  }, [role, router]);

  if (role !== 'collaborator') {
    return <Spinner />;
  }

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/v1/tasks/projects?projectId=${projectId}`);
        if (!response.ok) throw new Error('Error loading tasks');

        const data: Task[] = await response.json();
        setTasks(data);
        localStorage.setItem('tasks', JSON.stringify(data)); // Save to localStorage
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // Retrieve tasks from localStorage if they exist
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
      setLoading(false);
    } else {
      fetchTasks();
    }
  }, [projectId]);

  const updateTaskInServer = async (task: Task) => {
    try {
      await fetch(`http://localhost:4000/api/v1/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      localStorage.setItem('tasks', JSON.stringify(tasks)); // Update localStorage
    } catch (error) {
      console.error("Error updating the task:", error);
    }
  };

  const handleStatusChange = (id: string, newStatus: 'pending' | 'in progress' | 'completed') => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    const updatedTask = updatedTasks.find(task => task.id === id);
    if (updatedTask) {
      updateTaskInServer(updatedTask);
    }
  };

  const handleCommentChange = (id: string, comment: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, comment } : task
    );
    setTasks(updatedTasks);
    const updatedTask = updatedTasks.find(task => task.id === id);
    if (updatedTask) {
      updateTaskInServer(updatedTask);
    }
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update localStorage
  };

  const toggleCommentVisibility = (id: string) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, showComment: !task.showComment } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update localStorage
  };

  if (loading) {
    return <Container>Loading tasks...</Container>;
  }

  return (
    <Container>
      <NavbarUser />
      <Content>
        <h2>All Tasks</h2>
        <TaskGrid>
          {tasks.map((task) => (
            <TaskCard key={task.id} status={task.status}>
              <h3>{task.name}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <PriorityBadge priority={task.priority}>{task.priority}</PriorityBadge>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Assigned to:</strong> {task.collaboratorAssignedName}</p>
              <ToggleButton onClick={() => toggleCommentVisibility(task.id)}>
                {task.showComment ? 'Hide Comment' : 'Leave Comment'}
              </ToggleButton>
              {task.showComment && (
                <CommentField 
                  value={task.comment} 
                  onChange={(e) => handleCommentChange(task.id, e.target.value)} 
                  placeholder="Leave a comment..."
                />
              )}
              <SmallButton onClick={() => handleStatusChange(task.id, 'in progress')}>
                Mark as In Progress
              </SmallButton>
              <SmallButton onClick={() => handleStatusChange(task.id, 'completed')}>
                Mark as Completed
              </SmallButton>
              <SmallButton onClick={() => handleStatusChange(task.id, 'pending')}>
                Mark as Pending
              </SmallButton>
            </TaskCard>
          ))}
        </TaskGrid>
      </Content>
    </Container>
  );
}

export default Users;

// Styles
const Container = styled.div`
  font-family: 'Segoe UI', 'Arial', sans-serif;
  text-align: center;
  margin-top: 20px;
`;

const Content = styled.div`
  padding: 0 20px;
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const TaskCard = styled.div<{ status: string }>`
  background-color: ${({ status }) => (status === 'pending' ? '#ffffff' : (status === 'in progress' ? '#fff3cd' : '#e3f9e5'))};
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
  
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
