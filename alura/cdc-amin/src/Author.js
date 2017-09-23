import React, { Component } from 'react';
import $ from 'jquery';
import CustomInput from './components/CustomInput';
import CustomSubmit from './components/CustomSubmit';

export class AuthorForm extends Component {

	constructor() {
		super();
		this.sendForm = this.sendForm.bind(this);
		this.setName = this.setName.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.state = {
			name: '',
			email: '',
			password: ''
		};
	}

	sendForm(event) {
		event.preventDefault();

		let newAuthor = {
			nome: this.state.name,
			senha: this.state.password,
			email: this.state.email
		};

		$.ajax({
			url: 'http://cdc-react.herokuapp.com/api/autores',
			contentType: 'application/json',
			dataType: 'json',
			type: 'POST',
			data: JSON.stringify(newAuthor),
			success: function(response) {
				this.setState({
					list: response
				});
			}.bind(this),
			error: function(response) {

			}
		});
	}

	setName(event) {
		this.setState({
			name: event.target.value
		});
	}

	setEmail(event) {
		this.setState({
			email: event.target.value
		});
	}

	setPassword(event) {
		this.setState({
			password: event.target.value
		});
	}

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="POST">

          <CustomInput id="name" name="name" label="Nome" value={this.state.name}
                       type="text" onChange={this.setName} />

          <CustomInput id="email" name="email" label="E-mail" value={this.state.email}
                       type="email" onChange={this.setEmail} />

          <CustomInput id="password" name="password" label="Senha" value={this.state.password}
                       type="password" onChange={this.setPassword} />


          <CustomSubmit label="Gravar" />

        </form>

      </div>
    );
  }

}

export class AuthorTable extends Component {

	constructor() {
		super();
		this.state = {
			list: []
		};
	}

	componentWillMount() {
		$.ajax({
			url: 'http://cdc-react.herokuapp.com/api/autores',
			dataType: 'json',
			success: function(data) {
				this.setState({
					list: data
				});
			}.bind(this)
		});
	}

  render() {
    return (
      <div>
        <table className="pure-table">
          <thead>
          <tr>
            <th>Nome</th>
            <th>email</th>
          </tr>
          </thead>
          <tbody>
			    {
				    this.state.list.map((author) => {
					    return (
                <tr key={author.id}>
                  <td>{author.nome}</td>
                  <td>{author.email}</td>
                </tr>
					    );
				    })
			    }
          </tbody>
        </table>
      </div>
    );
  }

}
