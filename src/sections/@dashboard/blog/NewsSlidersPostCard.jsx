// @mui
import { styled } from '@mui/material/styles';
import { BarLoader } from 'react-spinners';
import {
  Box,
  Typography,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Button,
  Modal,
  FormControl,
  Chip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { MutatingDots } from 'react-loader-spinner';
import cryptoJs from 'crypto-js';
import { useMediaQuery } from 'react-responsive'
// ----------------------------------------------------------------------

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const override = {
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  position: 'absolute',
};

// ----------------------------------------------------------------------

export default function SliderTable() {
  const [slider, setSlider] = useState([]);
  const [imageSlider, setImageSlider] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleClose = () => setOpen(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })
  const [editStatus, setEditStatus] = useState('');
  const [editName, setEditName] = useState('');
  const [editDetail, setEditDetail] = useState('');
  const [editId, setEditId] = useState();

  function handleOpen(image) {
    setOpen(true);
    setImageSlider(image);
  }

  const token = localStorage.getItem('token');
  
  async function editSlider() {
    setLoadingEdit(true);

    const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .put(
        `/slider/${editId}`,
        {
          status: editStatus,
          name: editName,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': decrypt.toString(cryptoJs.enc.Utf8),
          },
        }
      )
      .then((result) => {
        if (result.status === 200 || result.status === 201) {
          async function getSlider() {
            await axiosNew.get('/slider').then((result) => {
              setSlider(result.data.data);
              setLoading(false);
              handleCloseEdit();
            });
          }
          getSlider();
          setLoadingEdit(false);
        }
      }).catch((err) => {
        if(err.response.status === 401) {
          localStorage.removeItem("token")
          window.location.href = "/login"
        } else {
          alert(err.response.data.message)
        } });
  }

  useEffect(() => {
    setLoading(true);
    const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    async function getSlider() {
      await axiosNew
        .get('/slider', {
          headers: {
            Authorization: decrypt.toString(cryptoJs.enc.Utf8),
          },
        })
        .then((result) => {
          if(result.status === 200) {
          setSlider(result.data.data);
          setLoading(false);
          }
        }).catch((err) => {
          if(err.response.status === 401) {
            localStorage.removeItem("token")
            window.location.href = "/login"
          } else {
            alert(err.response.data.message)
          }
        });
    }
    getSlider();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slider.map((result, i) => {
              return (
                <TableRow
                  sx={{
                    '&:last-child td, &:lastchild th': { border: 0 },
                  }}
                  key={result.id}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{result.name}</TableCell>
                  <TableCell align="left">{result.detail}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleOpen(result.image)}>
                      <InsertDriveFileIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    {result.status === 1 ? (
                      <Chip
                        sx={{
                          color: 'white',
                        }}
                        label="Active"
                        color="success"
                      />
                    ) : null}
                    {result.status === 2 ? (
                      <Chip
                        label="OFF"
                        sx={{
                          color: 'white',
                        }}
                        color="error"
                      />
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleOpenEdit();
                        setEditStatus(result.status);
                        setEditName(result.name);
                        setEditDetail(result.detail);
                        setEditId(result.id);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Modal For Image */}
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
            <img src={`https://homefund-beta.xyz//dashboard-api/static/slider/${imageSlider}`} alt="Static API Image" />
          )}
        </Box>
      </Modal>

      {/* Modal Edit Slider */}
      {loadingEdit === false ? (
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={boxStyle}>
            <FormControl fullWidth sx={{ marginBottom: '20px' }}>
              <Typography
                id="modal-modal-title"
                sx={{
                  marginBottom: '20px',
                }}
              >
                Switch ON / OFF Slider
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={editStatus === 1 ? true : false}
                    onClick={(e) => {
                      setEditStatus(e.target.checked ? 1 : 2);
                    }}
                  />
                }
                label={editStatus === 1 ? 'ON' : 'OFF'}
              />
            </FormControl>

            <Button variant="contained" color="primary" onClick={() => editSlider()} fullWidth>
              Save
            </Button>
          </Box>
        </Modal>
      ) : (
        <MutatingDots
          height="100"
          width="100"
          color="#1D3996"
          secondaryColor="#1D3996"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          wrapperClass=""
          visible={true}
        />
      )}
    </>
  );
}
