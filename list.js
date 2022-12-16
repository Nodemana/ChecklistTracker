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
        //for (let i = 0; i <= this.checked.length; i++){
            /*
            if(i = this.checked.length){
                
                checked_string += this.checked[i].toString() + "."
                console.log(this.checked)
                console.log(String(this.checked[i])) //This is undefined
                console.log(checked_string) //This is undefined
            }else{
                checked_string += this.checked[i].toString() + ", "
            }
            */

            

        //}
        checked_string = this.checked.join(', ')
        checked_string = checked_string.slice(0, -2)
        unchecked_string += "."
        const unchecked_length = this.size - this.checked.length

        for (let j = 1; j<= this.size; j++){
            if(!this.checked.includes(j)){
                unchecked_string += j + ", "
            }
            
        }
        unchecked_string = unchecked_string.slice(0, -2)
        unchecked_string += "."
       //console.log(unchecked_string)
       //console.log(checked_string)
      // console.log(this.checked)

        return [checked_string, unchecked_string]
    }

  }