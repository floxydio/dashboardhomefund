import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import Iconify from '../../../components/iconify/Iconify';

export default function VirtualAccountNewPost() {
  const [newData, setNewData] = useState({
    name: '',
    icon: '',
    description: '',
    vat: 0,
    status: 0,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onChange={handleOpen}>
        New Post
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          height: 500,
          overflowY: 'scroll',
          marginTop: 10,
        }}
      ></Modal>
    </>
  );
}
