import { Component, OnInit } from '@angular/core';
import { Platform } from "@ionic/angular";
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  wishlistName: string = "";
  wishlists: any = [];
  editMode: boolean = false;
  editId: number = 0;

  constructor(
    public database: DatabaseService, 
    public platform: Platform,
    public router: Router) {
    this.database.createDatabase().then(() => {
      this.getWishlist();
    });
  }

  ngOnInit() {}

  addWishlist() {
    if (!this.wishlistName.length) {
      alert("Enter wishlist name");
      return;
    }

    if (this.editMode) {
      this.database
        .editWishlist(this.wishlistName, this.editId)
        .then((data) => {
          this.wishlistName = "";
          (this.editMode = false), (this.editId = 0);
          this.getWishlist();
        });
    } else {
      this.database.addWishlist(this.wishlistName).then((data) => {
        this.wishlistName = "";
        this.getWishlist();
      });
    }
  }

  getWishlist() {
    this.database.getWishlist().then((data) => {
      this.wishlists = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.wishlists.push(data.rows.item(i));
        }
      }
    });
  }

  deleteWishlist(id: number) {
    this.database.deleteWishlist(id).then((data) => {
      this.getWishlist();
    });
  }

  editWishlist(wishlist: any) {
    this.editMode = true;
    this.wishlistName = wishlist.name;
    this.editId = wishlist.id;
  }


  async home(){
    this.router.navigate(['/home']);
  }
}