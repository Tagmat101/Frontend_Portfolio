import React from 'react'

import { useEducationAll } from 'src/@core/hooks/useEducation';
import EducationCard from '../../../views/cards/CardEducation';
 
type UseEducationAllReturn = {
  educationList: IEducation[];
  loading: boolean;
  error: any;
};
 
// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card' 
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline' 

 
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'
import ArrowDownDropCircleOutline from 'mdi-material-ui/ArrowDownDropCircleOutline'
import Stack from '@mui/material/Stack'
import Plus from 'mdi-material-ui/Plus'
import School from 'mdi-material-ui/School'
import Button from '@mui/material/Button'
import AddEducationModal from 'src/views/modals/AddEducation';

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))


export default function education(){
  // ** State
  const { educationList, loading, error }: UseEducationAllReturn = useEducationAll();

   const [openModal,setOpenModal] = useState(false)
 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreate =  () => {
     setOpenModal(true)
  };

  return (
    <Card>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,padding:"15px"}}>
 
           <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                <School />
                <TabName>Education</TabName>
            </Box>  
            <Button variant="outlined" onClick={handleCreate} endIcon={<Plus />}> 
               Add 
            </Button>  
        </div>
        <div >
      {educationList?.map((item:IEducation) => (
          <EducationCard  educationData={item} />
      ))}
    </div>
    <AddEducationModal open={openModal} setOpen={setOpenModal}/>

    </Card>
  )
}

 