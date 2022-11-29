export class List {
    list_name
    size
    checked = [];
    constructor(list_name, size) {
        this.list_name = list_name;
        this.size = size;
    }
  }