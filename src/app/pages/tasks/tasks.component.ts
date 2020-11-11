import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TasksService } from './../../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import swal from'sweetalert2';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks:any = [];

  p: number = 1;
  config:any;
  collection = { count: 0, data:[] };

  taskDescription:any = '';

  key: string = 'id';
  reverse: boolean = false;

  taskForm: FormGroup;
  showForm = false;

  addTask = true;

  constructor(private taskService: TasksService) { }

  ngOnInit(): void {


    this.taskForm = new FormGroup({
      id:  new FormControl(0),
      description: new FormControl( null,  [Validators.required]),
      complete: new FormControl(false),
    });


          this.config = {
            itemsPerPage: 10,
            currentPage: 1,
            totalItems: this.tasks.length
        }

        this.taskService.getTasks(2).subscribe((res:any) => {

            console.log(res.rows);
            this.tasks = res.rows;

        });

  }


  pageChanged(event){
    this.config.currentPage = event;
  }



  showForms(){
     this.showForm = !this.showForm;
     this.addTask = true;
  }


  search(){
      if(this.taskDescription == ""){
         this.ngOnInit();
      }else{
          this.tasks = this.tasks.filter(res =>{
                return res.description.toLocaleLowerCase().match(this.taskDescription.toLocaleLowerCase())
          })
      }
  }


  modifyTask(item: any){

      this.addTask = false;
      this.showForm = true;
      console.log(item);

      this.taskForm.get('id').setValue(item.idtask);
      this.taskForm.get('description').setValue(item.description);
      this.taskForm.get('complete').setValue(item.complete);

  }

  deleteTask(item: any){


    swal.fire({
      title: 'Are you sure?',
      text: "Delete this task!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {


        this.taskService.deleteTask(item.idtask).subscribe((res:any) => {

            if(res.ok){

              swal.fire(
                'Success!',
                'Task Deleted!',
                'success'
              );
              this.ngOnInit();
            }


        });


      }
    })




  }

  add(data:any){
     console.log(data);

     this.taskService.editTask(data.idtask, data).subscribe((res:any) => {


          swal.fire(
            'Success!',
            'Task Completed!',
            'success'
          );

     });
  }

  remove(data:any){

    this.taskService.editTask(data.idtask, data).subscribe((res:any) => {

      console.log(res);

    });

  }

  task(){


      if(this.taskForm.valid){

         if(this.addTask){

              this.createTask();

         }else{

              this.editTasks();
         }



      }

  }

  editTasks(){


    this.taskForm.value.complete =  this.taskForm.value.complete ? 1 : 0;

    this.taskService.editTask(this.taskForm.value.id, this.taskForm.value).subscribe((res:any) => {


           if(res.ok){

             swal.fire(
               'Update!',
               'Task update success!',
               'success'
             );

             this.taskForm.reset();
             this.showForm = false;
             this.addTask = false;
             this.ngOnInit();

           }


    });

  }

  createTask(){

    this.taskForm.value.complete =  this.taskForm.value.complete ? 1 : 0;

    console.log(this.taskForm.value);

    this.taskService.saveTask(2, this.taskForm.value).subscribe((res:any) => {


           if(res.ok){

             swal.fire(
               'Good job!',
               'Register Task!',
               'success'
             );

             this.taskForm.reset();
             this.ngOnInit();

           }


    });
  }

}
