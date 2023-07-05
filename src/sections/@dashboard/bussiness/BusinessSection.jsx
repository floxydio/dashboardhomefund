import React from "react";
import { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosNew from "../../../components/AxiosConfig";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export default function BusinessSection() {

    const [dataProspectus, setDataProspectus] = useState([])
    const [view, setView] = useState(false);

    const docs = [
        { uri: "https://dev.homefund-id.tech/dashboard-api/static/prospektus/prospektus_f065c174-311f-44db-822f-8d10fce0c615_PTIOTECH.pdf" }
    ];

    
    const handleView = () => {
        setView(!view);
    };

    useEffect(() => {
        async function getDataProspectus() {
            await axiosNew.get('/prospektus').then((result) => {
                setDataProspectus(result.data.data);
                console.log(result.data.data)
            })
        }
        getDataProspectus()
    }, [])

    return <>

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
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left"><button type="application/pdf" onClick={handleView}>View</button>
                                {view && (
                                    <DocViewer
                                    pluginRenderers={DocViewerRenderers}
                                    documents={docs}
                                    style={{width: 300, height: 300}}
                                    config={{
                                        header: {
                                          disableHeader: false,
                                          disableFileName: false,
                                          retainURLParams: false
                                        }
                                      }}
                                  />
                                )}</TableCell>
                            <TableCell align="left">{row.deskripsi}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
    
}