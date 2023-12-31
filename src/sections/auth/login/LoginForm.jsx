import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import axiosNew from '../../../components/AxiosConfig';
import cryptoJs from 'crypto-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// ----------------------------------------------------------------------

export default function LoginForm() {
  // Navigasi
  const navigate = useNavigate();

  // Credential Error
  const [credentialError, setCredentialError] = useState('');

  //  Data Handle
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  async function signInAccount() {
    axiosNew
      .post(
        '/signin',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "ngrok-skip-browser-warning": 'any'
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setCredentialError('')
          let encrypt = cryptoJs.AES.encrypt(res.data.token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
          localStorage.setItem('token', encrypt);
          navigate('/dashboard', { replace: true });
        }
      }).catch((err) => {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      });
  }

  const handleKeyPress = (event) => {
    event.preventDefault()
    if (event.key === 'Enter') {
      signInAccount()
    }
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleKeyPress}>
        <Stack spacing={3} sx={{ marginTop: 5 }}>
          <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Link href="https://google.com" target="_blank" variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={signInAccount}>
          Masuk
        </LoadingButton>

      </form>
    </>
  );
}
