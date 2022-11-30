export class List {
    list_name
    size
    checked = [];
    constructor(list_name, size) {
        this.list_name = list_name;
        this.size = size;
    }

    CheckedStrings(){
        checked_string = ''
        unchecked_string = ''
        for (let i = 1; i< this.checked.length; i++){
            if(i = this.checked.length){
                checked_string += this.checked[i] + "."
            }else{
                checked_string += this.checked[i] + ", "
            }
        }
        const unchecked_length = this.size - this.checked.length

        for (let j = 1; j<= this.size; j++){
            if(!this.checked.includes(j)){
                unchecked_string += j + ", "
            }
            
        }
        unchecked_string = unchecked_string.slice(0, -2)
        unchecked_string += "."
       

        return [checked_string, unchecked_string]
    }

  }