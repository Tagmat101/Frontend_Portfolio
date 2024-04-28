import React, { useState } from 'react';
import { Card, Box, styled, Typography, Grid } from '@mui/material';
import { useEducationAll } from '@hooks/useEducation';
import EducationCard from '@cards/CardEducation';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from '@mui/lab';

// Styled component for the container
const FrameContainer = styled(Card)({
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginBottom: '15px', // Adjust spacing between containers
  margin: '10px', // Add margin to each FrameContainer
});

const EducationsTemp = ({data}:{data:IEducation[]}) => {

  return (
     data.length > 0 
     ? 
     <Grid container direction="column" alignItems="center">
     <Grid item>
       <Typography variant='h3' sx={{ paddingBottom: 4,marginTop: 4 }}>Education</Typography>
     </Grid>
     <Grid item>
       <Typography variant='h6' align="center">My educational journey has been a profound experience of self-discovery and continuous growth.</Typography>
     </Grid>
     <Timeline position='alternate'>
       {data?.map((item, index) => (
         <TimelineItem key={index}>
           <TimelineOppositeContent>
             <Typography variant="body2" color="text.secondary">
               {item.startDate} - {item.endDate}
             </Typography>
           </TimelineOppositeContent>
           <TimelineSeparator>
             <TimelineDot />
             <TimelineConnector />
           </TimelineSeparator>
           <TimelineContent>
             <EducationCard educationData={item} />
           </TimelineContent>
         </TimelineItem>
       ))}
     </Timeline>
   </Grid> : <></>
  );
};

export default EducationsTemp;
