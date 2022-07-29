import React from 'react';
import IndexComponent from "./Components/IndexComponent";
import HomeComponent from "./Components/HomeComponent";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ErrorComponent from './Components/ErrorComponent';


function App() {
  return (
    <div>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route path="/broadcaster" component={IndexComponent} />
        <Route path="/error" component={ErrorComponent} />
      </Switch>
      <br /><br />
      </BrowserRouter>
    </div>
  );
}

export default App;
