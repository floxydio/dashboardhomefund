import { useState, useEffect } from 'react';
import axiosNew from '../../../components/AxiosConfig';

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

const textFieldStyle = {
  marginBottom: 10,
  marginTop: 10,
};
export default function ProductNewPost() {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [statusInvesment, setStatusInvesment] = useState(0);
  const [totalInvesment, setTotalInvesment] = useState(0);
  const [completeInvesment, setCompleteInvesment] = useState(0);
  const [minimumInvesment, setMinimumInvesment] = useState(0);
  const [totalLot, setTotalLot] = useState(0);
  const [totalInvestor, setTotalInvestor] = useState(0);
  const [remainingDays, setRemainingDays] = useState(new Date());
  const [businessId, setBusinessId] = useState(0);
  const [productImage, setProductImage] = useState('');
  const [statusCampaign, setStatusCampaign] = useState(0);
  const [longtitude, setLongtitude] = useState('');
  const [langtitude, setLangtitude] = useState('');
  const [tenor, setTenor] = useState(0);
  const [percentageImbal, setPercentageImbal] = useState(0.0);
  const [detail, setDetail] = useState('');
  const [productDetailId, setProductDetailId] = useState(0);
  const [createdAt, setCreatedAt] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [viewProduct, setViewProduct] = useState(0);
}
