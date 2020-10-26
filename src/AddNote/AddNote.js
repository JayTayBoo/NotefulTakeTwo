import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import './Note.css';

export default class AddNote extends React.Component {
  static contextType = ApiContext;
  state = {
    name: { noteName: '', touched: false },
    desc: { noteDesc: '', touched: false },
    folderId: { id: '' },
    nameError: '',
    descError: '',
    folderIdError: '',
  };

  handleAddName = (name) => {
    this.setState({ name: { noteName: name, touched: true } });
  };

  handleAddName = (desc) => {
    this.setState({ desc: { noteDesc: desc, touched: true } });
  };

  handleAddName = (folderId) => {
    this.setState({ folderId: { id: folderId } });
  };

  handleAddNote = (event) => {
    event.preventDefault();
    const name = this.state.name.noteName;
    const desc = this.state.desc.noteDesc;
    const folderId = this.state.folderId.id;

    // basic validation for name, desc, and folderId befor submitting
    if (!name || name.length < 3) {
      return this.setState({
        nameError: 'Please enter a name longer than 3 characters!',
      });
    }
    if (!desc || desc.length > 500) {
      return this.setState({
        descError: 'Please add a note that is less than 500 characters!',
      });
    }
    if (!folderId) {
      return this.setState({
        folderIdError: 'Please pick a folder to hold your notes!',
      });
    }

    // turning data into JSON for API Fetch
    const note = JSON.stringify({ name: name, desc: desc, folderId: folderId });

    // api fetch to post new note
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: note,
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((data) => {
        this.context.addNote(data);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {}
}
