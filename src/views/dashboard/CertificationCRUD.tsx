import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Card, CardContent } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const CertificationCRUD = () => {
  const [open, setOpen] = useState(false);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setCertifications([...certifications, input]);
    setInput('');
    handleClose();
  };

  const handleDelete = (certification: string) => {
    setCertifications(certifications.filter(c => c !== certification));
  };

  return (
    <Card>
      <CardContent>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Certification
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add a new Certification</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new certification, please enter its name here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Certification Name"
              type="text"
              fullWidth
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleAdd} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
        <TextField label="Search" value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
        <List>
          {certifications.filter(c => c.includes(search)).map((certification, index) => (
            <ListItem key={index}>
              <ListItemText primary={certification} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(certification)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default CertificationCRUD;
