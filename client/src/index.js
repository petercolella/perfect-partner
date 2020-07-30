import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider as UserProvider } from './context/UserContext';
import { Provider as SnackbarProvider } from './context/SnackbarContext';
import App from './App';

const ContextWrapper = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </UserProvider>
    </AuthProvider>
  );
};

ReactDOM.render(<ContextWrapper />, document.getElementById('root'));
