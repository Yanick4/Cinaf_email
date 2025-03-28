import { Routes } from '@angular/router';
import { TopicFormComponent } from './topic-form/topic-form.component';

export const routes: Routes = [
    {
        path:"topic",
        loadComponent:()=>import("./topic-form/topic-form.component").then(c=>TopicFormComponent)
    },
    {
        path:"messages",
        loadComponent:()=>import("./topic-message-send/topic-message-send.component").then(c=>c.TopicMessageSendComponent)
    },
    {
        path:"",
        pathMatch:"full",
        redirectTo:"topic"
    }
];
