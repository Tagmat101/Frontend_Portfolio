import React, { useState } from 'react';
import { Card, Box, styled, Typography, Grid } from '@mui/material';
import { useProjectAll, useProjectByID } from '@hooks/useProject';
import CardProTemplate from './CardsTemplate/CardProTemplate';

// Styled component for the container
const FrameContainer = styled(Card)({
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginBottom: '15px', // Adjust spacing between containers
  margin: '10px', // Add margin to each FrameContainer
});

const ProjectsTemp = ({data}:{data:IProject[]}) => {
  return (
    data.length > 0 ? 
    <Grid container direction="column" alignItems="center">
      <Grid item>
        <Typography variant='h3' sx={{ paddingBottom: 4,marginTop: 4 }}>Projects</Typography>
      </Grid>
      <Grid item>
        <Typography variant='h6' align="center">My work experience as a software engineer and working on different companies and projects.</Typography>
      </Grid>
      {data?.map((item, index) => (
        <Grid item xs={12} key={index}>
            <CardProTemplate projectData={item} />
        </Grid>
      ))}
    </Grid> : <></>
  );
};

export default ProjectsTemp;
