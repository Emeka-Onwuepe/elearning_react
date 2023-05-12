import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addComas, addTOCartFun} from '../../features/cart/cartSlice'
import { addAlert } from '../../features/alert/alertSlice'

const DisplayProducts = ({products}) => {

    const dispatch = useDispatch()
    const cartState = useSelector(state=>state.cart.products)
  

    const addtoCart = (e)=>{
        let [category,type,index] = e.target.id.split('-')
        let product = products[category][type][index]
        let productType =  type ==='singles' ? "course" :type
        let cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            type:productType,
            category:product.category.name,
            category_id : product.category.id,
            image: product.display_image,
        }
        // console.log(product)
        // dispatch(addToCart(cartItem))
       const success =  addTOCartFun(dispatch,cartItem,cartState)
       if(success){
        dispatch(addAlert({
            status_code: 200,
            message: `${productType} added successfully`
        }))
       }else{
        dispatch(addAlert({
            status_code: 100,
            message: `${productType} already added`
        }))
       }
    }
  return (
    <div>
      {products.map((cat,c_index)=>(
        <div key={`${c_index}div`}>
        <h2 key={c_index}>{cat.category}</h2>
        {cat.singles.map((single,index)=>(
            <div key={index}>
                <p>{single.name}</p>
                <p>{addComas(single.price)}</p>
                <p>course</p>
                <button id={`${c_index}-singles-${index}`} 
                 onClick={addtoCart}>add to cart</button>
            </div>
        ))}

        {cat.course_sets.map((course_set,index)=>(
            <div key={index}>
                <p>{course_set.name}</p>
                <p>{addComas(course_set.price)}</p>
                <p>course_set</p>
                <button id={`${c_index}-course_sets-${index}`} 
                onClick={addtoCart}>add to cart</button>
            </div>
        ))}

        </div>
      ))}
    </div>
  )
}

export default DisplayProducts
