import SettingCard from '../sections/@dashboard/settings/SettingsCard';
import { Helmet } from 'react-helmet-async';
import { Stack, Typography } from '@mui/material';

export default function BusinessPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Business | Homefund </title>
      </Helmet>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        sx={{
          paddingLeft: '40px',
          paddingRight: '40px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Setting Page
        </Typography>
        <SettingCard />
      </Stack>
    </>
  );
}
