import React from 'react';
import ProjectList from '../components/projectList';

const App: React.FC = () => {
  const token = 'tu_token'; // Reemplaza esto con el token real
  const companyId = 'ef990d74-1c98-4d31-8ba7-22f1047a91b0'; // ID de la compañía
  const leaderId = 'ce184a14-af92-466e-b6b9-f5762a9d906e'; // ID del líder

  return (
    <ProjectList token={token} companyId={companyId} leaderId={leaderId} />
  );
};

export default App;