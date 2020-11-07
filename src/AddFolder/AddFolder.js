import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import ValidationError from '../ValidationError/ValidationError';

export default class AddFolder extends React.Component {
  static contextType = ApiContext;
  state = {
    folderName: { value: '', touched: false },
    noErrors: true,
    nameError: '',
  };

  // handlers to update state
  updateName = (folderName) => {
    this.setState({ folderName: { value: folderName, touched: true } });
  };

  handleAddFolder = (event) => {
    event.preventDefault();
    const folderName = this.state.folderName.value;

    // basic validation for folderName before submitting
    if (!folderName || folderName.length < 3) {
      return this.setState({
        noError: false,
        nameError: 'Please enter in a folder name that is 3 or more characters',
      });
    }

    // turning data into JSON for API Fetch
    const folder = JSON.stringify({ name: folderName });
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: folder,
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      // addFolder is in ApiContext
      .then((data) => {
        this.context.addFolder(data);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    let errorMessage = '';
    const noError = this.state.noError;
    if (noError !== true) {
      errorMessage = this.state.nameError;
    }

    return (
      <form
        className='addFolder'
        onSubmit={(e) => {
          this.handleAddFolder(e);
        }}
      >
        <h2>Add Folder</h2>
        <div className='folderName'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='creation__control'
            name='name'
            id='name'
            onChange={(event) => this.updateName(event.target.value)}
          />
          <ValidationError message={errorMessage} />
        </div>
        <div className='submit-button'>
          <input
            type='submit'
            className='submit-button'
            name='submit'
            value='Add Folder'
            id='submit'
          />
        </div>
      </form>
    );
  }
}
