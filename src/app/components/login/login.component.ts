import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordame: boolean;
  
  constructor(
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordame = true;
    }
  }

  login(form: NgForm) {

    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor ...',
    });

    Swal.showLoading();

    this.auth.login(this.usuario)
      .subscribe(resp => {
        //console.log(resp);
        Swal.close();

        if (this.recordame) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.error.message);

        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
        });
    
     })
  }

}
