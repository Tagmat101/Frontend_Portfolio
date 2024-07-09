import React from 'react';
import { Card, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';
import CardProjectTemplate from './CardsTemplate/CardProjectTemplate';

// Styled component for the container
const FrameContainer = styled(Card)({
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginBottom: '15px', // Adjust spacing between containers
  margin: '10px', // Add margin to each FrameContainer
});

const ProjectsTemp = ({ data }) => {
  return (
    data.length > 0 ? 
    <Grid container spacing={4} direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography variant='h3' sx={{ paddingBottom: 4, marginTop: 4 }}>Projects</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h6' align="center">My work experience as a software engineer and working on different companies and projects.</Typography>
      </Grid>
      <Grid container item xs={12} spacing={3}>
        {data?.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FrameContainer>
              <CardProjectTemplate projectData={item} />
            </FrameContainer>
          </Grid>
        ))}
      </Grid>
    </Grid> : null
  );
};

export default ProjectsTemp;
