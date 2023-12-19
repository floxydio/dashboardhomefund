import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// sections
import { useMediaQuery } from 'react-responsive';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TawkMessagerReact from '@tawk.to/tawk-messenger-react';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
  const tawkMessengerRef = useRef();

  const onLoad = () => {
    console.log('onLoad works!');
  };

  return (
    <>
      <Helmet>
        <title> Dashboard | HomeFund </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Selamat Datang
        </Typography>

        {isMobile ? (
          <div
            style={{
              width: '100%',
            }}
          >
            <Card sx={{ minWidth: 275, marginTop: 5 }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>Total Transaksi</Typography>
                <Typography variant="h5" component="div">
                  Rp1.500.000.000
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, marginTop: 5 }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>
                  Product yang di Terbitkan
                </Typography>
                <Typography variant="h5" component="div">
                  3
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, marginTop: 5 }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>Total User</Typography>
                <Typography variant="h5" component="div">
                  40
                </Typography>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
            }}
          >
            <Card sx={{ minWidth: 275, marginTop: 5, marginRight: 2 }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>Total Transaksi</Typography>
                <Typography variant="h5" component="div">
                  Rp1.500.000.000
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, marginTop: 5, marginRight: 2 }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>
                  Product yang di Terbitkan
                </Typography>
                <Typography variant="h5" component="div">
                  3
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 275, marginTop: 5, marginRight: 2 }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, fontWeight: 'bold', marginBottom: 2 }}>Total User</Typography>
                <Typography variant="h5" component="div">
                  40
                </Typography>
              </CardContent>
            </Card>
          </div>
        )}

        <TawkMessagerReact
          propertyId="65813f6a07843602b80389b9"
          widgetId="1hi0dve8l"
          // ref={tawkMessengerRef}
          onLoad={onLoad}
        />
      </Container>
    </>
  );
}
