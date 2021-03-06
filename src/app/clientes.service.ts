import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cliente } from './clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURLBase + '/api/clientes';

  constructor(private http: HttpClient) { }

  salvar( cliente: Cliente ): Observable<Cliente> {
    return this.http.post<Cliente>( `${this.apiURL}/`, cliente);
  }

  atualizar( cliente: Cliente ): Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente);
  }

  deletar( cliente: Cliente ): Observable<any> {
    return this.http.delete<Cliente>(`${this.apiURL}/${cliente.id}`);
  }

  getClientes(): Observable<Cliente[]> {
    /*const tokenString = localStorage.getItem('token');
    const token = JSON.parse(tokenString);
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    };*/
    return this.http.get<Cliente[]>(this.apiURL/*, { headers }*/);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiURL}/${id}`);
  }
}
