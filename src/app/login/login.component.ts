import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from './usuario';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;

  errors: string[];
  mensagemSucesso: string;

  cadastrando: boolean;

  constructor(
    private router: Router,
    private auth: AuthService
    ) { }

  onSubmit() {

    this.mensagemSucesso = null;

    localStorage.removeItem('token');

    this.auth.tentarLogar(this.username, this.password)
      .subscribe(
        response => {
          const token = JSON.stringify(response);
          localStorage.setItem('token', token);
          this.router.navigate(['/home']);
        },
        errorResponse => {
          console.log(errorResponse);
          this.errors = ['Usuário e/ou senha incorreto(s).'];
        }
      );

  }

  preparaCadastrar(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    this.cadastrando = true;
    this.mensagemSucesso = '';
  }

  cancelaCadastro() {
    this.cadastrando = false;
    this.username = '';
    this.password = '';
    this.mensagemSucesso = '';
    this.errors = null;
  }

  cadastrar() {
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.auth
        .salvar(usuario)
        .subscribe(
          response => {
            this.mensagemSucesso = 'Cadastro realizado com sucesso, efetue login';
            this.cadastrando = false;
            this.username = '';
            this.password = '';
            this.errors = null;
          },
          errorResponse => {
            this.mensagemSucesso = null;
            this.errors = errorResponse.error.errors;
          }
        );
  }

}
