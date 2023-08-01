import { Stack, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import TransactionCard from '../sections/@dashboard/transaction/TransactionCard';

export default function TransactionPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard: Transaction | HomeFund</title>
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
          Transaction History
        </Typography>
        {/* <ProductNewPost /> */}
      </Stack>

      <TransactionCard />
    </>
  );
}
