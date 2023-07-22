// import { useState } from 'react';
// import Dropzone from 'react-dropzone';
// import { Box, Typography } from '@mui/material';

// export default function ImageUpload({ links }) {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleDrop = (acceptedFiles) => {
//     setSelectedFile(acceptedFiles[0]);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           border: '1px solid #ccc',
//           borderRadius: '8px',
//           padding: '16px',
//           backgroundColor: '#fff',
//           boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <Dropzone onDrop={handleDrop}>
//           {({ getRootProps, getInputProps }) => (
//             <div className="dropzone" {...getRootProps()}>
//               <input {...getInputProps()} />
//               <p>Drag and Drop an Image Here, or Click to Select an Image</p>
//             </div>
//           )}
//         </Dropzone>
//         {selectedFile && (
//           <>
//             <Typography variant="h3">Selected Image Preview</Typography>
//             <img
//               src={`https://homefund-beta.xyz//dashboard-api/static/${links}/${selectedFile}`}
//               alt="Selected"
//               style={{ width: '200 px' }}
//             />
//           </>
//         )}
//       </Box>
//     </>
//   );
// }
