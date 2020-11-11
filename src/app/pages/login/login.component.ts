import { Router } from '@angular/router';
import { TasksService } from './../../services/tasks.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import swal from'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  forma: FormGroup;

  constructor(private taskService: TasksService, private router: Router) { }

  ngOnInit(): void {

    this.forma = new FormGroup({
      email: new FormControl( null,  [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });

  }

  loginuser(){

    if(this.forma.valid){

        this.taskService.login(this.forma.value).subscribe((res:any) => {

            if(!res.ok){

              swal.fire(
                'Error!',
                 res.msj+ " Email or Password wrong",
                'error'
              );

            }else{

              this.router.navigateByUrl("/tasks");

            }

        });

    }

  }

}
