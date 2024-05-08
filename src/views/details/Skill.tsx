import React from 'react' 
import { useSkill } from '@hooks/useDetails';
import CardSkill from '@cards/CardSkill';
 
export default function Skill() {
  const { skillList, loading, error } = useSkill();
 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' ,padding:"15px", flexWrap: 'wrap'}}>
    {skillList?.map((item: ISkill, index: number) => (
      <CardSkill key={index} skillData={item} />
    ))} 
</div>
  );
}
