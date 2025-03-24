import { Component, inject, OnInit } from '@angular/core';
import { OneSignalService } from './services/one-signal.service';
import { HttpClientService } from './http-client.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms"
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Test de notification push';
  oneSignal=inject(OneSignalService)
  private readonly _http=inject(HttpClientService)
  private readonly _builder=inject(FormBuilder)

  private _object:any
  protected form!:FormGroup



  ngOnInit(): void {
    // this.oneSignal.initOneSignal()
    this.create_form().subscribe(form=>this.form=form)
    this.oneSignal.config_notification_push()
  }

  protected sendNotification(){
    if(this.form.valid && this.form.dirty){
      const notification={
        ...this._object,
        ...this.form.value
      }
      this._http.send_fire_base_notification(notification).subscribe({
        next:(response)=>{
          if(response.code===200){
            alert("Notification envoyée")
          }
        }
      })
    }
    if(this.form.get("title")?.invalid){
      alert("Le titre est obligatoire")
    }

    if(this.form.get("content")?.invalid){
      alert("Le contenu est obligatoire")
    }
  }


  private create_form():Observable<FormGroup>{
    return new Observable<FormGroup>(form=>{
      form.next(this._builder.group({
        title:["",[Validators.required]],
        content:["",[Validators.required]]
      })),
      form.complete()
    })
  }

}
