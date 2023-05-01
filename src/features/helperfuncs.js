
export const filterList = list=>{
    const filtered_list = [] 
       list.forEach((value)=>{
        if(filtered_list.length == 0){
            filtered_list.push(value)
        }else{
            let add = true
            filtered_list.forEach(item=>{
                if (item.id == value.id){
                    add = false
                }
            })
            if(add){
                filtered_list.push(value)
                add = true
            }
        }
       })

       return filtered_list
}