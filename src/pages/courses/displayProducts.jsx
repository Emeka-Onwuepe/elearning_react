import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { addComas, addTOCartFun} from '../../features/cart/cartSlice'
import { addAlert } from '../../features/alert/alertSlice'
import { Link } from 'react-router-dom'

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
        let productType =  type ==='singles' ? "course" :'course set'
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
        <h2 className='category_name' key={c_index}>
          <Link to={`/category/${cat.category_id}/${cat.category}`}>{cat.category}</Link></h2>
        <div className='category flex_container'>

        
        {cat.singles.map((single,index)=>(
            <div className='flex_item' key={index}>
               <img src={single.display_image} alt="img"  />
                <p>{single.name}</p>
                <p><span className='shiftNairaR'>&#8358;</span> {addComas(single.price)}</p>
                <p className='course-type'>course</p>
                <button id={`${c_index}-singles-${index}`} 
                 onClick={addtoCart}>Add to cart</button>
                 <p className='lesser description'>{single.description}</p>
            </div>
        ))}
        

       
       {cat.course_sets.map((course_set,index)=>(
       
            <div className='flex_item course_set_item' key={index}>
              <img src={course_set.display_image} alt="img"  />
                <p>{course_set.name}</p>
                <p><span  className='shiftNairaR'>&#8358;</span> {addComas(course_set.price)}</p>
                <div className="flex_container_inner no_margin">
                <p className='course-type'>course_set</p>
                <button className="viewCourses" key='button' onClick={displayCourses} id={`${c_index}-${index}`}>View courses</button>
              
                </div>

                <button id={`${c_index}-course_sets-${index}`} 
                onClick={addtoCart}>Add to cart</button>
                 <p  className='lesser description'>{course_set.description}</p>
            </div>
            
        ))}
       

       </div>

        </div>
      ))}
    </div>

    {selected && display?
    <div className="pop_container">

 
    <div className='flex_container popup'>
       <button onClick={closeCourse} className='close_set'>Close</button>
    {selected.map((item,index)=>(
    
         <div className='flex_item' key={index}>
         
           <img src={item.course.display_image} alt="img"  />
             <p>{item.course.name}</p>
             <p><span className='shiftNairaR'>&#8358;</span>{addComas(item.course.price)}</p>
             <p>course</p>
             <p className='lesser description'>{item.course.description}</p>
         </div>
         
     ))}
    </div>

    </div>
    :""}

    </>
  )
}

export default DisplayProducts
