import React from 'react'
import CardExperience from '../cards/CardExperience'; 
import { useExperienceAll } from 'src/@core/hooks/useExperience';
 
export default function Experience() {
  const { ExperienceList, loading, error } = useExperienceAll();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {ExperienceList?.map((item:IExperience) => (
            <CardExperience  experienceData={item} />
      ))}
    </div>
  );
}
