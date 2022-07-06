import './App.css';
import NavBar from './component/NavBar';
import News from './component/News';

import React, { useState } from 'react'
import {BrowserRouter as Router, Route , Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App= ()=> {
  const apikey=process.env.REACT_APP_NEWS_API;

  const[progress,setProgress]=useState(0);

    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar height={3} color='red' progress={progress}/>
          <Routes>
            <Route exact path="/" element={<News apikey={apikey}  setProgress={setProgress}  key="general" pagesize={5} country={"in"} />}></Route>
            <Route exact path="/business" element={<News apikey={apikey}  setProgress={setProgress}  key="business" pagesize={5} country={"in"} category={'business'} />}></Route>
            <Route exact path="/entertainment" element={<News apikey={apikey}  setProgress={setProgress}   key="entertainment" pagesize={5} country={"in"} category={'entertainment'} />}></Route>
            <Route exact path="/health" element={<News apikey={apikey}  setProgress={setProgress}   key="health" pagesize={5} country={"in"} category={'health'} />}></Route>
            <Route exact path="/science" element={<News apikey={apikey}  setProgress={setProgress}   key="science" pagesize={5} country={"in"} category={'science'} />}></Route>
            <Route exact path="/sports" element={<News apikey={apikey}  setProgress={setProgress}  key="sports"  pagesize={5} country={"in"} category={'sports'} />}></Route>
            <Route exact path="/technology" element={<News apikey={apikey}  setProgress={setProgress}  key="technology"  pagesize={5} country={"in"} category={'technology'} />}></Route>
          </Routes>
        </Router>
      </div>
    )
}

export default App