import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Typography } from '@mui/material';

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  return (
    <>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and Drop an Image Here, or Click to Select an Image</p>
          </div>
        )}
      </Dropzone>
      {selectedFile && (
        <>
          <Typography variant="h3">Selected Image Preview</Typography>
          <img
            src={`http://103.250.11.249:3000/dashboard-api/static/product/${selectedFile}`}
            alt="Selected"
            style={{ width: '200 px' }}
          />
        </>
      )}
    </>
  );
}
