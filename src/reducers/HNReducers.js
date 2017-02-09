import { ActionNames } from '../constants/ActionNames';

export class HNReducers {

	static itemData(previousValue = null, action) {

		let newValue = previousValue;

		switch(action.type) {

			case ActionNames.HN_GET_ITEM_COMPLETED:
				newValue = action.itemData;
				break;

			default:
				break;
		}

		return newValue;
	}

	static commentsDataMap(previousValue = {}, action) {

		let newValue = previousValue;

		switch(action.type) {

			case ActionNames.HN_GET_ITEM_COMPLETED:
				newValue = {};
				break;

			case ActionNames.HN_GET_CHILD_ITEM_COMPLETED:
				// Make a clone of the existing dictionary object
				newValue = Object.assign({}, newValue);
				// Put the new values coming in into the map
				var childItemData = action.childItemData;
				newValue[childItemData.id] = childItemData;
				break;

			default:
				break;
		}

		return newValue;
	}
}