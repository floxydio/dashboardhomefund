import { useEffect, useState } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { BarLoader } from 'react-spinners';
import cryptoJs from 'crypto-js';
import { useMediaQuery } from 'react-responsive'


const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflowY: 'scroll',
  height: 500,
  p: 4,
};

const textFieldStyle = {
  marginBottom: 10,
};

const override = {
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  position: 'absolute',
};

export default function VirtualAccountCard() {
  const [virtualAccount, setVirtualAccount] = useState([]);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [iconVirtual, setIconVirtual] = useState('');
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })

  function handleOpen(image) {
    setOpen(true);
    setIconVirtual(image);
  }

  const handleClose = () => setOpen(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getVirtualAccout() {
      const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
      await axiosNew
        .get('/virtualaccount', {
          headers: {
            Authorization: decrypt.toString(cryptoJs.enc.Utf8),
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setVirtualAccount(res.data.data);
          }
        }).catch((err) => {
          if (err.response.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/login"
          } else {
            alert(err.response.data.message)
          }
        });
    }
    getVirtualAccout();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>VAT</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {virtualAccount.map((result, i) => {
              return (
                <TableRow sx={{ '&:last-child td, &:lastchild th': { border: 0 } }} key={result.id}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{result.name}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleOpen(result.icon)}>
                      <InsertDriveFileIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">{result.description}</TableCell>
                  <TableCell align="left">{result.vat}</TableCell>
                  <TableCell align="left">{result.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle} noValidate autoComplete="off">
          {loading ? (
            <BarLoader
              color="#274F99"
              loading={loading}
              size={30}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <>
              <Typography
                sx={{
                  textAlign: 'center',
                }}
              >
                Virtual Account Icon{' '}
              </Typography>
              <img
                src={`https://homefund-beta.xyz/dashboard-api/static/virtualaccount/${iconVirtual}`}
                alt="Static API Image"
              />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
