import { Route, Routes } from 'react-router';
import { AdminHome } from './Components/AdminUI/AdminHome';
import { EditMember } from './Components/AdminUI/EditMember';

const routeDetails = Object.freeze([
  {
    path: '/',
    element: <AdminHome />
  },
  {
    path: 'edit/:id',
    element: <EditMember />
  },
  { path: '*', element: <h3>404 Not Found.</h3> }
]);

function Router() {
  return (
    <Routes>
      {routeDetails.map((routeDetail) => (
        <Route
          key={routeDetail.path}
          path={routeDetail.path}
          element={routeDetail.element}
        ></Route>
      ))}
    </Routes>
  );
}

export default Router;
