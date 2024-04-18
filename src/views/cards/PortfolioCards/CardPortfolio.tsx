// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { PortfolioData } from 'src/utils/interfaces/int'
import { Theme } from '@mui/material/styles';
import { useContext, useState } from 'react'
import { PortfolioContext } from 'src/@core/context/PortfolioContext'
import { DeletePortfolio } from 'src/pages/api/PortfolioServices/Services'

interface CardPortfolioProps {
  portfolio: PortfolioData;
}

const CardPortfolio = ({ portfolio }: CardPortfolioProps) => {
  // ** States
  const {setModify,modify,setValue,setDataPortfolioMod} = useContext(PortfolioContext)
  // ** Functions 
  const handleModifyButton = () => {
    setModify(true)
    setValue('portfolio')
    setDataPortfolioMod(portfolio)
  }

  const handleDeleteButton = async () => {
      try
      {
        const response = await DeletePortfolio(portfolio.id)
        alert(response.data.message)
        document.location.reload()
      } catch(error:any) {
         console.log(error)
         alert(error.response.data.message)
      }
  }

  return (
    <Card>
      <div style={{ height: '9.375rem', backgroundColor: portfolio.color }} ></div>
      <CardContent sx={(theme: Theme) => ({ padding: `${theme.spacing(3)} ${theme.spacing(5.25)} ${theme.spacing(4)} !important` })}>
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {portfolio?.name}
        </Typography>
        <Typography sx={{ marginBottom: 2 }}> {portfolio?.name}</Typography>
        <Button onClick={handleModifyButton}>Modify</Button>
        <Button>View portfolio</Button>
      </CardContent>
      <Button onClick={handleDeleteButton} variant='contained' sx={{ py: 2.5, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0 , background: 'red'}}>
        Delete
      </Button>
    </Card>
  )
}

export default CardPortfolio
