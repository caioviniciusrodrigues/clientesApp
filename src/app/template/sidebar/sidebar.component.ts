import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  usuarioLogado: string;

  constructor( private auth: AuthService) { }

  ngOnInit(): void {
    this.usuarioLogado = this.auth.getUsuarioAutenticado();
  }

}
