import React from 'react';
import {  Route } from "react-router-dom";
import TracerList from './TracerList';





class TracerManager extends React.Component {
  render() {
    console.log('I am in tracer Manager', this)
  return (
    <>
        
        <Route exact path="/tracers"  component={TracerList} />
       
  
   </>
  
  );
}
}

export default TracerManager;