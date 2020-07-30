import { ClientesService } from './../../clientes.service';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];

  clienteSelecionado: Cliente;

  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private clienteService: ClientesService,
    private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes()
      .subscribe( response => this.clientes = response );
  }

  novoCadastro() {
    this.router.navigate(['/clientes/form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente() {
    this.clienteService.deletar(this.clienteSelecionado)
      .subscribe(
        response => {
          this.mensagemSucesso = "Cliente deletado com sucesso";
          this.ngOnInit();
        },
        errorResponse => this.mensagemErro = "Erro ao deletar cliente"
      );
  }

}
