import { Link, Navigate, useParams } from "react-router-dom"
import { useGetcategoryQuery } from "../../features/api/apiSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addAlert } from "../../features/alert/alertSlice"
import { addComas, addTOCartFun } from "../../features/cart/cartSlice"

const Category = () => {
    const{id,category} = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
   const {data:recieved,isLoading,isError,error} =  useGetcategoryQuery({
                                                                    id,name:category,
                                                                    token:user.usertoken,
                                                                })

    

    const [data, setData] = useState(null)

   

    useEffect(() => {
        if(recieved){
            setData(recieved)
    
        }
    }, [recieved])

    const onfilter = (e)=>{
        let value = e.target.value.toLowerCase()
        if(value){
            let course_sets = data.course_sets.filter(item => item.name.toLowerCase().indexOf(value)>-1)
            let courses = data.courses.filter(item => item.name.toLowerCase().indexOf(value)>-1)
            setData({course_sets,courses})
        }else{
            setData(recieved)
        }
    }

    const cartState = useSelector(state=>state.cart.products)
    
    const [display, setdisplay] = useState(false)
    const [selected, setselected] = useState([])

    const [exclude, setExclude] = useState({courses:false,course_sets:false})

    const onChange = (e) => {
        setExclude({ ...exclude, [e.target.name]: e.target.checked })
    }

    const displayCourses =(e)=>{
    const index = e.target.id
    const selected = data.course_sets[index].course_set_unit
    setselected(selected)
    setdisplay(true)
    }

    const closeCourse = () =>{
    setselected([])
    setdisplay(false)
    }

   const addtoCart = (e)=>{
    let [type,index] = e.target.id.split('-')
    let product = data[type][index]
    let productType =  type ==='courses' ? "course" :'course set'
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


   useEffect(() => {
    
    if(isError){
     const errorData = {
       status_code: error.status,
       message: error.data.detail
     }
     for (let key in error.data){
      errorData.message = error.data[key]
     }
     dispatch(addAlert(errorData))
   }
 }, [isError])


 if(!user.logedin){
    return  <Navigate to={'/login'} />
   }

  return (
    <div>
        {data? 
        <>
      <h2 className="center">{category}</h2>

      <div className="filterDiv" >
        <p className="center">Filter</p>
        <div className="flex_container">
        <div>
        <label htmlFor="searchTitle">Search By Title</label>
        <input onChange={onfilter} type="text" name="searchTitle" id="searchTitle"/>
        </div>
        <div>
        <p>Exclude</p>

         <div className="flex_container_inner">
          <div>
            <label htmlFor="courses">Courses</label>
            <input onChange={onChange} type="checkbox" name="courses" id="courses" />
        </div>
        <div>
        <label htmlFor="course_sets">Course Sets</label>
        <input  onChange={onChange}  type="checkbox" name="course_sets" id="course_sets" />
        </div>
        
        </div>
        </div>
        
        </div>
      </div>


    

      <div className='category flex_container'>

      {!exclude.courses? 
      <div className=''>
        {data.courses.map((single,index)=>(
        
           
            <div className='flex_item' key={index}>
               <img src={single.display_image} alt="img"  />
                <p>{single.name}</p>
                <p>{addComas(single.price)}</p>
                <p>course</p>
                <button id={`courses-${index}`} 
                 onClick={addtoCart}>Add to cart</button>
            </div>
        ))}
        </div>
        :""} 



    {!exclude.course_sets? 
       <div className='courses '>
       {data.course_sets.map((course_set,index)=>(
        
            <div className='flex_item course_set_item' key={index}>
              <img src={course_set.display_image} alt="img"  />
                <p>{course_set.name}</p>
                
                <p>{addComas(course_set.price)}</p>

                <div className="flex_container_inner no_margin">
                <p className='course-type'>course_set</p>
                <button className="viewCourses" key='button' onClick={displayCourses} id={index}>View courses</button>
                </div>

                <button id={`course_sets-${index}`} 
                onClick={addtoCart}>Add to cart</button>
            </div>
              
        ))}
       </div>

        :""} 
       </div>

    </>
    :""}

    {selected && display?
    <div className="pop_container">  

    <div className='flex_container popup'>
       <button onClick={closeCourse} className='close_set'>Close</button>
    {selected.map((item,index)=>(
    
         <div className='flex_item' key={index}>
         
           <img src={item.course.display_image} alt="img"  />
             <p>{item.course.name}</p>
             <p>{addComas(item.course.price)}</p>
             <p>course</p>
         </div>
         
     ))}
    </div>
    </div>
    :""}
    
    </div>

  )
}

export default Category




