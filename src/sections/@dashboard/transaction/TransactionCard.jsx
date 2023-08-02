import { useEffect, useState } from 'react';
import axiosNew from '../../../components/AxiosConfig';
import cryptoJs from 'crypto-js';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';

export default function TransactionCard() {
  const [transactionData, setTransactionData] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    async function getTransactionData() {
      const decrypt = cryptoJs.AES.decrypt(token, `${import.meta.env.VITE_KEY_ENCRYPT}`);

      await axiosNew
        .get('/transactionhistory', {
          headers: {
            // Authorization: decrypt.toString(cryptoJs.enc.Utf8),
          },
        })
        .then((res) => {
          setTransactionData(res.data.data);
        });
    }
    getTransactionData();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Total Lot</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Date Buy</TableCell>
              <TableCell>Time Buy</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Transaction Pay</TableCell>
              <TableCell>Status Transaction</TableCell>
              <TableCell>Name Virtual Account</TableCell>
              <TableCell>Icon Virtual Account</TableCell>
              <TableCell>Home Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionData.map((result, i) => {
              return (
                <TableRow sx={{ '&:last-child td, &:lastchild th': { border: 0 } }} key={result.id}>
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left">{result.trx_id}</TableCell>
                  <TableCell align="left">{result.total_lot.toLocaleString()}</TableCell>
                  <TableCell align="left">{result.total_amount.toLocaleString()}</TableCell>
                  <TableCell align="left">{moment(result.date_buy).utc().format('MMMM do YYYY, h:mm:ss a')}</TableCell>
                  <TableCell align="left">{moment(result.time_buy).utc().format()}</TableCell>
                  <TableCell align="left">{result.deposit_withdraw}</TableCell>
                  <TableCell align="left">{result.type_pay}</TableCell>
                  <TableCell align="left">{result.status_paid}</TableCell>
                  <TableCell align="left">{result.name_virtualaccount}</TableCell>
                  <TableCell align="left">{result.icon_virtualaccount}</TableCell>
                  <TableCell align="left">{result.home_title}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
