import React from 'react';
import { useState, useEffect } from 'react';
import {
  Button,
  Paper,
  Modal,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Box,
  Table,
  Typography,
} from '@mui/material';
import axiosNew from '../../../components/AxiosConfig';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import cryptoJs from 'crypto-js';

export default function BusinessSection() {
  const [dataProspectus, setDataProspectus] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [docs, setDocs] = React.useState([]);
  const [id, setId] = React.useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const token = localStorage.getItem('token');

  const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);


  const linkDocs = 'http://192.168.249.110:2500/dashboard-api/static/prospektus';


  async function getDataProspectus() {
    setDataProspectus([]);

    const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .get('/prospektus', {
        headers: {
          Authorization: decrypt.toString(cryptoJs.enc.Utf8),
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setDataProspectus(result.data.data);
        }
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

  useEffect(() => {
    getDataProspectus();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Nama</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Deskripsi</TableCell>
              <TableCell>Link Prospectus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProspectus?.map((row, i) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <div>
                    <Button onClick={() => {
                      window.open(`${linkDocs}/${row.file}`, '_blank');

                    }}>View</Button>

                  </div>
                </TableCell>
                <TableCell align="left">{row.deskripsi}</TableCell>
                <TableCell align="left">{row.link_prospektus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
