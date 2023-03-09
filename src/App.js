// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';

import React, { Component } from 'react'
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Routes} from "react-router-dom"

export default class App extends Component {
  pageSize=12;

  state={
    progress:0,
    apiKey:"9a42fcddf870486988f7e91ff721ce07"
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
      <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        height={6}
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} category={"general"} country={"in"} apiKey={this.state.apiKey}></News>} ></Route>
        <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} category={"general"} country={"in"} apiKey={this.state.apiKey}></News>} ></Route>
        <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category={"sports"} country={"in"} apiKey={this.state.apiKey}></News>} ></Route>
        <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} category={"science"} country={"in"} apiKey={this.state.apiKey}></News>} ></Route>
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} category={"entertainment"} country={"in"} apiKey={this.state.apiKey}></News>} ></Route>
        <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} category={"health"} country={"in"} apiKey={this.state.apiKey}></News>} ></Route>
        <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} category={"business"} country={"in"} apiKey={this.state.apiKey}></News>} ></Route>
        <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category={"technology"} country={"in"} apiKey={this.state.apiKey}></News>} ></Route>
        </Routes>
      </Router>
    </>
    );
  }
}