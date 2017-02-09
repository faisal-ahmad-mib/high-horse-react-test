import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'whatwg-fetch';

import './styles/index.css';

import AppContainer from './AppContainer';
import combinedReducer from './reducers/CombinedReducer';
import { HNActionsCreator } from './actionCreators/HNActionsCreator';

injectTapEventPlugin();
const store = createStore(combinedReducer, applyMiddleware(thunkMiddleware));
store.dispatch(HNActionsCreator.getItem("3410773"));

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			<AppContainer />
		</MuiThemeProvider>
	</Provider>,
  	document.getElementById('root')
);