import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-topic-form',
  imports: [ReactiveFormsModule],
  templateUrl: './topic-form.component.html',
  styleUrl: './topic-form.component.scss'
})
export class TopicFormComponent implements OnInit{
  private readonly _builder=inject(FormBuilder)
  protected form!:FormGroup
  private readonly _http=inject(HttpClientService)
  private _object:any
  ngOnInit(): void {
      this.form=this._builder.group({
        topic_name:["",[Validators.required]],
        context:["CREATION"]
      })
  }

  protected create_topic(){
    if(this.form.valid){
      const topic={
        ...this._object,
        ...this.form.value
      }
      this._http.create_topic(topic).subscribe(()=>console.log("topic sucessfully created"))
    }else{
      alert("form isn't valid")
    }
  }
}
