import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-topic-message-send',
  imports: [ReactiveFormsModule],
  templateUrl: './topic-message-send.component.html',
  styleUrl: './topic-message-send.component.scss'
})
export class TopicMessageSendComponent implements OnInit{
  private readonly _http=inject(HttpClientService)
  private readonly _builder=inject(FormBuilder)
  protected form!:FormGroup
  private  _object:any
  ngOnInit(): void {
    this.create_form().subscribe(form=>this.form=form)
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
        content:["",[Validators.required]],
        topic_name:["",[Validators.required]]
      })),
      form.complete()
    })
  }
}
