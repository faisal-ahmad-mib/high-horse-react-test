import { connect } from 'react-redux';

import App from './App';
import { HNActionsCreator } from './actionCreators/HNActionsCreator';

const mapStateToProps = (state) => {
	return {
    	appState: state
  	};
};

const mapDispatchToProps = (dispatch) => {
  	return { 
		getItem:(itemId) => {
      		dispatch(HNActionsCreator.getItem(itemId));
		},
		getChildItems:(itemIds) => {
      		dispatch(HNActionsCreator.getChildItems(itemIds));
		}
	}
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;