import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';
// sections
import { LoginForm } from '../sections/auth/login';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosNew from '../components/AxiosConfig';
import cryptoJS from 'crypto-js';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      fetchSignInData();
    }
  }

  function fetchSignInData() {
    axiosNew
      .post(
        '/signin',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',

          },
        }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          navigate('/dashboard/app');
        }
      }).catch((err) => {
        alert(err.response.data.message)

      });
  }

  return (
    <>
      <Helmet>
        <title> Login | HomeFund </title>
      </Helmet>

      <StyledRoot>

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom sx={{ textAlign: 'center' }}>
              Sign In Your Account
            </Typography>
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
