import PropTypes from 'prop-types';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Card,
  Grid,
  Avatar,
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
  TextField,
} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
import { fShortenNumber } from '../../../utils/formatNumber';
//
import SvgColor from '../../../components/svg-color';
import Iconify from '../../../components/iconify';
import { useEffect, useState } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import VisibilityIcon from '@mui/icons-material/Visibility';

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

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

// ----------------------------------------------------------------------

BlogPostCard.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default function BlogPostCard() {
  const [slider, setSlider] = useState([]);
  const [imageSlider, setImageSlider] = useState('');
  const [open, setOpen] = useState(false);

  function handleOpen(image) {
    setOpen(true);
    setImageSlider(image);
  }
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getSlider() {
      await axiosNew.get('/slider').then((result) => {
        setSlider(result.data.data);
        console.log(result.data.data);
      });
    }
    getSlider();
  }, []);

  // const POST_INFO = [
  //   { number: comment, icon: 'eva:message-circle-fill' },
  //   { number: view, icon: 'eva:eye-fill' },
  //   { number: share, icon: 'eva:share-fill' },
  // ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slider.map((result, i) => {
              return (
                <TableRow
                  sx={{
                    '&:last-child td, &:lastchild th': { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{result.name}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleOpen(result.image)}>
                      <VisibilityIcon />
                    </Button>
                  </TableCell>
                  <TableCell align="left">{result.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box sx={boxStyle} noValidate autoComplete="off">
          {imageSlider ? (
            <img
              src={`https://dev.homefund-id.tech/dashboard-api/static/slider/${imageSlider}`}
              alt="Static API Image"
            />
          ) : (
            <p>Loading Image ...</p>
          )}
        </Box>
      </Modal>
    </>
  );
}
