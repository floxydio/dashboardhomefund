import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import {
  ProductSort,
  ProductCartWidget,
  ProductFilterSidebar,
  ProductCard,
  ProductNewPost,
} from '../sections/@dashboard/products';
// mock
import PRODUCT from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [product, setProduct] = useState('');

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | HomeFund </title>
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
          Produk
        </Typography>
        {/* <ProductNewPost /> */}
      </Stack>
      <ProductCard />
    </>
  );
}
