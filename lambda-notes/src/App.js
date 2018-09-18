import React, { Component } from 'react';
import { Route } from 'react-router-dom';

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


const url = 'https://killer-notes.herokuapp.com'

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    axios.get(url)
      .then(response => {
        console.log(response);
        this.setState({ notes: response.data });
      })
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
