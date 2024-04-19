import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { GetCategoriesPort, DeleteCategoriePort } from 'src/pages/api/CategoriePortServices/Service';
import { ThemeColor } from 'src/@core/layouts/types';
import { Pencil, TrashCan } from 'mdi-material-ui';
import { CategorieContext } from 'src/@core/context/CategorieContext';
import { Categorie } from 'src/utils/interfaces/int';
import useDataFetching from 'src/@core/hooks/useFetchingData';

interface StatusObj {
  [key: string]: {
    color: ThemeColor;
  };
}

const statusObj: StatusObj = {
  active: { color: 'info' },
  inactive: { color: 'error' },
};

const CategoriesPortTable = () => {
  const [errorMessage,setErrorMessage] = React.useState('')
  const { setModify, setDataCategorieMod , setOpenCatModal , setOpenCatDelete , setIdDelete } = React.useContext(CategorieContext);
  const { data: categoriesData, loading } = useDataFetching(GetCategoriesPort);

  const handleUpdate = (data : Categorie) => {
    //construct a categorie data cause having a mongodb dbref on that User
    const constructData:Categorie = {
      id: data.id,
      name: data.name,
      state: data.state
    }
    setOpenCatModal(true);
    setModify(true);
    setDataCategorieMod(constructData);
  };

  
  const handleDelete = (categoryId: string) => {
    setOpenCatDelete(true);
    setIdDelete(categoryId);
  };

  return (
    <Card>
      {errorMessage}
      {loading ? (
        <CircularProgress size={24} />
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesData?.map((row:Categorie) => (
                <TableRow key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.id}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.state ? 'active' : 'inactive'}
                      color={statusObj[row.state ? 'active' : 'inactive'].color}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(row.id)}>
                      <TrashCan color="error" />
                    </Button>
                    <Button onClick={() => handleUpdate(row)}>
                      <Pencil />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* <CategorieModal open={openModal} setOpen={setOpenModal} /> */}
      {/* just letting this here will help control it better (needs optimization ) */}
    </Card>
  );
};

export default CategoriesPortTable;
