import { useSelector } from "react-redux"
import { useDeletePurchaseMutation, useGetPurchasesQuery } from "../../features/api/apiSlice"
import { addComas } from "../../features/cart/cartSlice"

const PurchaseHistory = () => {
    const user = useSelector(state => state.user)
    const token = user.usertoken
    const {data,isError,isLoading,error} = useGetPurchasesQuery(token)

    const [deletePurchase] =  useDeletePurchaseMutation()

    const deleteOrder = (e) =>{
      const id = e.target.id
      deletePurchase({id,token})
    }
   
 

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
      {data?
        <div className="flex_container" id='purchase_history'>
        {data.map((item,index)=>(
            <div className="flex_item" key={index}>
                <p><span>Order Id:</span>   {item.purchase_id}</p>
                <p><span>Total:</span>  {addComas(item.total)}</p>
                <p><span>Date:</span>  {item.date}</p>

                <div className="flex_container" >

                {item.course_sets.length > 0?<div className="flex_item">
                  <p><span>Type:</span> Course sets</p>
                  {item.course_sets.map((item,index)=>(
                    <p key={index}>{item.name}</p>
                 ))}
                </div>:""}

                {item.courses.length > 0?<div className="flex_item">
                  <p><span>Type:</span>Courses</p>
                  {item.courses.map((item,index)=>(
                    <p key={index}>{item.name}</p>
                 ))}
                </div>:""}

                </div>

                <p><span>Status:</span>  {item.paid?"paid":"not paid"}</p>
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
