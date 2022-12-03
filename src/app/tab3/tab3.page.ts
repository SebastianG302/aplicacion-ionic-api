import { Component, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',

})
export class Tab3Page {

  formulario: FormGroup;
  respuesta: any = "";

  constructor(
    private fb: FormBuilder,
    private servicio: ApiService,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.builderForm();
  }

  //Construir formulario
  builderForm() {
    this.formulario = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [, Validators.required],
      images: [['']]
    })
  }

  //función que se llama al presionar el botón
  guardar() {
    if (this.formulario.valid) {
      this.llamarServicio()
    }
  }

  //Llamar al servicio y enviar la petición
  llamarServicio() {
    this.servicio.postGuardar(this.formulario.value).subscribe({
      next: (respuesta: object) => {
        this.respuesta = respuesta;
      },
      error: (msg) => {
        this.presentAlert();
      }
    });
    //Volver a construir el fomulario (reiniciarlo)
    this.builderForm();
  }

  //Alerta error
  async presentAlert() {
    const alertError = await this.alertController.create({
      header: '¡Error!',
      subHeader: 'Error al enviar al enviar la petición',
      message: 'Verifica los datos o intenta más tarde',
      buttons: ['OK']
    });
    await alertError.present();
  }
}