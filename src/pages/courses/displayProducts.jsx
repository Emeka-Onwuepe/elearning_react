import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addComas, addTOCartFun} from '../../features/cart/cartSlice'
import { addAlert } from '../../features/alert/alertSlice'

const DisplayProducts = ({products}) => {
    
    const dispatch = useDispatch()
    const cartState = useSelector(state=>state.cart.products)
    
    const [display, setdisplay] = useState(false)
    const [selected, setselected] = useState([])

    const displayCourses =(e)=>{
      const [c_index,index] = e.target.id.split('-')
      const selected = products[c_index].course_sets[index].course_set_unit
      setselected(selected)
      setdisplay(true)
    }
  
    const closeCourse = () =>{
      setselected([])
      setdisplay(false)
    }

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
    <>
    <div className='products flex_container'>
      {products.map((cat,c_index)=>(

        <div  className='product_category' key={`${c_index}div`}>
        <h2 className='category_name' key={c_index}>{cat.category}</h2>
        <div className='category flex_container'>

        <div className=''>
        {cat.singles.map((single,index)=>(
            <div className='flex_item' key={index}>
               <img src={single.display_image} alt="img"  />
                <p>{single.name}</p>
                <p>{addComas(single.price)}</p>
                <p>course</p>
                <button id={`${c_index}-singles-${index}`} 
                 onClick={addtoCart}>Add to cart</button>
            </div>
        ))}
        </div>

       <div className='courses '>
       {cat.course_sets.map((course_set,index)=>(
       
            <div className='flex_item course_set_item' key={index}>
              <img src={course_set.display_image} alt="img"  />
                <p>{course_set.name}</p>
                <p>{addComas(course_set.price)}</p>
                <p>course_set</p>
                <button key='button' onClick={displayCourses} id={`${c_index}-${index}`}>View courses</button>
                <button id={`${c_index}-course_sets-${index}`} 
                onClick={addtoCart}>Add to cart</button>
            </div>
            
        ))}
       </div>

       </div>

        </div>
      ))}
    </div>

    {selected && display?
    <div className='flex_container popup'>
       <button onClick={closeCourse} className='close_set'>close</button>
    {selected.map((item,index)=>(
    
         <div className='flex_item' key={index}>
         
           <img src={item.course.display_image} alt="img"  />
             <p>{item.course.name}</p>
             <p>{addComas(item.course.price)}</p>
             <p>course</p>
         </div>
         
     ))}
    </div>
    :""}

    </>
  )
}

export default DisplayProducts
