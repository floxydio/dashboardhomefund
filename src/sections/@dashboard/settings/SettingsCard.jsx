import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';
import axiosNew from '../../../components/AxiosConfig';
import { useMediaQuery } from 'react-responsive';
import { DataGrid } from '@mui/x-data-grid';

export default function SettingCard() {
  const [dataSetting, setDataSetting] = useState([]);

  const token = localStorage.getItem('token');

  const isMobile = useMediaQuery({ query: ' (min-width: 700px) ' });
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });

  async function getSetting() {
    setDataSetting([]);

    const decrypt = CryptoJS.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);
    await axiosNew
      .get('/setting', {
        headers: {
          Authorization: decrypt.toString(CryptoJS.enc.Utf8),
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setDataSetting(result.data.data);
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
    getSetting();
  }, []);

  const columns = [
    { field: 'fee', headerName: 'Maintenance Status', width: 180, editable: true },
    { field: 'maintenance_note', headerName: 'Maintenance Note', width: 180, editable: true },
    { field: 'maintenance_status', headerName: 'Maintenance Status', width: 180, editable: true },
    { field: 'product_setting', headerName: 'Product Setting', width: 180, editable: true },
    { field: 'saldo_setting', headerName: 'Saldo Setting', width: 180, editable: true },
    { field: 'slider_setting', headerName: 'Slider Setting', width: 180, editable: true },
    { field: 'url_certificate', headerName: 'Url Certification', width: 180, editable: true },
    { field: 'url_introduction', headerName: 'Url Introduction', width: 180, editable: true },
    { field: 'url_product', headerName: 'Url Product', width: 180, editable: true },
    { field: 'url_profile', headerName: 'Url Profile', width: 180, editable: true },
    { field: 'url_slider', headerName: 'Url Slider', width: 180, editable: true },
    { field: 'version_app', headerName: 'Version App', width: 180, editable: true },
    { field: 'wallet_setting', headerName: 'Wallet Setting', width: 180, editable: true },
  ];

  const rows = [
    {
      id: 1,
      fee: dataSetting.fee,
      maintenance_note: dataSetting.maintenance_note,
      maintenance_status: dataSetting.maintenance_status,
      product_setting: dataSetting.product_setting,
      saldo_setting: dataSetting.saldo_setting,
      slider_setting: dataSetting.slider_setting,
      url_certificate: dataSetting.url_certificate,
      url_introduction: dataSetting.url_introduction,
      url_product: dataSetting.url_product,
      url_profile: dataSetting.url_profile,
      url_slider: dataSetting.url_slider,
      version_app: dataSetting.version_app,
      wallet_setting: dataSetting.wallet_setting,
    },
  ];

  return (
    <>
      {/* <TableContainer component={Paper} style={{ marginLeft: isMobile ? 20 : 0, marginRight: isMobile ? 20 : 0 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Maintenance Status</TableCell>
              <TableCell>Maintenance Note</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Version App</TableCell>
              <TableCell>Product Setting</TableCell>
              <TableCell>Saldo Setting</TableCell>
              <TableCell>Slider Setting</TableCell>
              <TableCell>Wallet Setting</TableCell>
              <TableCell>Url Certificate</TableCell>
              <TableCell>Url Introduction</TableCell>
              <TableCell>Url Product</TableCell>
              <TableCell>Url Profile</TableCell>
              <TableCell>Url Slider</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:lastchild th': { border: 0 } }}>
              <TableCell align="left">{dataSetting.maintenance_status}</TableCell>
              <TableCell align="left">{dataSetting.maintenance_note}</TableCell>
              <TableCell align="left">{dataSetting.fee}</TableCell>
              <TableCell align="left">{dataSetting.version_app}</TableCell>
              <TableCell align="left">{dataSetting.product_setting}</TableCell>
              <TableCell align="left">{dataSetting.saldo_setting}</TableCell>
              <TableCell align="left">{dataSetting.slider_setting}</TableCell>
              <TableCell align="left">{dataSetting.wallet_setting}</TableCell>
              <TableCell align="left">{dataSetting.url_certificate}</TableCell>
              <TableCell align="left">{dataSetting.url_introduction}</TableCell>
              <TableCell align="left">{dataSetting.url_product}</TableCell>
              <TableCell align="left">{dataSetting.url_profile}</TableCell>
              <TableCell align="left">{dataSetting.url_slider}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> */}
      <DataGrid editMode="row" rows={rows} columns={columns} autoHeight row pagination={false} rowsPe />
    </>
  );
}
