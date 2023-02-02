import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  elemento: any;

  constructor( public _cS: ChatService) { 

    this._cS.cargarMensaje()
            .subscribe( () => {
              setTimeout(() => {
                this.elemento.scrollTop = this.elemento.scrollHeight;
              }, 20);
            })
  }

  ngOnInit(): void {
    this.elemento = document.getElementById( 'app-mensajes' );
  }

  enviar_mensaje(){
    console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return
    }
    this._cS.agregarMensaje( this.mensaje )
            .then( () => this.mensaje = '')
            .catch( (err) => console.error('Error al enviar mensaje', err))
  }

}
