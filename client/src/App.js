import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//components
import Landing from './components/MainBody/Landing';
import MainBody from './components/MainBody/MainBody';
import Birthday from './components/QuestionComponents/Birthday';
import Nudges from './components/QuestionComponents/Nudges';
import Partner from './components/QuestionComponents/Partner';
import Phone from './components/QuestionComponents/Phone';
import Anniversary from './components/QuestionComponents/Anniversary';

//CSS
import './styles.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={Landing} />
        <Route exact path="/birthday" component={Birthday} />
        <Route exact path="/nudges" component={Nudges} />
        <Route exact path="/partner" component={Partner} />
        <Route exact path="/phone" component={Phone} />
        <Route exact path="/anniversary" component={Anniversary} />
        <Route exact path="/dashboard" component={MainBody} />
      </div>
    </BrowserRouter>
  );
};

export default App;
