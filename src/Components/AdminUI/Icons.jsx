import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { Component } from 'react';

class Edit extends Component {
  render() {
    return <FiEdit />;
  }
}

class Delete extends Component {
  render() {
    return <MdDeleteOutline />;
  }
}

export { Edit, Delete };
