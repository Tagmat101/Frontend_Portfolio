import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardPortfolio from '../cards/PortfolioCards/CardPortfolio'; 
import { GetAllPortfolios } from 'src/pages/api/PortfolioServices/Services';
import { CircularProgress, TextField, MenuItem } from '@mui/material';
import {useDataFetching} from 'src/@core/hooks/useFetchingData';
import { GetCategoriesPortActive } from '@api/CategoriePortServices/Service';

const ViewPortfolios = () => {
  const { data: portfolioData, loading: portfolioLoading, error: portfolioError } = useDataFetching<PortfolioData[]>(GetAllPortfolios);
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useDataFetching<Categorie[]>(GetCategoriesPortActive);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibility , setVisibility] = useState('')
  const filteredData = portfolioData?.filter(portfolio => {
    const categoryMatch = !categoryFilter || portfolio.categorie.name === categoryFilter;
    const colorMatch = !colorFilter || portfolio.color === colorFilter;
    const searchTermMatch = !searchTerm || portfolio.name.toLowerCase().includes(searchTerm.toLowerCase());
    const portfolioVis = portfolio.visible ? "Public" : "Private"
    const visibilityMatch = !visibility || visibility === portfolioVis
    return categoryMatch && colorMatch && searchTermMatch && visibilityMatch;
  }) || [];

  return (
    <Grid container spacing={6} padding={10}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>View all</Typography>
      </Grid>
      <Grid item xs={12} sx={{ paddingBottom: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sx={{ paddingBottom: 2 }}>
        <TextField
          select
          label="Filter by category"
          variant="outlined"
          fullWidth
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {
            categoryData && categoryData.map((category:Categorie) => {
                return(
                  <MenuItem value={category.name}>{category.name}</MenuItem>
                )
            })
          }
        </TextField>
      </Grid>

      <Grid item xs={12} sx={{ paddingBottom: 2 }}>
        <TextField
          select
          label="Filter by Visibility"
          variant="outlined"
          fullWidth
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Public">Public</MenuItem>
          <MenuItem value="Private">Private</MenuItem>
        </TextField>
      </Grid>
      {portfolioLoading || categoryLoading ? (
        <CircularProgress style={{ marginLeft: '10px' }} size={24} />
      ) : portfolioError || categoryError ? (
        <Typography variant="body1">Error: {portfolioError?.message || categoryError?.message}</Typography>
      ) : (
        <>
          {filteredData.length > 0 ? (
            filteredData.map((portfolio, index) => (
              <Grid key={index} item xs={12} sm={6} md={3}>
                <CardPortfolio portfolio={portfolio} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No portfolios match the selected filters.</Typography>
          )}
        </>
      )}
    </Grid>
  );
}

export default ViewPortfolios;
