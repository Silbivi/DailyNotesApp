import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewTaskPage } from '../add-new-task/add-new-task.page';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { UpdateTaskPage } from '../update-task/update-task.page';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.page.html',
  styleUrls: ['./todolist.page.scss'],
})
export class TodolistPage implements OnInit {

  todoList = []

  today : number = Date.now()
  constructor(
    public modalCtrl:ModalController, 
    public todoService:TodoService, 
    public router: Router,) {
    this.getAllTask()
  }

  ngOnInit() {
  }

  async addTask(){
    const modal = await this.modalCtrl.create({
      component: AddNewTaskPage
    })

    modal.onDidDismiss().then(newTask => {
      this.getAllTask()
      //console.log(newTask.data);
      //this.todoList.push(newTask.data)

    })

    return await modal.present()
  }

  getAllTask(){
    this.todoList = this.todoService.getAllTask()
    console.log(this.todoService.getAllTask());
  }

  delete(key){
    this.todoService.deleteTask(key)
    //this.todoList.splice(index,1)
    this.getAllTask()
  }

  async update(selectedTask){
    const modal = await this.modalCtrl.create({
      component: UpdateTaskPage,
      componentProps: {task: selectedTask}
    })

    modal.onDidDismiss().then(newTask => {
      this.getAllTask()
      //console.log(newTask.data);
      //this.todoList.push(newTask.data)

    })
    console.log(selectedTask);
    return await modal.present()
  }

  async home(){
    this.router.navigate(['/home']);
  }
}
