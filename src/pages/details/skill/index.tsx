import {useContext, useEffect, useState} from 'react'

import { useSkill } from '@hooks/useDetails'; 
import CardSkill from '@cards/CardSkill';  
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


export default function page(){
  // ** State
  const { skillList, loading, error} = useSkill();
  
   const { setOpenSkill} = useContext(DetailsPortfolioContext); 
  
 
  const handleCreate =  () => {
    setOpenSkill(true)
 };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
 
 
  return (
    <Card>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,padding:"15px"}}>
 
           <Box sx={{ display: 'flex', alignItems: 'center' }}> 
                <School />
                <TabName>Skill</TabName>
            </Box>  
            <Button variant="outlined" onClick={handleCreate} endIcon={<Plus />}> 
               Add 
            </Button>  
        </div>
        <div >
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' ,padding:"15px", flexWrap: 'wrap'}}>
              {skillList?.map((item: ISkill, index: number) => (
                <CardSkill key={index} skillData={item} />
              ))} 
          </div>
    
    </div>
  

    </Card>
  )
}

 