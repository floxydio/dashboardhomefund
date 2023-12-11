import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

import { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';
import axiosNew from "../../../components/AxiosConfig";
import { useMediaQuery } from 'react-responsive'

export default function SettingCard() {
  const [dataSetting, setDataSetting] = useState([])

  const token = localStorage.getItem('token')


  const isMobile = useMediaQuery({ query: ' (min-witd: 700px) ' })

  async function getSetting() {
    setDataSetting([])

    const decrypt = CryptoJS.AES.decrypt(
      token, `${import.meta.env.VITE_KEY_ENCRYPT}`
    )
    await axiosNew.get('/setting', {
      headers: {
        Authorization: decrypt.toString(
          CryptoJS.enc.Utf8
        )
      }
    })
      .then((result) => {
        if (result.status === 200) {
          setDataSetting(result.data.data)
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem('token')
          window.location.href = '/login'
        } else {
          alert(err.response.data.message)
        }
      })
  }

  useEffect(() => {
    getSetting()
  }, [])

  return (
    <>
      <TableContainer component={Paper} style={{ marginLeft: isMobile ? 20 : 0, marginRight: isMobile ? 20 : 0 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Maintenace Status</TableCell>
              <TableCell>Maintenance  Note</TableCell>
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
            {dataSetting?.map((result, i) => {
              return (
                <TableRow sx={{ '&:last-child td, &:lastchild th': { border: 0 } }} key={result.id}>
                  <TableCell component='th' scope='row'>
                    <TableCell align='left'>{i + 1}</TableCell>
                    <TableCell align='left'>{result.maintenance_status}</TableCell>
                    <TableCell align='left'>{result.maintenance_note}</TableCell>
                    <TableCell align='left'>{result.fee}</TableCell>
                    <TableCell align='left'>{result.version_app}</TableCell>
                    <TableCell align='left'>{result.PRODUCT_SETTING}</TableCell>
                    <TableCell align='left'>{result.SALDO_SETTING}</TableCell>
                    <TableCell align='left'>{result.SLIDER_SETTING}</TableCell>
                    <TableCell align='left'>{result.WALLET_SETTING}</TableCell>
                    <TableCell align='left'>{result.url_certificate}</TableCell>
                    <TableCell align='left'>{result.url_introduction}</TableCell>
                    <TableCell align='left'>{result.url_product}</TableCell>
                    <TableCell align='left'>{result.url_profile}</TableCell>
                    <TableCell align='left'>{result.url_slider}</TableCell>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
