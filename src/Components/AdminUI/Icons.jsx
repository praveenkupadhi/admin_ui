import { FiEdit } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md';
import { Component } from 'react';

export class Edit extends Component {
  render() {
    return <FiEdit />;
  }
}

export class Delete extends Component {
  render() {
    return <MdDeleteOutline />;
  }
}
