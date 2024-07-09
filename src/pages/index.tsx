// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import { useDataFetching } from '@hooks/useFetchingData'
import { GetCategoriesPort, GetCategoriesPortCount } from '@api/CategoriePortServices/Service'
import { GetDataSkillsCount, getSkillAll } from '@api/SkillServices/Services'
import { GetDataProjectsCount, getProjectAll } from '@api/ProjectServices/Services'
import { getEducationAll, getEducationAllCount } from '@api/EducationServices/Services'
import { GetCountPortfolios } from '@api/PortfolioServices/Services'
import { CircularProgress } from '@mui/material'

const Dashboard = () => {
  const {data:dataCategories} = useDataFetching<Categorie[]>(GetCategoriesPortCount)
  const {data:skillsData} = useDataFetching<ISkill[]>(GetDataSkillsCount)
  const {data:projectsData} = useDataFetching<IProject[]>(GetDataProjectsCount)
  const {data:educationsData} = useDataFetching<IEducation[]>(getEducationAllCount)
  const {data:portfoliosData} = useDataFetching<PortfolioData[]>(GetCountPortfolios)

  if(!dataCategories || !skillsData || !projectsData || !educationsData || !portfoliosData) return <CircularProgress style={{ marginLeft: '10px' }} size={24} />

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy data={portfoliosData} />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard educationsData={educationsData} dataCategories={dataCategories} projectsData={projectsData} skillsData={skillsData} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <TotalEarning educationsData={educationsData} dataCategories={dataCategories} projectsData={projectsData} skillsData={skillsData}  portfoliosData={portfoliosData}/>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
