import React, { useState } from 'react';
import { Button, Typography, Link, Box } from '@mui/material';
import { Typewriter } from 'react-simple-typewriter';
import { Github, Linkedin } from 'mdi-material-ui';

const Header = ({ data }: { data: PortfolioData }) => {
  const [showResume, setShowResume] = useState(false);

  const handleViewResume = () => {
    setShowResume(true);
  };

  const downloadPDF = (pdf: string) => {
    const randomName = generateRandomName();
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = `${randomName}_resume.pdf`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const generateRandomName = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10;
    let randomName = '';
    for (let i = 0; i < length; i++) {
        randomName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomName;
  };

  return (
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
      <button
          disabled={data.resume === ''}
          onClick={() => downloadPDF(data.resume)}
          style={{
            backgroundColor: data.resume === '' ? 'transparent' : data.color,
            padding: '13px',
            border: 'none',
            borderRadius: '4px',
            color: data.resume === '' ? 'gray' : '#000', // Optional: Change text color when transparent
            fontSize: '16px',
            cursor: data.resume === '' ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
            marginLeft: '10px',
            marginRight: '10px',
          }}
        >
          Download resume
        </button>

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
    </Box>
  );
};

export default Header;
