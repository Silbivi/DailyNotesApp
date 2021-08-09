import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public router: Router
  ) {}

  async wishlist(){
    this.router.navigate(['/wishlist']);
  }

  async todolist(){
    this.router.navigate(['/todolist']);
  }

  async note(){
    this.router.navigate(['/note']);
  }

}
