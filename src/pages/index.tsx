// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { useDataFetching } from '@hooks/useFetchingData'
import { GetCategoriesPort } from '@api/CategoriePortServices/Service'
import { getSkillAll } from '@api/SkillServices/Services'
import { getProjectAll } from '@api/ProjectServices/Services'
import { getEducationAll } from '@api/EducationServices/Services'
import { GetAllPortfolios } from '@api/PortfolioServices/Services'

const Dashboard = () => {
  const {data:dataCategories} = useDataFetching<Categorie[]>(GetCategoriesPort)
  const {data:skillsData} = useDataFetching<ISkill[]>(getSkillAll)
  const {data:projectsData} = useDataFetching<IProject[]>(getProjectAll)
  const {data:educationsData} = useDataFetching<IEducation[]>(getEducationAll)
  const {data:portfoliosData} = useDataFetching<PortfolioData[]>(GetAllPortfolios)

  if(!dataCategories || !skillsData || !projectsData || !educationsData || !portfoliosData) return <>Loading...</>

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
