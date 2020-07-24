import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;

  id: number;

  success: boolean = false;

  errors: String[];

  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) {
    this.cliente = new Cliente();
  }

    ngOnInit(): void {
      let params: Observable<Params> = this.activatedRoute.params;
        params.subscribe( urlParams => {
          this.id = urlParams['id'];
          if(this.id) {
            this.clienteService.getClienteById(this.id)
            .subscribe(
              response => {
                this.cliente = response;
              },
              errorResponse => {
                this.cliente = new Cliente();
              }
            );
          }
        });

    }

    onSubmit() {

      if( this.id ) {
        this.clienteService
        .atualizar(this.cliente)
        .subscribe(
          response => {
            this.success = true;
          },
          errorResponse => {
            this.success = false;
            this.errors = ['Erro ao atualizar o cliente'];
          }
        );

      } else {

        this.clienteService.salvar(this.cliente)
        .subscribe(
          response => {
            this.success = true;
            this.errors = null;
            this.cliente = response;
          },
          errorResponse => {
            this.success = false;
            this.errors = errorResponse.error.errors;
          }
        );

      }
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista']);
  }

}
