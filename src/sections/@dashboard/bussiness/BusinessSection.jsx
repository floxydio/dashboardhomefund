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
  // const handleOpen = () => setOpen(true);
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

  // const docs = [
  //   {
  //     uri: 'https://279e-2400-9800-4e0-d302-dbdd-caa4-eee2-741f.ngrok-free.app/dashboard-api/static/prospektus/prospektus_f065c174-311f-44db-822f-8d10fce0c615_PTIOTECH.pdf',
  //   },
  // ];

  // function getPdf(id, file) {
  //   setId(id);
  //   setDocs(file);
  //   setOpen(true);
  // }

  async function getPdf(id) {
    const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    axiosNew
      .get(`/prospektus/${id}`, {
        headers: {
          Authorization: decrypt.toString(cryptoJs.enc.Utf8),
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setDocs(result.data.data[0].file);
          setOpen(true);
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
              <TableCell>Nama</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Deskripsi</TableCell>
              <TableCell>Link Prospectus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProspectus?.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <Button onClick={() => getPdf(row.id)}>View</Button>
                </TableCell>
                <TableCell align="left">{row.deskripsi}</TableCell>
                <TableCell align="left">{row.link_prospektus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {docs?.map((data, i) => {
            <div key={i}>
              {/* <DocViewer
                pluginRenderers={DocViewerRenderers}
                documents={uri: }
                style={{ width: 'auto', height: 'auto' }}
                config={{
                  header: {
                    disableHeader: true,
                    disableFileName: true,
                    retainURLParams: true,
                  },
                }}
              /> */}
              {/* <iframe
                src={`https://279e-2400-9800-4e0-d302-dbdd-caa4-eee2-741f.ngrok-free.app/dashboard-api/static/prospektus/${data}`}
                width="100px"
                height="100px"
              /> */}
            </div>;
          })}
          {/* <Typography>Test</Typography> */}
        </Box>
      </Modal>
    </>
  );
}
