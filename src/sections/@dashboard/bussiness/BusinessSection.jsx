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
} from '@mui/material';
import axiosNew from '../../../components/AxiosConfig';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

export default function BusinessSection() {
  const [dataProspectus, setDataProspectus] = useState([]);
  const [open, setOpen] = React.useState(false);
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

  const docs = [
    {
      uri: 'https://homefund-beta.xyz//dashboard-api/static/prospektus/prospektus_f065c174-311f-44db-822f-8d10fce0c615_PTIOTECH.pdf',
    },
  ];

  useEffect(() => {
    async function getDataProspectus() {
      await axiosNew.get('/prospektus').then((result) => {
        setDataProspectus(result.data.data);
        console.log(result.data.data);
      });
    }
    getDataProspectus();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Deskripsi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataProspectus.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <div>
                    <Button onClick={handleOpen}>View</Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <DocViewer
                          pluginRenderers={DocViewerRenderers}
                          documents={docs}
                          style={{ width: 'auto', height: 'auto' }}
                          config={{
                            header: {
                              disableHeader: true,
                              disableFileName: true,
                              retainURLParams: true,
                            },
                          }}
                        />
                      </Box>
                    </Modal>
                  </div>
                </TableCell>
                <TableCell align="left">{row.deskripsi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
