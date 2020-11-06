import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import Dropdown from '../Dropdown/Dropdown';
import ValidationError from '../ValidationError/ValidationError';

export default class AddNote extends React.Component {
  state = {
    name: { noteName: '', touched: false },
    desc: { noteDesc: '', touched: false },
    folderId: { id: '' },
    noError: true,
    nameError: '',
    descError: '',
    folderIdError: '',
  };

  static contextType = ApiContext;

  // handlers to update state
  updateName = (name) => {
    this.setState({ name: { noteName: name, touched: true } });
  };

  updateDesc = (desc) => {
    this.setState({ desc: { noteDesc: desc, touched: true } });
  };

  updateFolderId = (folderId) => {
    this.setState({ folderId: { id: folderId } });
  };

  handleAddNote = (event) => {
    event.preventDefault();
    const name = this.state.name.noteName;
    const desc = this.state.desc.noteDesc;
    const folderId = this.state.folderId.id;
    let date = new Date();

    // turning data into JSON for API Fetch
    const note = JSON.stringify({
      name: name,
      desc: desc,
      folderId: folderId,
      modified: date,
    });

    console.log(note);

    // basic validation for name, desc, and folderId befor submitting
    if (!name || name.length < 3) {
      return this.setState({
        noError: false,
        nameError: 'Please enter a name that is 3 or more characters!',
      });
    }
    if (!desc || desc.length > 500) {
      return this.setState({
        noError: false,
        descError: 'Please add a note that is less than 500 characters!',
      });
    }
    if (!folderId) {
      return this.setState({
        noError: false,
        folderIdError: 'Please pick a folder to hold your notes!',
      });
    }

    // api fetch to post new note
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: note,
    })
      .then((res) => {
        if (!res.ok) return res.json().then(() => Promise.reject());
        return res.json();
      })
      // addNote is in ApiContext
      .then((data) => {
        this.context.addNote(data);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    let errorMessage = '';
    const noError = this.state.noError;
    if (noError !== true) {
      if (this.state.nameError !== '') {
        errorMessage += this.state.nameError;
      }
      if (this.state.descError !== '') {
        errorMessage += this.state.descError;
      }
      if (this.state.folderIdError !== '') {
        errorMessage += this.state.folderIdError;
      }
    }

    return (
      <form
        className='addNote'
        onSubmit={(event) => {
          console.log(' Note Submitted!');
          this.handleAddNote(event);
        }}
      >
        <h2>Add Note</h2>
        <div className='noteName'>
          <label htmlFor='name'> Name </label>
          <input
            type='text'
            className='createNote'
            name='name'
            id='name'
            onChange={(event) => this.updateName(event.target.value)}
          />
        </div>
        <div className='notedesc'>
          <label htmlFor='desc'> Enter your note here</label>
          <input
            type='text area'
            className='createNote'
            name='desc'
            id='desc'
            onChange={(event) => this.updateDesc(event.target.value)}
          />
        </div>
        <div className='folderId'>
          <Dropdown updateFolderId={this.updateFolderId} />
        </div>
        <div>
          <ValidationError message={errorMessage} />
        </div>
        <div className='submit-form'>
          <input type='submit' id='js-submit-note' value='Add Note' />
        </div>
      </form>
    );
  }
}
