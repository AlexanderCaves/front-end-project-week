import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

import EditView from './components/EditView';
import DeleteModal from './components/DeleteModal';
import CreateNewView from './components/CreateNewView';
import NoteView from './components/NoteView';
import ListView from './components/ListView';
import SideBar from './components/SideBar';
import './App.css';
import './components/SideBar.css';
import './components/NoteView.css';
import './components/ListView.css';
import './components/DeleteModal.css';
import './components/CreateEditView.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    axios.get('https://killer-notes.herokuapp.com/note/get/all')
      .then(response => {
        console.log(response);
        this.setState({ notes: response.data });
      })
  }

  setNotesData = data => this.setState({ notes: data });

  addNewNote = event => {
    event.preventDefault();
    const { title, textBody } = this.state;
    const newNote = { title, textBody };

    axios.post(`https://killer-notes.herokuapp.com/note/create`, newNote)
      .then(response => {
        this.setNotesData(response.data);
      })

    this.setState({
      title: '',
      textBody: '',
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteNote = event => {
    axios.delete('https://killer-notes.herokuapp.com/note/delete/id')
      .then(response => {
        this.setNotesData(response.data)
      })
      .catch(err => console.log(err));
  }

  editNote = event => {
    axios.put('https://killer-notes.herokuapp.com/note/edit/id')
      .then(response => {
        this.setNotesData(response.data)
      })
    this.setState({
      title: '',
      textBody: '',
    });
  }

  render() {
    return (
      <div className="App">
        <SideBar />
        <Route
          exact path='/'
          render={props => (
            <ListView 
              {...props} 
              notes={this.state.notes}
            />
          )}
        />
        <Route
          path='/notes/:_id'
          render={props => (
            <NoteView
              {...props}
              notes={this.state.notes}
            />
          )}
        />
        <Route
          path='/create'
          render={props => (
            <CreateNewView
              {...props}
              notes={this.state.notes}
              handleInputChange={this.handleInputChange}
              addNewNote={this.addNewNote}
              textBody={this.state.textBody}
              title={this.state.title}
            />
          )}
        />
        <Route
          path='/notes/:_id/delete'
          render={props => (
            <DeleteModal
              {...props}
              notes={this.state.notes}
              deleteNote={this.deleteNote}
            />
          )}
        />
        <Route
          path='/edit/:_id'
          render={props => (
            <EditView
              {...props}
              notes={this.state.notes}
              handleInputChange={this.handleInputChange}
              editNote={this.editNote}
              textBody={this.state.textBody}
              title={this.state.title}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
