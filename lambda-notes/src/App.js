import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';


import NoteView from './components/NoteView';
import ListView from './components/ListView';
import SideBar from './components/SideBar';
import './App.css';
import './components/SideBar.css';
import './components/NoteView.css';
import './components/ListView.css';


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
      </div>
    );
  }
}

export default App;
