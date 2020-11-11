import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  url = 'http://localhost:3000/'

  constructor(private http: HttpClient) {

  }


  login(user:any){
    return this.http.post(this.url+"auth", user);
  }

  register(user:any){
      return this.http.post(this.url+"register", user);
  }

  getTasks(idUser:any){
    return this.http.get(this.url+"alltasks/"+idUser);
  }

  saveTask(idUser:any, task:any){
    return this.http.post(this.url+"registertask/"+idUser, task);
  }

  deleteTask(idTask:any){
    return this.http.post(this.url+"deletetask/"+idTask,{});
  }

  editTask(idTask:any, task:any){
    return this.http.put(this.url+"updatetask/"+idTask, task);
  }



}
