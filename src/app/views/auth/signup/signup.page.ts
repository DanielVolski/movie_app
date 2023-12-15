import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formCadastrar: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService
  ) {
    this.formCadastrar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      confirmarSenha: new FormControl(''),
    });
  }

  ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      // o primeiro campo se refere ao campo que pode vir preenchido quando carregamos a tela ou vazio como está configurado no momento
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required]],
    });
  }

  get erroControl() {
    return this.formCadastrar.controls;
  }

  submitForm() {
    if (!this.formCadastrar.valid) {
      this.alertService.presentAlert('Erro', 'Campos Obrigatórios!');
      return false;
    } else {
      this.cadastrar();
      return true;
    }
  }

  private cadastrar() {
    this.authService
      .signUpWithEmailAndPassword(
        this.formCadastrar.value['email'],
        this.formCadastrar.value['senha']
      )
      .then((res) => {
        this.alertService.presentAlert(
          'Sucesso',
          'Cadastro realizado com sucesso!'
        );
        this.router.navigate(['signin']);
      }).catch((error) => {
        this.alertService.presentAlert('Erro', 'Erro ao cadastrar!');
        console.log(error.message);
      });
  }

  irParaSignIn() {
    this.router.navigate(['signin']);
  }
}
