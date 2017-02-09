import { combineReducers } from 'redux'
import { HNReducers } from './HNReducers';

const combinedReducer = combineReducers({
	itemData: HNReducers.itemData,
	commentsDataMap: HNReducers.commentsDataMap
});

export default combinedReducer;
