import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { Delete, Edit } from "./Icons";
import {
	deleteCheckedDataRequest,
	deleteCheckedDataSuccess,
	fetchDataRequest,
	fetchDataSuccess,
	searchDataRequest,
	searchDataSuccess,
} from "../Redux/actions";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router";

export const DataRender = () => {
	const data = useSelector((store) => store.data);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [filterData, setFilterData] = useState([...data]);
	const [checkedData, setCheckedData] = useState([]);
	const [indexOfFirstData, setIndexOfFirstData] = useState(0);
	const [indexOfLastData, setIndexOfLastData] = useState(10);
	const totalPages = Math.ceil(filterData.length / 10);

	useEffect(() => {
		setFilterData(data);
	}, [data]);

	// console.log(indexOfFirstData, indexOfLastData);

	const handleChange = (e) => {
		console.log(e.target.value);
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
		if (e.target.checked === true) {
			setCheckedData([...checkedData, e.target.id]);
		} else {
			setCheckedData(checkedData.filter((cd) => cd !== e.target.id));
		}
	};

	const deleteCheckedData = () => {
		dispatch(deleteCheckedDataRequest());
		dispatch(deleteCheckedDataSuccess(checkedData));
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
				if (checkBox.id != 0) {
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
					{filterData.length === 0 ? (
						<tr>
							<td>No data found</td>
						</tr>
					) : (
						filterData.map((e, i) => {
							if (i >= indexOfFirstData && i < indexOfLastData)
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
													<IconContext.Provider
														value={{ className: "editIcon" }}
													>
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
			<ReactPaginate
				previousLabel={"previous"}
				nextLabel={"next"}
				pageCount={totalPages}
				containerClassName={"pagination justify-content-center"}
				pageClassName={"page-item"}
				pageLinkClassName={"page-link"}
				previousClassName={"page-item"}
				previousLinkClassName={"page-link"}
				nextClassName={"page-item"}
				nextLinkClassName={"page-link"}
				breakClassName={"page-item"}
				breakLinkClassName={"page-link"}
				activeClassName={"active"}
				onPageChange={handlePageClick}
			/>
		</div>
	);
};
