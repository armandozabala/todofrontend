import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(private taskService: TasksService, private router: Router) { }

  ngOnInit(): void {

    this.forma = new FormGroup({
      name: new FormControl( null,  [Validators.required]),
      lastname: new FormControl( null),
      email: new FormControl( null,  [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });


  }

  loginUser(){


  }


  registerUser(){


    if(this.forma.valid){


        this.taskService.register(this.forma.value).subscribe((res:any) => {

            console.log(res);

            if(res.ok){

              swal.fire(
                'Good job!',
                'Register Success!',
                'success'
              );

              this.forma.reset();
              this.router.navigateByUrl("/");

            }else{

              swal.fire(
                'Error!',
                 res.msj,
                'error'
              );


            }




        });

    }
  }

}
