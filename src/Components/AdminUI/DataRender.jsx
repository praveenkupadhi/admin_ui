import { useDispatch, useSelector } from 'react-redux';
import { IconContext } from 'react-icons';
import { Delete, Edit } from './Icons';
import {
  deleteCheckedDataRequest,
  deleteCheckedDataSuccess,
  deleteDataRequest,
  deleteDataSuccess,
  searchDataRequest,
  searchDataSuccess
} from '../Redux/actions';
import { NavLink } from 'react-router-dom';
import { Fragment, useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';

export const DataRender = () => {
  const data = useSelector((store) => store.data);
  const dispatch = useDispatch();
  const editIcon = useMemo(() => ({ className: 'editIcon' }), []);
  const deleteIcon = useMemo(() => ({ className: 'deleteIcon' }), []);
  const [filterData, setFilterData] = useState([...data]);
  const [checkedData, setCheckedData] = useState([]);
  const [indexOfFirstData, setIndexOfFirstData] = useState(0);
  const [indexOfLastData, setIndexOfLastData] = useState(10);
  const totalPages = Math.ceil(filterData.length / 10);

  useEffect(() => {
    setFilterData(data);
  }, [data]);

  const deleteSingleData = (id) => {
    const filterData = data.filter((d) => d.id !== id);
    dispatch(deleteDataRequest());
    dispatch(deleteDataSuccess(filterData));
    swal('Data', 'Deleted Successfully', 'success');
  };

  const handleChange = (e) => {
    dispatch(searchDataRequest());
    setFilterData(
      data.filter(
        (d) =>
          d.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          d.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
          d.role.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    dispatch(searchDataSuccess());
  };

  const handleCheckedData = (e) => {
    if (e.target.checked === true) {
      setCheckedData([...checkedData, e.target.id]);
    } else {
      setCheckedData(checkedData.filter((cd) => cd !== e.target.id));
    }
  };

  const deleteCheckedData = () => {
    dispatch(deleteCheckedDataRequest());
    dispatch(deleteCheckedDataSuccess(checkedData));
    if (checkedData.length !== 0)
      swal('Data', 'Deleted Successfully', 'success');
  };

  // page handle
  const handlePageClick = (data) => {
    setIndexOfFirstData(data.selected * 10);
    setIndexOfLastData((data.selected + 1) * 10);
  };

  // check all delete
  const checkAllAndDelete = () => {
    const checkBoxes = document.querySelectorAll("input[type='checkbox']");
    if (checkBoxes[0].checked === true) {
      let temp = [];
      checkBoxes.forEach((checkBox) => {
        checkBox.checked = true;
        if (checkBox.id !== 0) {
          temp.push(checkBox.id);
        }
        setCheckedData([...checkedData, ...temp]);
      });
      dispatch(deleteCheckedDataRequest());
      dispatch(deleteCheckedDataSuccess(checkedData));
    } else if (checkBoxes[0].checked === false) {
      checkBoxes.forEach((checkBox) => {
        checkBox.checked = false;
        setCheckedData([]);
      });
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search by name, email or role"
        onChange={handleChange}
        id="search"
      />
      {filterData.length === 0 ? (
        <h3 className="d-flex justify-content-center">No data found.</h3>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onChange={checkAllAndDelete} />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterData.map((e, i) => {
                return i >= indexOfFirstData && i < indexOfLastData ? (
                  <Fragment key={e.id}>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          id={e.id}
                          onClick={handleCheckedData}
                        />
                      </td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td className="text-capitalize">{e.role}</td>
                      <td>
                        <div className="buttons-align">
                          <div>
                            <NavLink to={`edit/${e.id}`}>
                              <IconContext.Provider value={editIcon}>
                                <Edit />
                              </IconContext.Provider>
                            </NavLink>
                          </div>
                          <div onClick={() => deleteSingleData(e.id)}>
                            <IconContext.Provider value={deleteIcon}>
                              <Delete />
                            </IconContext.Provider>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                ) : (
                  <Fragment key={crypto.randomUUID()}></Fragment>
                );
              })}
            </tbody>
          </table>
          <button onClick={deleteCheckedData} id="deleteChecked">
            Delete Selected
          </button>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={totalPages}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            onPageChange={handlePageClick}
          />
        </>
      )}
    </div>
  );
};
