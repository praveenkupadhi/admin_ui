import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { editDataRequest, editDataSuccess } from '../Redux/actions';
import swal from 'sweetalert';

export const EditData = () => {
  const { id } = useParams();
  const data = useSelector((store) => store.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = data.filter((d) => d.id === id);
  const [name, setName] = useState(fetchData[0]?.name);
  const [email, setEmail] = useState(fetchData[0]?.email);
  const [role, setRole] = useState(fetchData[0]?.role);
  const isDataChanged =
    fetchData[0]?.name === name &&
    fetchData[0]?.email === email &&
    fetchData[0]?.role === role;

  const nameChange = (e) => {
    setName(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
  };
  const roleChange = (e) => {
    setRole(e.target.value);
  };

  const edit = () => {
    let temp = [...data];
    for (let i = 0; i < data.length; i++) {
      if (temp[i].id === fetchData[0].id) {
        temp[i].name = name === '' ? temp[i].name : name;
        temp[i].email = email === '' ? temp[i].email : email;
        temp[i].role = role === '' ? temp[i].role : role;
        break;
      }
    }
    dispatch(editDataRequest());
    dispatch(editDataSuccess(temp));
    navigate('/');
    swal('Data', 'Edited Successfully', 'success');
  };

  useEffect(() => {
    if (fetchData.length === 0) navigate('/');
  });

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {fetchData.map((e) => {
            return (
              <tr key={e.id}>
                <td>
                  <input
                    type="text"
                    defaultValue={e.name}
                    onChange={nameChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={e.email}
                    onChange={emailChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={e.role}
                    onChange={roleChange}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="buttons-align">
        <button
          disabled={isDataChanged}
          className={isDataChanged ? 'cursor-notallow' : ''}
          onClick={edit}
          id="editBtn"
        >
          Edit
        </button>
        <button onClick={() => navigate('/')} id="cancelBtn">
          Cancel
        </button>
      </div>
    </div>
  );
};
