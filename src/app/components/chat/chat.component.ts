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

  constructor( public _cS: ChatService) { 

    this._cS.cargarMensaje()
            .subscribe()
  }

  ngOnInit(): void {
  }

  enviar_mensaje(){
    console.log(this.mensaje);
  }

}
