import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// import * as serviceWorker from './serviceWorker';
import store from './stores';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

import './styles/index.scss';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function render() {
  const App = require('./app/App').default;
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
          <Provider store={store}>
            <App />
          </Provider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
