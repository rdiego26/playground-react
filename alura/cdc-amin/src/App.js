import React, { Component } from 'react';
import CustomInput from './components/CustomInput';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

class App extends Component {

  constructor() {
    super();
    this.sendForm = this.sendForm.bind(this);
	  this.setName = this.setName.bind(this);
	  this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.state = {
      list: [],
      name: '',
      email: '',
      password: ''
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
      <div id="layout">

        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>

        <div id="menu">
          <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Livraria S.A.</a>

            <ul className="pure-menu-list">
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
              <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livros</a></li>
            </ul>
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <div className="content" id="content">
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.sendForm} method="POST">

                <CustomInput id="name" name="name" label="Nome" value={this.state.name}
                             type="text" onChange={this.setName} />

                <CustomInput id="email" name="email" label="E-mail" value={this.state.email}
                             type="email" onChange={this.setEmail} />

                <CustomInput id="password" name="password" label="Senha" value={this.state.password}
                             type="password" onChange={this.setPassword} />


                <div className="pure-control-group">
                  <label></label>
                  <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
              </form>

            </div>
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
          </div>
        </div>

      </div>
    );
  }
}

export default App;
