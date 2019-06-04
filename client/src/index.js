import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import indigo from '@material-ui/core/colors/indigo';
const theme = createMuiTheme({
  palette: {
    primary: {
        light: '#757ce8',
        main: '#7986cb',
    },
    secondary: {
      main: '#9fa8da',
    },
    typography: {
      useNextVariants: true,
      suppressDeprecationWarnings: true,
    },
  },
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const store = createStoreWithMiddleware(rootReducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
<Provider store={store}>   
    <Router>
        <MuiThemeProvider theme = {theme}>
            <App />
        </MuiThemeProvider>
    </Router>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
