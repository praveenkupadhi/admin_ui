import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import React from "react";

export class Edit extends React.Component {
	render() {
		return <FiEdit />;
	}
}

export class Delete extends React.Component {
	render() {
		return <MdDeleteOutline />;
	}
}
