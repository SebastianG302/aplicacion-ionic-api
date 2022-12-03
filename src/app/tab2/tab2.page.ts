import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',

})
export class Tab2Page {

  formulario: FormGroup;
  respuesta: any;

  constructor(
    private fb: FormBuilder,
    private servicio: ApiService
  ) { }

  ngOnInit() {
    this.builderForm();
  }
  //función que se llama al presionar el botón
  builderForm() {
    this.formulario = this.fb.group({
      busqueda: ['', Validators.required],
    })
  }
  //Llamar al servicio y enviar la petición
  buscar() {
    if (this.formulario.valid) {
      this.llamarServicio();
    }
  }

  llamarServicio() {
    this.servicio.getMetodo(this.formulario.value.busqueda).subscribe({
      next: (respuesta: object) => {
        this.respuesta = respuesta;
        console.log(respuesta);
      }
    });
    this.builderForm();
  }

}
