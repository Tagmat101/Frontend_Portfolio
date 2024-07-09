// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import CellphoneLink from 'mdi-material-ui/CellphoneLink'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { useDataFetching } from '@hooks/useFetchingData'
import { GetCategoriesPort } from '@api/CategoriePortServices/Service'
import { CogBox, Folder, LayersMinus, Presentation } from 'mdi-material-ui'
import { getSkillAll } from '@api/SkillServices/Services'
import { getProjectAll } from '@api/ProjectServices/Services'
import { getEducationAll } from '@api/EducationServices/Services'




const renderStats = ({dataCategories,skillsData,projectsData,educationsData}:{dataCategories:Categorie[],skillsData:ISkill[],projectsData:IProject[],educationsData:Education[]}) => {
  
  return(
    <>
      <Grid item xs={12} sm={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `warning.main`
            }}
          >
            <LayersMinus sx={{ fontSize: '1.75rem' }}/>
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Categories</Typography>
            <Typography variant='h6'>{dataCategories}</Typography>
          </Box>
        </Box>
     </Grid>


     <Grid item xs={12} sm={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `primary.main`
            }}
          >
            <CogBox sx={{ fontSize: '1.75rem' }}/>
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Skills</Typography>
            <Typography variant='h6'>{skillsData}</Typography>
          </Box>
        </Box>
     </Grid>


     <Grid item xs={12} sm={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `info.main`
            }}
          >
            <Folder sx={{ fontSize: '1.75rem' }}/>
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Projects</Typography>
            <Typography variant='h6'>{projectsData}</Typography>
          </Box>
        </Box>
     </Grid>


     <Grid item xs={12} sm={3}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant='rounded'
            sx={{
              mr: 3,
              width: 44,
              height: 44,
              boxShadow: 3,
              color: 'common.white',
              backgroundColor: `success.main`
            }}
          >
            <Presentation sx={{ fontSize: '1.75rem' }}/>
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Educations</Typography>
            <Typography variant='h6'>{educationsData}</Typography>
          </Box>
        </Box>
     </Grid>
     
    </>
  )
}

const StatisticsCard = ({dataCategories,skillsData,projectsData,educationsData}:{dataCategories:Categorie[],skillsData:ISkill[],projectsData:IProject[],educationsData:Education[]}) => {
  return (
    <Card>
      <CardHeader
        title='Statistics Card'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Typography variant='body2'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Total 48.5% growth
            </Box>{' '}
            😎 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
           {renderStats({ dataCategories, skillsData, projectsData, educationsData })}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default StatisticsCard
