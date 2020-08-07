import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = `${environment.apiURLBase}/api/usuarios`;
  tokenUrl: string = environment.apiURLBase + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if(tokenString) {
      return JSON.parse(tokenString).access_token;
    }
    return null;
  }

  encerrarSessao() {
    localStorage.removeItem('token');
  }

  getUsuarioAutenticado() {
    const token = this.obterToken();
    if(token) {
      return JSON.parse(token).user_name;
    }
    return null;
  }

  isAuthenticated(): boolean {
   const token = this.obterToken();
   if(token) {
      const expirated = this.jwtHelper.isTokenExpired(token);
      return !expirated;
   }
    return false;
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any>  {
    const params = new HttpParams()
                  .set('username', username)
                  .set('password', password)
                  .set('grant_type', 'password');

    const headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded'
    };

    return this.http.post<any>(this.tokenUrl, params.toString(), { headers });
  }
}

