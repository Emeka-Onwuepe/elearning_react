import { createSlice } from '@reduxjs/toolkit';

const initialData = {
    products:[],
    total: 0,
    payment:{
        status: null,
        purchase_id: "",
        id:null,
    }
}



let cartData = JSON.parse(localStorage.getItem("e_cart"))
if(!cartData){
  localStorage.setItem("e_cart", JSON.stringify(initialData))
  cartData = initialData
}

const initialState = {
  products: cartData.products, 
  total:cartData.total,
  payment: cartData.payment
}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToCart: (state,action) => {
        state.products.push(action.payload) 
        state.total += action.payload.price
        let data = JSON.parse(localStorage.getItem("e_cart"))
        data.products = state.products
        data.total = state.total
        localStorage.setItem("e_cart", JSON.stringify(data)) 
    },
   updateCart: (state,action)=>{
        state.products = action.payload.products
        state.total = action.payload.total
        let data = JSON.parse(localStorage.getItem("e_cart"))
        data.products = state.products
        data.total = state.total
        localStorage.setItem("e_cart", JSON.stringify(data)) 
   },
   updatePayment: (state,action)=>{
    state.payment = action.payload
    let data = JSON.parse(localStorage.getItem("e_cart"))
    data.payment = state.payment
    localStorage.setItem("e_cart", JSON.stringify(data)) 
    }
   ,
   clearCart: (state)=>{
    state.products = []
    state.total = 0
    let data = JSON.parse(localStorage.getItem("e_cart"))
    data.products = []
    data.total = 0
    localStorage.setItem("e_cart", JSON.stringify(data)) 
}
  },
 
});

// export const getcart = (state)=>state
// export const getcartToken = (state)=>state.token
export const { addToCart,updateCart,updatePayment,clearCart} = cartSlice.actions;

export const addTOCartFun = (dispatch,cartItem,cartState,addtoCart=addToCart)=>{
    let add = true
    cartState.forEach(item => {
        if (item.id === cartItem.id && 
            item.name === cartItem.name && 
            item.type === cartItem.type ){
                add = false
        }
    });
    if (add){
         dispatch(addtoCart(cartItem))
         return true  
    }
    return false
}

export const addComas = (input) => {

    const mutate = (array, result = []) => {
        if (array.length < 3) {
            if (array.length > 0) {
                result.push(array)
            }

            return result
        }

        const LastThree = array.slice(-3, )
        result.push(LastThree)
        const lastIndex = array.length - 3
        const remaining = array.slice(0, lastIndex)
        mutate(remaining, result)
        return result
    }

    let result = ""
    const [first, second] = input.toString().split(".")
    const firstNum = mutate(first)
    const firstHalf = firstNum.reverse().join(",")

    if (second == undefined) {
        result = firstHalf
    } else {
        result = `${firstHalf}.${second}`
    }
    return result

}

export default cartSlice.reducer;
