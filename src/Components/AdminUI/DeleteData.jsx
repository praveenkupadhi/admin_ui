import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { deleteDataRequest, deleteDataSuccess } from '../Redux/actions';
import swal from 'sweetalert';

export const DeleteData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = useSelector((store) => store.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const filterData = data.filter((d) => d.id !== id);

    dispatch(deleteDataRequest());
    dispatch(deleteDataSuccess(filterData));

    navigate('/');
    swal('Data', 'Deleted Successfully', 'success');
  });
};
