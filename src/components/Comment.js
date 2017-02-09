import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import AccountIcon from 'material-ui/svg-icons/action/account-box';
import HourGlassIcon from 'material-ui/svg-icons/action/hourglass-empty';
import ExpandedIcon from 'material-ui/svg-icons/navigation/expand-more';
import CollapsedIcon from 'material-ui/svg-icons/navigation/chevron-right';

import { TimeDuration } from '../utilities/TimeDuration';

const ContainerStyle = {
	display: "flex",
	flexFlow: "column nowrap",
	paddingBottom: "1px",
	backgroundColor: "#F4F0ED",
}

const ChildContainerStyle = Object.assign({}, ContainerStyle, {
	paddingTop: "1px",
	paddingLeft: "20px",
});

const HeaderStyle = {
	display: "flex",
	flexFlow: "row nowrap",
	backgroundColor: "white",
	alignItems: "center",
	paddingBottom: "5px",
	color: "#DF6D1E"
}

const ContentStyle = {
	paddingLeft: "5px",
	backgroundColor: "white",
}

const OrangeStyle = {
	color:"#FEA269"
}

const GreyStyle = {
	color:"#8B898A"
}

const ExpandCollapseIconStyle = Object.assign({}, GreyStyle, {
	cursor: "pointer"
});
/*
	Props Details:-
	itemId:string
	itemData:Object
	expanded: boolean
	expandComment: function(commentId:string)
	collapseComment: function(commentId:string)
	getChildItems: function(itemIds:Array<string>)
*/
export class Comment extends Component {

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {

		if(this.props.expanded)
			this.props.collapseComment(this.props.itemId);
		else
			this.props.expandComment(this.props.itemId);
	}

	getExpandCollapseElement() {

		let expandCollapseElement;
		let itemData = this.props.itemData;
		if(itemData.kids && itemData.kids.length > 0) {

			let expandCollapseIcon = this.props.expanded ? <ExpandedIcon /> : <CollapsedIcon />;
			expandCollapseElement = (
				<div style={ExpandCollapseIconStyle} onClick={this.handleClick}>
					{expandCollapseIcon}&nbsp;
				</div>
			);
		}

		return expandCollapseElement;
	}

	componentWillReceiveProps(nextProps) {

		// If we are receiving a new item, kick off the call to get it's top level comments
		if(!this.props.itemData && nextProps.itemData) {
			var commentIds = nextProps.itemData.kids;
			if(commentIds && commentIds.length > 0)
				this.props.getChildItems(commentIds);
		}
	}

	render() {

		let itemData = this.props.itemData;

		if(!itemData) {
			// The comment has not yet been loaded, so show the loading indicator instead.
			return (
				<div style={ContainerStyle}>
					<CircularProgress color="#FC6F0F" />
				</div>
			);
		}
		else {
			// Show the comment now that is loaded. 
			let commentText = { __html: itemData.text };
			let expandCollapseElement = this.getExpandCollapseElement();
			let childElementsContainer = <div />; 
			if(this.props.expanded) {
				childElementsContainer = (
					<div style={ChildContainerStyle}>
						{this.props.children}
					</div>
				);
			}

			return (
				<div style={ContainerStyle}>
					<div style={HeaderStyle}>
						{expandCollapseElement}
						<AccountIcon style={OrangeStyle} />&nbsp;
						{itemData.by}
						<div style={{width:"10px"}} />
						<HourGlassIcon style={GreyStyle} />
						<div style={GreyStyle}>{TimeDuration.getTimeDuration(itemData.time)}</div>
					</div>
					<div style={ContentStyle} dangerouslySetInnerHTML={commentText} />

					{childElementsContainer}
				</div>
			);
		}
	}
}
