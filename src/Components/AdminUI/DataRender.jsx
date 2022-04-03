import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { Delete, Edit } from "./Icons";
import { searchDataRequest, searchDataSuccess } from "../Redux/actions";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Pagination } from "@mui/material";

export const DataRender = () => {
	const data = useSelector((store) => store.data);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [filterData, setFilterData] = useState([...data]);
	const [checkedData, setCheckedData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [indexOfFirstData, setIndexOfFirstData] = useState(0);
	const [indexOfLastData, setIndexOfLastData] = useState(9);
	const totalPages = Math.ceil(filterData.length / 10);

	const handleChange = (e) => {
		dispatch(searchDataRequest());
		setFilterData(
			data.filter(
				(d) =>
					d.name.startsWith(e.target.value) ||
					d.email.startsWith(e.target.value) ||
					d.role.startsWith(e.target.value)
			)
		);
		dispatch(searchDataSuccess());
	};

	const handleCheckedData = (e) => {
		if (e.target.checked === true)
			setCheckedData([...checkedData, e.target.id]);
	};

	const deleteCheckedData = () => {};

	return (
		<div className="container">
			<input
				type="text"
				placeholder="Search by name, email or role"
				onChange={handleChange}
				id="search"
			/>
			<table>
				<thead>
					<tr>
						<th>
							<input type="checkbox" />
						</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filterData.length === 0 ? (
						<tr>
							<td>No data found</td>
						</tr>
					) : (
						filterData.map((e) => {
							return (
								<tr key={e.id}>
									<td>
										<input
											type="checkbox"
											id={e.id}
											onClick={handleCheckedData}
										/>
									</td>
									<td>{e.name}</td>
									<td>{e.email}</td>
									<td>{e.role}</td>
									<td>
										<div>
											<NavLink to={`edit/${e.id}`}>
												<IconContext.Provider value={{ className: "editIcon" }}>
													<Edit />
												</IconContext.Provider>
											</NavLink>
										</div>
										<div>
											<NavLink to={`delete/${e.id}`}>
												<IconContext.Provider
													value={{ className: "deleteIcon" }}
												>
													<Delete />
												</IconContext.Provider>
											</NavLink>
										</div>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
			<button onClick={deleteCheckedData} id="deleteChecked">
				Delete Selected
			</button>
			{/* <Pagination count={10} showFirstButton showLastButton /> */}
		</div>
	);
};
