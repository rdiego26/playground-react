import React, { Component } from 'react';
export default class CustomInput extends Component {

	render() {
		return (
			<div className="pure-control-group">
				<label htmlFor="nome">Nome</label>
				<input id="name" type="text" name="name" value={this.state.name} onChange={this.setName}/>
			</div>
		);
	}
}