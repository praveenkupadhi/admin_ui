import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Members } from './Members';
import {
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess
} from '../Redux/actions';

const membersUrl =
  'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

export const AdminHome = () => {
  const data = useSelector((store) => store.data);
  const loading = useSelector((store) => store.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(fetchDataRequest());
        const response = await axios.get(membersUrl);
        dispatch(fetchDataSuccess(response.data));
      } catch (error) {
        dispatch(fetchDataFailure(error));
        console.error('@@@ Unable fetch members data @@@', error);
      }
    })();
  }, [dispatch]);

  return loading ? <h2>Loading...</h2> : <Members />;
};
