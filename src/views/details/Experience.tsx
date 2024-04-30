import React from 'react'
import CardExperience from '@cards/CardExperience'; 
import { useExperience } from '@hooks/useDetails';
 
export default function Experience() {
  const { experienceList, loading, error } = useExperience();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {experienceList?.map((item:IExperience) => (
            <CardExperience  experienceData={item} />
      ))}
    </div>
  );
}
