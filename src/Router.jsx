import { Route, Routes } from 'react-router';
import { AdminHome } from './Components/AdminUI/AdminHome';
import { EditData } from './Components/AdminUI/EditData';

const routeDetails = [
  {
    path: '/',
    element: <AdminHome />
  },
  {
    path: 'edit/:id',
    element: <EditData />
  },
  { path: '*', element: <h3>404 Not Found.</h3> }
];

const Router = () => {
  return (
    <>
      <Routes>
        {routeDetails.map((routeDetail) => (
          <Route
            key={routeDetail.path}
            path={routeDetail.path}
            element={routeDetail.element}
          ></Route>
        ))}
      </Routes>
    </>
  );
};

export default Router;
