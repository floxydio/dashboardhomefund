import { useState } from 'react';
import Iconify from '../../../components/iconify';
import { Button } from '@mui/material';
import axiosNew from '../../../components/AxiosConfig';

export default function NewPost() {
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');

//   async function submitDataNewPost(e) {
//     e.preventDefault();
//     await axiosNew.post(
//       '/slider',
//       {
//         name: newName,
//         detail: newDetail,
//         image: newImage,
//         status: newStatus,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       }
//     );
//   }
  return (
    <>
      <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
        New Post
      </Button>
    </>
  );
}
