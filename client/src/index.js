import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as UserProvider } from './context/UserContext';
import { Provider as SnackbarProvider } from './context/SnackbarContext';
import App from './App';

const ContextWrapper = () => {
  return (
    <UserProvider>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </UserProvider>
  );
};

ReactDOM.render(<ContextWrapper />, document.getElementById('root'));
