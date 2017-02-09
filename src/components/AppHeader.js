import React, { Component } from 'react';
import MessageIcon from 'material-ui/svg-icons/communication/message';
import LaunchIcon from 'material-ui/svg-icons/action/launch';

import { TimeDuration } from '../utilities/TimeDuration';

const HeaderStyle = {
	height: "80px",
	display: "flex",
	flexFlow: "column nowrap",
	color: "#FFE0B7",
	backgroundColor: "#FE6E0D",
	padding: "5px"
}

const ItemNameStyle = {
	fontSize: "large",
	fontWeight: "normal",
}

const ItemDetailsContainerStyle = {
	display: "flex",
	flexFlow: "row nowrap",
}

const ItemDetailStyle = {
	color: "#FFA35C",
	marginRight: "5px",
	padding: "5px"
}

const ScoreItemDetailStyle = Object.assign({}, ItemDetailStyle, {
	backgroundColor: "#FA6A0A",
	borderRadius: "2px",
});

const CommentsItemDetailStyle = Object.assign({}, ItemDetailStyle, {
	display: "flex",
	flexFlow: "row nowrap",
});

const IconStyle = {
	color: "#FFA35C",
}

const ItemExternalLinkStyle = {
	display: "flex",
	flexFlow: "row nowrap",
	alignItems: "center"
}

/*
	Props Details:-
	itemData:Object
*/
export class AppHeader extends Component {


	render() {

		let itemData = this.props.itemData;

		if(itemData) {
			let title = itemData.title;
			let score = itemData.score;
			let by = itemData.by;
			let time = TimeDuration.getTimeDuration(itemData.time);
			let comments = itemData.descendants;
			let url = itemData.url;

			return (
				<div style={HeaderStyle}>
					<div style={ItemNameStyle}>{title}</div>
					<div style={ItemDetailsContainerStyle}>
						<div style={ScoreItemDetailStyle}>{score}</div>
						<div style={ItemDetailStyle}>{by}</div>
						<div style={ItemDetailStyle}>{time}</div>
						<div style={CommentsItemDetailStyle}>
							<MessageIcon style={IconStyle}/>&nbsp;{comments}
						</div>
					</div>
					<div style={ItemExternalLinkStyle}>
						<LaunchIcon style={IconStyle}/>&nbsp;{url}
					</div>
				</div>
			);
		}
		else {
			return (
				<div style={HeaderStyle} />
			);
		}
	}
}