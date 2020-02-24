import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordame: boolean;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {


  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor ...',
    });

    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
      .subscribe(resp => {
        console.log(resp);
        Swal.close();

        if (this.recordame) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.error.message);

        Swal.fire({
          icon: 'error',
          title: 'Error al crear el registro',
          text: err.error.error.message,
        });
      })

  }

}
