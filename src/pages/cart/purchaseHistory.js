import { useSelector } from "react-redux"
import { useDeletePurchaseMutation, useGetPurchasesQuery } from "../../features/api/apiSlice"
import { addComas } from "../../features/cart/cartSlice"
import { useEffect, useState } from "react"

const PurchaseHistory = () => {
    const user = useSelector(state => state.user)
    const token = user.usertoken
    const {data,refetch,isError,isLoading,error} = useGetPurchasesQuery(token)

    const [deletePurchase] =  useDeletePurchaseMutation()
    const [finalData, setfinalData] = useState(null)

    const deleteOrder = async (e) =>{
      const id = e.target.id
      const deleted = await deletePurchase({id,token})
      let filtered = null
      if(deleted)
      filtered = finalData.filter(item=>item.id != id)
      setfinalData(filtered)
    }
   
 

    useEffect(() => {
      
      refetch()
      if(data){
        setfinalData(data)
      }
      console.log('ran')
  }, [data])

    // const [data, setdata] = useState(null)

    // useEffect(() => {
    //   if(data2){
    //     setdata(data2)
    //     console.log('data2',data2)
    //   }else if (data1) {
    //     setdata(data1)
    //     console.log('data1',data1)
    //   }
  
    
    //   }, [data1,data2])
 
    // useEffect(() => {
   
    // if(data2){
    //   console.log('data2',data2)
    //   setdata(data2)

    // }

    // }, [data2])


   

  return (
    <div>
      {finalData?
        <div className="flex_container">
        {finalData.map((item,index)=>(
            <div className="flex_item" key={index}>
                <p>{item.purchase_id}</p>
                <p>{addComas(item.total)}</p>
                <p>{item.date}</p>

                <div className="flex_container" >

                {item.course_sets.length > 0?<div className="flex_item">
                  <p>Course sets</p>
                  {item.course_sets.map((item,index)=>(
                    <p key={index}>{item.name}</p>
                 ))}
                </div>:""}

                {item.courses.length > 0?<div className="flex_item">
                  <p>Courses</p>
                  {item.courses.map((item,index)=>(
                    <p key={index}>{item.name}</p>
                 ))}
                </div>:""}

                </div>

                <p>{item.paid?"paid":"not paid"}</p>
                {item.paid? '' :<button className="removeItem" id={item.id} 
                onClick={deleteOrder}>Delete Order</button>}
                
            </div>
        ))}
        </div>

      :""}
    </div>
  )
}

export default PurchaseHistory
