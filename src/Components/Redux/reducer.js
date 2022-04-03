import {
	DELETE_DATA_FAILURE,
	DELETE_DATA_REQUEST,
	DELETE_DATA_SUCCESS,
	EDIT_DATA_FAILURE,
	EDIT_DATA_REQUEST,
	EDIT_DATA_SUCCESS,
	FETCH_DATA_FAILURE,
	FETCH_DATA_REQUEST,
	FETCH_DATA_SUCCESS,
	SEARCH_DATA_FAILURE,
	SEARCH_DATA_REQUEST,
	SEARCH_DATA_SUCCESS,
} from "./actionTypes";

const initState = {
	data: [],
	loading: true,
	error: "No error",
};

export const reducer = (store = initState, { type, payload }) => {
	switch (type) {
		case FETCH_DATA_REQUEST:
			return { ...store, loading: true };
		case FETCH_DATA_SUCCESS:
			return { ...store, data: payload, loading: false };
		case FETCH_DATA_FAILURE:
			return { ...store, error: payload, loading: false };
		case SEARCH_DATA_REQUEST:
			return { ...store, loading: true };
		case SEARCH_DATA_SUCCESS:
			return { ...store, loading: false };
		case SEARCH_DATA_FAILURE:
			return { ...store, error: payload, loading: false };
		case EDIT_DATA_REQUEST:
			return { ...store, loading: true };
		case EDIT_DATA_SUCCESS:
			return { ...store, data: payload, loading: false };
		case EDIT_DATA_FAILURE:
			return { ...store, error: payload, loading: false };
		case DELETE_DATA_REQUEST:
			return { ...store, loading: true };
		case DELETE_DATA_SUCCESS:
			return { ...store, data: payload, loading: false };
		case DELETE_DATA_FAILURE:
			return { ...store, error: payload, loading: false };
		default:
			return store;
	}
};
