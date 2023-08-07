import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import axiosNew from '../../../components/AxiosConfig';

// ----------------------------------------------------------------------

export default function LoginForm() {
  // Navigasi
  const navigate = useNavigate();

  //  Data Handle
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false);

  async function signInAccount() {
    axiosNew.post("/signin", 
    {
      email: email,
      password: password
    },{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
         
      }
    }).then((res) => {
        if(res.status === 200) {
          localStorage.setItem("token", res.data.token)
          localStorage.setItem("name_user", res.data.data.name)
          navigate('/dashboard', { replace: true });
        } else {
          alert("Email atau Password Salah");
        }
    })
  }

  return (
    <>
      <Stack spacing={3}>
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
        <Link href='https://google.com' target='_blank' variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={signInAccount}>
        Login
      </LoadingButton>
    </>
  );
}
