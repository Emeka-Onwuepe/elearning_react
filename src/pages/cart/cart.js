import { useDispatch, useSelector } from "react-redux"
import { addComas, updateCart } from "../../features/cart/cartSlice"
import { useProcessPurchaseMutation } from "../../features/api/apiSlice"
import { useEffect, useState } from "react"
import { addAlert } from "../../features/alert/alertSlice"
import { Navigate } from "react-router-dom"
import { usePaystackPayment } from "react-paystack"

const Cart = () => {
    const cart = useSelector(state=>state.cart)
    const user = useSelector(state=>state.user)
    const public_key = useSelector(state=>state.course.public_key)

    // const [purchase_id, setpurchase_id] = useState('')
   
    const date = Date.now().toString().slice(5)
    const day = new Date()
    const year = day.getFullYear()
    const random = Math.floor(Math.random() * 100)
    const purchase_id = `DL${year}${random}${date}`
    console.log('ran',purchase_id)

    const dispatch = useDispatch()
    const [processPurchase,{isLoading,isError,data,error}]= useProcessPurchaseMutation()


    useEffect(() => {
    
        if(isError){
         // const errrorData = {
         //   status_code: error.status,
         //   message: error.data.detail
         // }
         const errorData = {
           status_code: error.status,
           message: ''
         }
   
         for (let key in error.data){
          errorData.message = error.data[key]
         }
         dispatch(addAlert(errorData))
       }
     }, [isError])

    const config = {
        reference: purchase_id,
        email: user.email,
        amount: cart.total * 100, 
        publicKey: public_key,
        currency: 'NGN',
    };
    const initializePayment = usePaystackPayment(config)
    
    // you can call this function anything
    const onSuccess = (reference) => {
        const data = {purchase_id:reference.reference,action:'confirm'}
        const res = processPurchase({data,token:user.usertoken})
        res.unwrap().then(res=>console.log(res))
        .catch(err=>console.log(err))
      // Implementation for whatever you want to do with reference and after success call.
     
    };
  
    // you can call this function anything
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      console.log('closed')
    }

    const removeItem = (e)=>{
        let [cat_id,type,id] = e.target.id.split('-')
        let cartItem = [...cart.products]

        cart.products.forEach((item,index) => {
            
           if (item.id == id &&
                item.category_id == cat_id && item.type == type ){
                   
                    let [deleted] = cartItem.splice(index,index+1)
                    let updatedTotal = cart.total - deleted.price
                    dispatch(updateCart({
                        products: cartItem,
                        total: updatedTotal
                    }))


                  
                }
        });
    }

    const checkOut = async ()=>{
      
        const total = cart.total
        const items = cart.products
       
        
        const data = {purchase_id,total,items,action:'create'}
        const res = await processPurchase({data,token:user.usertoken})
    if(res.data.created){
         initializePayment(onSuccess, onClose)
    }

    }

    if(!user.logedin){
        return  <Navigate to={'/login'} />
       }

  return (
    <div>
        <p>{addComas(cart.total)}</p>
        <button onClick={checkOut}>Checkout</button>
       {cart.products.map((item,index)=>(
            <div key={index}>
                <p>{item.name}</p>
                <p>{addComas(item.price)}</p>
                <p>{item.type}</p>
                <button id={`${item.category_id}-${item.type}-${item.id}`} 
                onClick={removeItem}>Remove Item</button>
            </div>
        ))}
    </div>
  )
}

export default Cart
