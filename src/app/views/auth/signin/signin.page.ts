import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { AlertService } from 'src/app/model/services/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private alertService: AlertService, private authService: AuthService) {
    this.formLogar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    });
  }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      // o primeiro campo se refere ao campo que pode vir preenchido quando carregamos a tela ou vazio como está configurado no momento
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get erroControl() {
    return this.formLogar.controls;
  }

  submitForm(): boolean {
    if(!this.formLogar.valid){
      console.log(this.formLogar.value);
      this.alertService.presentAlert("Erro", "Campos Obrigatórios!");
      return false;
    }
    else{
      this.alertService.simpleLoaderController();
      this.logar();
      return true;
    }
  }

  private logar() {
  
    this.authService.signInWithEmailAndPassword(this.formLogar.value['email'], this.formLogar.value['senha']).then
    (res => {
      this.alertService.dismissLoaderController();
      this.alertService.presentAlert("Sucesso", "Login realizado com sucesso!");
      this.router.navigate(['home']);
    }).catch(error => {
      this.alertService.dismissLoaderController();
      this.alertService.presentAlert("Erro", "Email ou senha inválidos!");
      console.log(error.message);
    })
  }

  logarComGoogle(): void{
    this.authService.signInWithGoogle().then
    (res => {
      this.alertService.dismissLoaderController();
      this.alertService.presentAlert("Sucesso", "Login realizado com sucesso!");
      this.router.navigate(['home']);
    }).catch(error => {
      this.alertService.dismissLoaderController();
      this.alertService.presentAlert("Erro", "Email ou senha inválidos!");
      console.log(error.message);
    })
  }

  irParaSignUp() {
    this.router.navigate(['signup']);
  }
}
