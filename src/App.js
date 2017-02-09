import React, { Component } from 'react';

import { AppHeader } from './components/AppHeader';
import { Comment } from './components/Comment';

const AppContainerStyle = {
	display: "flex",
	flexFlow: "column nowrap"
}

const CommentsContainerStyle = {
	flex: "1 1 auto",
}
/*
	Props Details:-
	appState: {
		itemData:Object
		commentsDataMap:Map
	},
	getItem: function(itemId:string),
	getChildItems: function(itemIds:Array<string>)
*/
class App extends Component {

	constructor(props) {
		super(props);
		this.expandComment = this.expandComment.bind(this);
		this.collapseComment = this.collapseComment.bind(this);
		this.isCommentExpanded = this.isCommentExpanded.bind(this);
		this.state = {
			// Map to keep track of which comments are collapsed and which are expanded
			expandedComments: {}
		}
	}

	expandComment(commentId) {

		var state = Object.assign({}, this.state);
		state.expandedComments[commentId] = true;
		this.setState(state);

		console.log(`Expanding child comments for '${commentId}'.`);
		// Have we loaded the data for the child comments or not?
		// If it has not been loaded yet then kick off the loading for the child comments
		let commentsDataMap = this.props.appState.commentsDataMap;
		let commentItemData = commentsDataMap[commentId];
		let firstChildCommentId = commentItemData.kids[0];
		var childCommentItemData = commentsDataMap[firstChildCommentId];
		if(!childCommentItemData) {
			console.log(`The child comments for ${commentId} have not yet been loaded. Initiating load.`);
			this.props.getChildItems(commentItemData.kids);
		}
	}

	collapseComment(commentId) {

		var state = Object.assign({}, this.state);
		state.expandedComments[commentId] = false;
		this.setState(state);
	}

	isCommentExpanded(commentId) {

		if(this.state.expandedComments[commentId] === true)
			return true;

		return false;
	}

	getChildComments(itemData) {

		var commentElements = [];
		var commentsDataMap = this.props.appState.commentsDataMap;

		// Get the ids for all the child comments for the item
		var commentIds = itemData.kids;
		commentIds.forEach((commentId)=>{

			// Get the comment item against this commentId from the commentsDataMap. Even if it is 
			// not yet loaded, we are going to add an element that would be showing the 
			// loading icon.
			let commentItemData = commentsDataMap[commentId];
			let expanded = this.isCommentExpanded(commentId);
			let hasChildren = commentItemData && commentItemData.kids && commentItemData.kids.length > 0;
			let childCommentElements = [];
			if(hasChildren) {
				childCommentElements = this.getChildComments(commentItemData);
			}

			var commentElement = (
				<Comment key={commentId} 
					itemId={commentId}
					itemData={commentItemData} 
					expanded={expanded} 
					getChildItems={this.props.getChildItems}
					expandComment={this.expandComment} 
					collapseComment={this.collapseComment}>

					{childCommentElements}
				</Comment>
			);
			commentElements.push(commentElement);
		});

		return commentElements;
	}

	componentWillReceiveProps(nextProps) {

		// If we are receiving a new item, kick off the call to get it's top level comments
		if(nextProps.appState.itemData && nextProps.appState.itemData !== this.props.appState.itemData) {
			var commentIds = nextProps.appState.itemData.kids;
			this.props.getChildItems(commentIds);
		}
	}

	render() {

		let childCommentElements;
		let itemData = this.props.appState.itemData;

		if(itemData && itemData.kids && itemData.kids.length > 0) {
			childCommentElements = this.getChildComments(itemData);
		}

		return (
			<div style={AppContainerStyle}>
				<AppHeader itemData={itemData} />
				<div style={CommentsContainerStyle}>
					{childCommentElements}
				</div>
			</div>
		);
	}
}

export default App;
