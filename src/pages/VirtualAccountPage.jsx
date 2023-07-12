import { Container, Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { VirtualAccountCard, VirtualAccountNewPost } from '../sections/@dashboard/virtual-account';

export default function VirtualAccountPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard: Virtual Account | HomeFund </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Virtual Account
          </Typography>
          <VirtualAccountNewPost />
        </Stack>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          {/* <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          </Stack> */}
          <VirtualAccountCard />
        </Stack>
      </Container>
    </>
  );
}
