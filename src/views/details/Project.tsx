import React from 'react'
import CardProject from '@cards/CardProject'; 
import { useProjectAll } from '@hooks/useProject';
 
export default function Project() {
  const { ProjectList, loading, error } = useProjectAll();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {ProjectList?.map((item:IProject) => (
            <CardProject  projectData={item} />
      ))}
    </div>
  );
}
