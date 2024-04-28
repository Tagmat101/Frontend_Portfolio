import React from 'react';
import { Box, styled } from '@mui/material';
import Navbar from 'src/views/Template/Navbar';
import Header from 'src/views/Template/Header';
import ProjectsTemp from 'src/views/Template/Projects';
import EducationsTemp from 'src/views/Template/Educations';
import { useRouter } from 'next/router';
import useDataFetching from '@hooks/useFetchingData';
import { GetPortfolioById } from '@api/PortfolioServices/Services';
import Contact from 'src/views/Template/Contact';

const Frame = styled(Box)({
  border: '1px solid #ccc',
});

const HomeFrame = () => {
  const router = useRouter()
  const {id} = router.query
  const { data, error, loading } = useDataFetching<PortfolioData>(() => GetPortfolioById(id as string));

  return (
    <Frame>
       {
         data && 
         <>
          <Navbar data={data.user}/>
          <Header data={data.user}/>
          <ProjectsTemp data={data.projects}/>
          <EducationsTemp data={data.educations}/>
          <Contact />
        </> 
       }
    </Frame>
  );
};

export default HomeFrame;
