import React from 'react';
import {
  Card,
  Box,
  Typography,
  Grid,
  styled,
  CardContent
} from '@mui/material';

// Styled Image component
const StyledImage = styled('img')({
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
  borderRadius: '8px 8px 0 0'
});

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: theme.spacing(2)
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  marginRight: theme.spacing(1)
}));

const formatDate = (date: string): string => date.split('T')[0];

export default function CardProjectTemplate({ projectData }: { projectData: IProject }) {
  return (
    <Card sx={{ margin: 2, borderRadius: 2, boxShadow: 3 }}>
      <StyledImage src={projectData.imageUrl} alt={projectData.name} />
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          {projectData.name}
        </Typography>
        <InfoBox>
          <Label variant="body2">Description:</Label>
          <Typography variant="body2">{projectData.description}</Typography>
        </InfoBox>
        <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
          {formatDate(projectData.startDate)} - 
          <Box component="span" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
            {formatDate(projectData.endDate)}
          </Box>
        </Typography>
        <InfoBox>
          <Label variant="body2">Responsibilities:</Label>
          <Box>
            {projectData.responsibilities.map((item, index) => (
              <Typography key={index} variant="body2" sx={{ marginRight: 2 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </InfoBox>
        <InfoBox>
          <Label variant="body2">Achievements:</Label>
          <Box>
            {projectData.achievements.map((item, index) => (
              <Typography key={index} variant="body2" sx={{ marginRight: 2 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </InfoBox>
        <InfoBox>
          <Label variant="body2">Skills:</Label>
          <Box>
            {projectData.skills.map((item, index) => (
              <Typography key={index} variant="body2" sx={{ marginRight: 2 }}>
                {item.name}
              </Typography>
            ))}
          </Box>
        </InfoBox>
      </CardContent>
    </Card>
  );
}
