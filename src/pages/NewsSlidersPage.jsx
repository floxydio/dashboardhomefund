import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Stack, Typography } from '@mui/material';
// components
// mock
import POSTS from '../_mock/blog';
import NewPost from '../sections/@dashboard/blog/NewsSliderNewPost';
import SliderTable from '../sections/@dashboard/blog/NewsSlidersPostCard';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function SliderPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Slider | HomeFund </title>
      </Helmet>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} sx={{
        paddingLeft: "40px",
        paddingRight: "40px"
      }}>
        <Typography variant="h4" gutterBottom>
          Slider
        </Typography>
        <NewPost />
      </Stack>
      <Grid container spacing={3} sx={{
        paddingLeft: "40px",
        paddingRight: "40px"
      }}>
        {/* Tabel SLider */}
        <SliderTable />
      </Grid>
    </>
  );
}
