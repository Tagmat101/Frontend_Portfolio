import React, { useReducer, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { CategorieContext } from 'src/@core/context/CategorieContext';
import { DeleteCategoriePort } from 'src/pages/api/CategoriePortServices/Service';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const CategorieDModal = () => {
  const {setOpenCatDelete , openCatDelete , idToDelete} = useContext(CategorieContext);
  const [errorMessage,setErrorMessage] = useState('')
  const handleConfirmDelete = async () => {
    try 
    {
      if (idToDelete !== null) {
        await DeleteCategoriePort(idToDelete);
        document.location.reload()
      }
    } catch(error:any)
    {
      setErrorMessage(error.response.data.message)
    }
    finally {setOpenCatDelete(false);}
  };
  return (
    <Dialog
        open={openCatDelete}
        onClose={() => setOpenCatDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
    <DialogContent>
        <DialogContentText  id="alert-dialog-description">
            Are you sure you want to delete this category?
        </DialogContentText>
        <p>{errorMessage}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpenCatDelete(false)} color="primary">
        Cancel
      </Button>
      <Button onClick={handleConfirmDelete} color="primary" autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
  );
};

export default CategorieDModal;
