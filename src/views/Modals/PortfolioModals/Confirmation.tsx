import React, { useReducer, useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { PortfolioContext } from 'src/@core/context/PortfolioContext';
import { CreatePortfolioPost } from '@api/PortfolioServices/Services';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Confirmation = () => {
  const { dataPortfolioCrea, openPortCrea , setOpenPortCrea ,setDataPortfolioCrea, setValue } = useContext(PortfolioContext);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      const response = await CreatePortfolioPost(dataPortfolioCrea.create)
      setDataPortfolioCrea({})
      setOpenPortCrea(false)
      setValue('view')
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
    setTimeout(() => {
      setErrorMessage('');
    }, 1000);
  };

  const handleClose = () => {
    setOpenPortCrea(false)
  }

  return (
    <div>
      <Modal
        open={openPortCrea}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Portfolio Data:
          </Typography>
          <pre>{JSON.stringify(dataPortfolioCrea.display, null, 2)}</pre>
          <form onSubmit={handleSubmit}>
            <Button type="submit" variant="contained" color="primary">
              Confirm
            </Button>
            <p>{errorMessage}</p>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Confirmation;
