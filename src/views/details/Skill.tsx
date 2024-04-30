import React from 'react' 
import { useSkillAll } from '@hooks/useSkill';
import CardSkill from '@cards/CardSkill';
 
export default function Skill() {
  const { skillList, loading, error } = useSkillAll();
 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {skillList?.map((item:ISkill) => (
            <CardSkill  skillData={item} />
      ))}
    </div>
  );
}
