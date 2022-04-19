import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchDataFailure,
	fetchDataRequest,
	fetchDataSuccess,
} from "../Redux/actions";
import { DataRender } from "./DataRender";

export const AdminHome = () => {
	const data = useSelector((store) => store.data);
	const loading = useSelector((store) => store.loading);
	const dispatch = useDispatch();

	// console.log(data);

	useEffect(() => {
		dispatch(fetchDataRequest());
		if (data.length === 0) {
			axios
				.get(
					"https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
				)
				.then((res) => {
					dispatch(fetchDataSuccess(res.data));
				})
				.catch((error) => {
					dispatch(fetchDataFailure(error));
				});
		} else {
			dispatch(fetchDataSuccess(data));
		}
	}, [dispatch]);

	return loading ? <h2>Loading...</h2> : <DataRender />;
};
