import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";

@Injectable({
  providedIn: "root",
})
export class DatabaseService {
  databaseObj: SQLiteObject;
  tables = {
    wishlists: "wishlists",
    note : "note",
  };

  constructor(private sqlite: SQLite) {}

  async createDatabase() {
    await this.sqlite
      .create({
        name: "DailyNotes",
        location: "default"
      })
      .then((db: SQLiteObject) => {
        this.databaseObj = db;
      })
      .catch((e) => {
        alert("error on creating database " + JSON.stringify(e));
      });

    await this.createTables();
  }

  async createTables() {
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.wishlists} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL UNIQUE)`,
      []
    );
    await this.databaseObj.executeSql(
      `CREATE TABLE IF NOT EXISTS ${this.tables.note} (id INTEGER PRIMARY KEY AUTOINCREMENT, judul VARCHAR(255) NOT NULL UNIQUE, catatan MEDIUMTEXT)`,
      []
    );
  }

  async addWishlist(name: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.wishlists} (name) VALUES ('${name}')`,
        []
      )
      .then(() => {
        return "wishlists created";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "wishlists already exists";
        }

        return "error on creating wishlists " + JSON.stringify(e);
      });
  }

  async getWishlist() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.wishlists} ORDER BY name ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "error on getting wishlists " + JSON.stringify(e);
      });
  }

  async deleteWishlist(id: number) {
    return this.databaseObj
      .executeSql(`DELETE FROM ${this.tables.wishlists} WHERE id = ${id}`, [])
      .then(() => {
        return "wishlists checklist";
      })
      .catch((e) => {
        return "error on deleting wishlists " + JSON.stringify(e);
      });
  }

  async editWishlist(name: string, id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.wishlists} SET name = '${name}' WHERE id = ${id}`,
        []
      )
      .then(() => {
        return "wishlists updated";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "wishlists already exist";
        }

        return "error on updating wishlists " + JSON.stringify(e);
      });
  }


  async addNote(judul: string, catatan: string) {
    return this.databaseObj
      .executeSql(
        `INSERT INTO ${this.tables.note} (judul,catatan) VALUES ('${judul}','${catatan}')`,
        []
      )
      .then(() => {
        return "category created";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "category already exists";
        }

        return "error on creating category " + JSON.stringify(e);
      });
  }

  async getNote() {
    return this.databaseObj
      .executeSql(
        `SELECT * FROM ${this.tables.note} ORDER BY judul ASC`,
        []
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return "error on getting categories " + JSON.stringify(e);
      });
  }

  async deleteNote(id: number) {
    return this.databaseObj
      .executeSql(`DELETE FROM ${this.tables.note} WHERE id = ${id}`, [])
      .then(() => {
        return "category deleted";
      })
      .catch((e) => {
        return "error on deleting category " + JSON.stringify(e);
      });
  }

  async editNote(judul: string, catatan: string, id: number) {
    return this.databaseObj
      .executeSql(
        `UPDATE ${this.tables.note} SET judul = '${judul}', catatan = '${catatan}' WHERE id = ${id}`,
        []
      )
      .then(async (data) => {
        console.log("SETELAH EDIT INILAH DATAMYA => ", await data);
        
        return "category updated";
      })
      .catch((e) => {
        if (e.code === 6) {
          return "category already exist";
        }

        return "error on updating category " + JSON.stringify(e);
      });
  }

}