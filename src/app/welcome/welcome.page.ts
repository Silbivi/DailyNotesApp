import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlide, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  public onBoardSlides = [];
  @ViewChild('mainSlides', {static: true}) slides: IonSlides;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    this.onBoardSlides = [
      {
        title: "Wish List",
        img: "../../assets/welcomeicon/wishlist.png",
        desc: "Let's make your wish list! This feature is used to remember what items you want.",
      },
      {
        title: "To Do List",
        img: "../../assets/welcomeicon/todo.png",
        desc: "Also make a list of your tasks that must be done at a time in this 'Daily Notes App' application.",
      },
      {
        title: "Notes",
        img: "../../assets/welcomeicon/note.png",
        desc: "And one more thing, you can also make your important notes easily in this 'Daily Notes App' application.",
      },
    ];
  }
  
  public goBack(){
    this.slides.slidePrev();
  }

  public goNext(){
    if(this.onBoardSlides){
      this.slides.slideNext();
    }else{
      this.router.navigate(['/home']);
    }
    
  }

  async skip(){
    this.router.navigate(['/home']);
  }

}
