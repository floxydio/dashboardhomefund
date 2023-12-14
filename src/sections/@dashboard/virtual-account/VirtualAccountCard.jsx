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
  TextField,
  Typography,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { BarLoader } from 'react-spinners';
import cryptoJs from 'crypto-js';
import { useMediaQuery } from 'react-responsive';


const textFieldStyle = {
  marginBottom: 15,
  marginTop: 15,
};

const override = {
  transform: 'translate(-50%, -50%)',
  top: '50%',
  left: '50%',
  position: 'absolute',
};

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
  height: 250,
  p: 4,
};


export default function VirtualAccountCard() {

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [iconVirtual, setIconVirtual] = useState('');
  const [virtualAccount, setVirtualAccount] = useState([]);
  const [openEditData, setOpenEditData] = useState(false); // Edit Modal
  const [isOpenDelete, setIsOpenDelete] = useState(false); // Delete Modal

  const isMobile = useMediaQuery({ query: '(max-width: 700px)' })

  function handleOpen(image) {
    setOpen(true);
    setIconVirtual(image);
  }

  const handleClose = () => setOpen(false);
  const openModalDelete = () => setIsOpenDelete(true);
  const closeModalDelete = () => setIsOpenDelete(false);
  const handleCloseEditData = () => setOpenEditData(false);

  const token = localStorage.getItem('token');

  // Use State Edit VA
  const [editId, setEditId] = useState(0);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");
  const [editVat, setEditVat] = useState(0);
  const [editStatus, setEditStatus] = useState(1);
  const [editDescription, setEditDescription] = useState("");
  const [editTypeVa, setEditTypeVa] = useState(0);


  const handleFunctionEdit = (
    id,
    name,
    icon,
    vat,
    status,
    description,
    type_va,
  ) => {
    setEditId(id);
    setEditName(name);
    setEditIcon(icon);
    setEditVat(vat);
    setEditStatus(status);
    setEditDescription(description);
    setEditTypeVa(type_va)
    setOpenEditData(true)
  };

  async function submitEditDataVA(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append('name', editName);
    formData.append('image_va', editIcon);
    formData.append('vat', editVat);
    formData.append('status', editStatus);
    formData.append('description', editDescription);
    formData.append('type_va', editTypeVa);

    const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .put(`/virtualaccount/${editId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: decrypt.toString(cryptoJs.enc.Utf8),
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setOpenEditData(false);
          getVirtualAccount();
        }
      })
      .catch((err) => {
        alert(err);
      })
  }

  function deleteVA(id) {
    const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);

    axiosNew
      .delete(`/virtualaccount/${id}`, {
        headers: {
          Authorization: decrypt.toString(cryptoJs.enc.Utf8),
        },
      })
      .then(() => {
        setIsOpenDelete(false);
        getVirtualAccount();
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          alert(err.response.data.message);
        }
      });
  }

  async function getVirtualAccount() {
    setVirtualAccount([])
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

  useEffect(() => {
    getVirtualAccount();
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        style={{ marginLeft: isMobile ? 20 : 0, marginRight: isMobile ? 20 : 0 }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>VAT</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type_VA</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Hapus</TableCell>
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
                  <TableCell align="left">{result.vat}</TableCell>
                  <TableCell align="left">{result.status}</TableCell>
                  <TableCell align="left">{result.description}</TableCell>
                  <TableCell align="left">{result.type_va}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() =>
                        handleFunctionEdit(
                          result.id,
                          result.name,
                          result.icon,
                          result.vat,
                          result.status,
                          result.description,
                          result.type_va,
                        )
                      }
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>

                  {/* Delete */}
                  <TableCell align="left">
                    <div>
                      <Button onClick={openModalDelete}>Delete</Button>
                      <Modal open={isOpenDelete} onClose={closeModalDelete}>
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: isMobile ? '100%' : 500,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            overflowY: 'scroll',
                            height: 250,
                            p: 4,
                          }}
                          noValidate
                          autoComplete="off"
                        >
                          <Typography
                            variant="h5"
                            sx={{
                              textAlign: 'center',
                              marginBottom: 3,
                            }}
                          >
                            Delete Data
                          </Typography>
                          <Typography>Are You Sure Want To Delete This Data</Typography>
                          <Button
                            onClick={() => deleteVA(result.id)}
                            type="submit"
                            sx={{
                              height: 45,
                              backgroundColor: '#4169E1',
                              color: 'white',
                              fontWeight: 'bold',
                              borderColor: 'transparent',
                              borderRadius: 20,
                              marginTop: 2,
                              '&:hover': {
                                backgroundColor: '#4169E1',
                              },
                            }}
                          >
                            Ya
                          </Button>
                          <Button
                            onClick={closeModalDelete}
                            type="submit"
                            sx={{
                              height: 45,
                              backgroundColor: 'red',
                              color: 'white',
                              fontWeight: 'bold',
                              borderColor: 'transparent',
                              borderRadius: 20,
                              marginTop: 2,
                              '&:hover': {
                                backgroundColor: 'red',
                              },
                            }}
                          >
                            Tidak
                          </Button>
                        </Box>
                      </Modal>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: isMobile ? '100%' : 500,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          overflowY: 'scroll',
          height: 500,
          p: 4,
        }}
          noValidate
          autoComplete="off">
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
                src={`http://192.168.249.110:2500/dashboard-api/static/virtualaccount/${iconVirtual}`}
                alt="Static API Image"
              />
            </>
          )}
        </Box>
      </Modal>

      {/* Edit */}
      <Modal
        open={openEditData}
        onClose={handleCloseEditData}
        sx={{
          height: 500,
          overflowY: 'scroll',
          marginTop: 10,
          width: isMobile ? '85%' : '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '100%' : 500,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            overflowY: 'scroll',
            height: 500,
            p: 4,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            style={{
              textAlign: 'center',
              marginBottom: '10',
            }}
            variant="h6"
            component="h2"
          >
            Edit Data Virtual Account
          </Typography>
          <FormControl sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined"
              label="Name"
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              accept="image/*"
              type="file"
              onChange={(e) => setEditIcon(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="VAT"
              type="number"
              value={editVat}
              onChange={(e) => setEditVat(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Status"
              type="number"
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Deskripsi"
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              style={textFieldStyle}
            />
            <TextField
              required
              id="outlined"
              label="Tipe VA"
              type="text"
              value={editTypeVa}
              onChange={(e) => setEditTypeVa(e.target.value)}
              style={textFieldStyle}
            />
            <Button
              onClick={submitEditDataVA}
              type="submit"
              sx={{
                height: 45,
                backgroundColor: '#4169E1',
                color: 'white',
                fontWeight: 'bold',
                borderColor: 'transparent',
                borderRadius: 20,
                marginTop: 2,
                '&:hover': {
                  backgroundColor: '#4169E1',
                },
              }}
            >
              Submit
            </Button>
            <Button
              onClick={() => setOpenEditData(false)}
              type="submit"
              sx={{
                height: 45,
                backgroundColor: 'red',
                color: 'white',
                fontWeight: 'bold',
                borderColor: 'transparent',
                borderRadius: 20,
                marginTop: 2,
                '&:hover': {
                  backgroundColor: 'red',
                },
              }}
            >
              Tutup
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
}
