import { Route, Routes } from "react-router";
import { AdminHome } from "../AdminUI/AdminHome";
import { DeleteData } from "../AdminUI/DeleteData";
import { EditData } from "../AdminUI/EditData";

export const RouteMain = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<AdminHome />} />
				<Route path="edit/:id" element={<EditData />} />
				<Route path="delete/:id" element={<DeleteData />} />
				<Route path="*" element={<h3>404 Not Found</h3>} />
			</Routes>
		</>
	);
};
