import React from 'react'
import CardProject from '@cards/CardProject'; 
import { useProject } from '@hooks/useDetails';
 
export default function Project() {
  const { projectList, loading, error } = useProject();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {projectList?.map((item:IProject) => (
            <CardProject  projectData={item} />
      ))}
    </div>
  );
}
