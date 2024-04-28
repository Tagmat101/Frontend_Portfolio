import React, { useState } from 'react';
import { Button, Typography, Link, Box, styled } from '@mui/material';
import { Typewriter } from 'react-simple-typewriter';
import { Eye, Github, Linkedin } from 'mdi-material-ui';

const Header = ({data}:{data:PortfolioData}) => {
  const [view, setView] = useState(false);
  const [fr, setFr] = useState(true);

  const handleViewResume = () => {
    setView(!view);
  };

  return (
    data ? 
    <Box
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: 500, fontSize: { md: '4.5rem', xs: '3rem' } }}>
        Hey 👋🏽, I'm{' '}
        <span style={{ color: data.color }}>
          <Typewriter
            words={[data.user.name]}
            loop={0}
            cursor
            cursorStyle='|'
            cursorColor={data.color}
            typeSpeed={50}
            deleteSpeed={200}
            delaySpeed={1000}
          />
        </span>
      </Typography>
      <Typography variant="body1" sx={{ fontSize: '1.125rem', marginTop: 2 }}>
        Computer Science Enthusiast :)
      </Typography>
      <Box sx={{ marginTop: 3, color: '#9e9e9e', '& a': { marginLeft: 2, marginRight: 2 } }}>
        <Link href="https://github.com/Hamza-ouabiba" target="_blank">
          <Github />
        </Link>
        <Link href="https://www.linkedin.com/in/hamza-ouabiba-b95392203/" target="_blank">
          <Linkedin />
        </Link>
      </Box>
      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginLeft: 2, marginRight: 2 }}
          onClick={handleViewResume}
          startIcon={<Eye />}
        >
          View Resume
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginLeft: 2, marginRight: 2 }}
          href="https://github.com/Hamza-ouabiba?tab=repositories"
          target="_blank"
        >
          View All projects
        </Button>
      </Box>
    </Box> : <></>
  );
};

export default Header;
