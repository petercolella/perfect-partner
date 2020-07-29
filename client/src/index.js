import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as UserProvider } from './context/UserContext';
import App from './App';

const ContextWrapper = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
};

ReactDOM.render(<ContextWrapper />, document.getElementById('root'));
