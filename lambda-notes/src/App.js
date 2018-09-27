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
    axios.get('http://localhost:9000/')
      .then(response => {
        console.log(response);
        this.setState({ notes: response.data });
      })
      .catch(err => console.log(err));
  }

  setNotesData = data => this.setState({ notes: data });

  addNewNote = (event, push) => {
    event.preventDefault();
    const { title, textBody } = this.state;
    const newNote = { title, textBody };

    axios.post(`http://localhost:9000/create`, newNote)
      .then(response => {
        this.setNotesData([ ...this.state.notes, response.data]);
      })

    this.setState({
      title: '',
      textBody: '',
    });
    push('/')
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  deleteNote = (event, _id, redirectTo) => {
    event.preventDefault();
    axios.delete(`http://localhost:9000/notes/${_id}/delete`)
      .then(response => {
        redirectTo('/');
        this.setNotesData(this.state.notes.filter(n => n._id != _id));
      })
      .catch(err => console.log(err));
  }

  editNote = (event, _id, push) => {
    event.preventDefault();
    const { title, textBody } = this.state;
    const note = { title, textBody };
    axios.put(`http://localhost:9000/edit/${_id}`, note)
      .then(response => {
        this.setNotesData([ ...this.state.notes.filter(n => n._id != _id), response.data]);
      })
    this.setState({
      title: '',
      textBody: '',
    });
    push('/')
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
