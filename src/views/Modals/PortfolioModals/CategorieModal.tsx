import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { CreateCategoriePort } from 'src/pages/api/CategoriePortServices/Service';

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

const CategorieModal = ({ open, setOpen }: any) => {
  const [categoryName, setCategoryName] = React.useState('');
  const [categoryState, setCategoryState] = React.useState('active');

  const handleClose = () => setOpen(false);

   const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const categoryObject = {
      name: categoryName, 
      state: categoryState == "active" ? true : false
    };

    const response = await CreateCategoriePort(categoryObject)
    console.log(response)
    setCategoryName('');
    setCategoryState('active');
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Category Name"
              variant="outlined"
              margin="normal"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <TextField
              select
              fullWidth
              label="Category State"
              variant="outlined"
              margin="normal"
              value={categoryState}
              onChange={(e) => setCategoryState(e.target.value)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default CategorieModal;
