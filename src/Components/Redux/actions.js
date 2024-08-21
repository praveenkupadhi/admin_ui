import {
  DELETE_CHECKED_DATA_FAILURE,
  DELETE_CHECKED_DATA_REQUEST,
  DELETE_CHECKED_DATA_SUCCESS,
  DELETE_DATA_FAILURE,
  DELETE_DATA_REQUEST,
  DELETE_DATA_SUCCESS,
  EDIT_MEMBER_FAILURE,
  EDIT_MEMBER_REQUEST,
  EDIT_MEMBER_SUCCESS,
  FETCH_DATA_FAILURE,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  SEARCH_DATA_FAILURE,
  SEARCH_DATA_REQUEST,
  SEARCH_DATA_SUCCESS
} from './actionTypes';

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST
});

export const fetchDataSuccess = (payload) => ({
  type: FETCH_DATA_SUCCESS,
  payload
});

export const fetchDataFailure = (message) => ({
  type: FETCH_DATA_FAILURE,
  message
});

export const searchDataRequest = () => ({
  type: SEARCH_DATA_REQUEST
});

export const searchDataSuccess = () => ({
  type: SEARCH_DATA_SUCCESS
});

export const searchDataFailure = (message) => ({
  type: SEARCH_DATA_FAILURE,
  message
});

export const editMemberRequest = () => ({
  type: EDIT_MEMBER_REQUEST
});

export const editMemberSuccess = (payload) => ({
  type: EDIT_MEMBER_SUCCESS,
  payload
});

export const editMemberFailure = (message) => ({
  type: EDIT_MEMBER_FAILURE,
  message
});

export const deleteDataRequest = () => ({
  type: DELETE_DATA_REQUEST
});

export const deleteDataSuccess = (payload) => ({
  type: DELETE_DATA_SUCCESS,
  payload
});

export const deleteDataFailure = (message) => ({
  type: DELETE_DATA_FAILURE,
  message
});

export const deleteCheckedDataRequest = () => ({
  type: DELETE_CHECKED_DATA_REQUEST
});

export const deleteCheckedDataSuccess = (payload) => ({
  type: DELETE_CHECKED_DATA_SUCCESS,
  payload
});

export const deleteCheckedDataFailure = (message) => ({
  type: DELETE_CHECKED_DATA_FAILURE,
  message
});
