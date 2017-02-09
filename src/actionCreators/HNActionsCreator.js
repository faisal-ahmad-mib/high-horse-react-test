import { ActionNames } from '../constants/ActionNames';

export class HNActionsCreator {

	// ********************************************************************************************
	// Sync Action Creators
	// ********************************************************************************************
	static getItemCompleted(itemData) {
		return {
			type: ActionNames.HN_GET_ITEM_COMPLETED,
			itemData: itemData
		};
	}

	static getChildItemCompleted(childItemData) {
		return {
			type: ActionNames.HN_GET_CHILD_ITEM_COMPLETED,
			childItemData: childItemData
		};
	}

	// ********************************************************************************************
	// Async Action Creators
	// ********************************************************************************************
	static getItem(itemId) {

		return function(dispatch, getState) {

			fetch(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
				.then((response)=>{
					return response.text();
				})
				.then((responseText)=>{
					var responseJson = JSON.parse(responseText);
					dispatch(HNActionsCreator.getItemCompleted(responseJson));
				})
				.catch((error)=>{
					console.log(error.message);
				});
		};
	}

	static getChildItems(childItemIds) {
		
		return function(dispatch, getState) {

			// We are going to load the items sequentially so that we can start rendering as 
			// soon as we start receiving the data.
			childItemIds.reduce((current, next)=>{
				return current.then(()=>{ HNActionsCreator.getChildItem(dispatch, next) });
			}, Promise.resolve())
		};
	}

	static getChildItem(dispatch, childItemId) {

		return fetch(`https://hacker-news.firebaseio.com/v0/item/${childItemId}.json`)
			.then((response)=>{
				return response.text();
			})
			.then((responseText)=>{
				var responseJson = JSON.parse(responseText);
				dispatch(HNActionsCreator.getChildItemCompleted(responseJson));
			})
			.catch((error)=>{
				console.log(error.message);
			});
	}
}
