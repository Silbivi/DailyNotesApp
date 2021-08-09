import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { AddNewnotePage } from '../add-newnote/add-newnote.page';
import { ModalController } from '@ionic/angular';
import { UpdateNotePage } from '../update-note/update-note.page';

@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss'],
})
export class NotePage implements OnInit {
  noteJudul: string = "";
  noteCatatan: string = "";
  note: any = [];
  editMode: boolean = false;
  editId: number = 0;

  constructor(
    public database: DatabaseService, 
    public platform: Platform,
    public router: Router,
    public modalCtrl:ModalController,
  ) {
    this.database.createDatabase().then(() => {
      this.getNote();
    });
   }
   
  ngOnInit() {}
  
  getNote() {
    this.database.getNote().then((data) => {
      this.note = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.note.push(data.rows.item(i));
        }
      }
    });
  }

  async addNote(){
    const modal = await this.modalCtrl.create({
      component: AddNewnotePage
    })

    modal.onDidDismiss().then(data => {
      this.noteJudul = "";
      this.noteCatatan = "";
      this.getNote();  
    })

    return await modal.present()
  }

  async editNote(selectnote){
    console.log("INI YANG KESELECT ==> ", selectnote);
    
    const modal = await this.modalCtrl.create({
      component: UpdateNotePage,
      componentProps: {note: selectnote}
    })

    modal.onDidDismiss().then(data => {
      this.editMode=true;
      this.getNote();  
    })
    console.log(selectnote);
    return await modal.present()
  }

  async home(){
    this.router.navigate(['/home']);
  }

}
