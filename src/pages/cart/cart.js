import { useDispatch, useSelector } from "react-redux"
import { addComas, clearCart, updateCart } from "../../features/cart/cartSlice"
import { useProcessPurchaseMutation } from "../../features/api/apiSlice"
import { useEffect, useState } from "react"
import { addAlert } from "../../features/alert/alertSlice"
import { Link, Navigate } from "react-router-dom"
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


    const dispatch = useDispatch()
    const [processPurchase,{isLoading,isError,data,error}]= useProcessPurchaseMutation()

    const [sucess, setsucess] = useState(false)

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
        res.unwrap().then(res=>{
          dispatch(clearCart())
          dispatch(addAlert({
            status_code: 200,
            message: 'Purchased Successfully'
          }))

            setsucess(true)

      })
        .catch(err=>{console.log(err)})
    };
  
    const onClose = () => {
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
        let res = {data :{created:false}}

        if (navigator.onLine){
        res = await processPurchase({data,token:user.usertoken})
      }else{
        dispatch(addAlert({
          status_code: 100,
          message: "You are offline"
        }))
      }
    if (res.data.created){
        initializePayment(onSuccess, onClose)
        
    }
    }

    if(!user.logedin){
        return  <Navigate to={'/login'} />
       }
      
     if(sucess){
        return  <Navigate to={'/userpage'} />
       }
  return (
    <div>
      <div className="flex_container">
      <p className="flex_item">Total: <span>&#8358;</span> {addComas(cart.total)}</p>

      <div className="flex_item remove_bg ">
     
      <button  onClick={checkOut}>Checkout</button>
      </div>
      {/* <div className="remove_bg">
     
      </div> */}
        
      </div>
       
        <div className="flex_container">
        {cart.products.map((item,index)=>(
            <div className="flex_item" key={index}>
              <img src={item.image} alt="img"  />
                <p>{item.name}</p>
                <p>{addComas(item.price)}</p>
                <p>{item.type}</p>
                <button className="removeItem" id={`${item.category_id}-${item.type}-${item.id}`} 
                onClick={removeItem}>Remove Item</button>
            </div>
        ))}
        </div>
        <button className="purchaseHistory center">
        <Link to={'/purchasehistory'}>View Purchase History</Link>
      </button>
     
    </div>
  )
}

export default Cart
