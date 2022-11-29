import {List} from './list.js'

export class User {
    username
    password
    lists = [];
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
  
    makeList(list_name, size){
      const list = new List(list_name, size);
      this.lists.push(list);
    }
  }