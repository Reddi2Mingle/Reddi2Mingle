import React, { Component } from 'react';
import { Link } from 'react-router';

export default class CreatePassword extends Component {

	render() {
		return (
			<div>
				<h1>Create a new password for Reddi2Mingle</h1>				
				<h6>(please don't use your Reddit password)</h6>
				<input></input>
				<button>Continue</button>
			</div>
		)
	}
}