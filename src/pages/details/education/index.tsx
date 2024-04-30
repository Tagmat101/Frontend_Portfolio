import {useContext} from 'react'

import { useEducation } from '@hooks/useDetails'; 
import EducationCard from '@cards/CardEducation'; 
import ActionEducationModal from '@modals/AddEdit_Education'; 
// ** React Imports 

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card' 
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'

// ** Icons Import 
// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css' 
import Plus from 'mdi-material-ui/Plus'
import School from 'mdi-material-ui/School'
import Button from '@mui/material/Button'
import { DetailsPortfolioContext } from 'src/@core/context/PortfolioDetailsContext';
 

 
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
  const { educationList, loading, error } = useEducation();
  const { setOpenEducation} = useContext(DetailsPortfolioContext); 
 
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleCreate =  () => {
    setOpenEducation(true)
  };
 
  return (
    <Card>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,padding:"15px"}}>
 
           <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                <School />
                <TabName>Education</TabName>
            </Box>  
            <Button variant="outlined" onClick={handleCreate} endIcon={<Plus />}> 
               Add 
            </Button>  
        </Box>
        <Box >
      {educationList?.map((item: IEducation, index: number) => (
        <EducationCard key={index} educationData={item} />
      ))} 
    </Box>
    <ActionEducationModal />

    </Card>
  )
}

 