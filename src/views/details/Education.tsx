 
import React from 'react';
import { useEducation } from '@hooks/useDetails';
import EducationCard from '@cards/CardEducation';
 
type UseEducationAllReturn = {
  educationList: IEducation[];
  loading: boolean;
  error: Error | null;
};
 
export default function Education (){
  const { educationList, loading, error } = useEducation();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {educationList?.map((item:IEducation) => (
            <EducationCard  educationData={item} />
      ))}
    </div>
  );
}
