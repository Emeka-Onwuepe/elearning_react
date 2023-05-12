import { useSelector } from "react-redux"
import { useGetPurchasesQuery } from "../../features/api/apiSlice"

const PurchaseHistory = () => {
    const token = useSelector(state => state.user.usertoken)
    const{data,isError,isLoading,error} = useGetPurchasesQuery(token)

    console.log(data)
  return (
    <div>
      <p>Hello</p>
    </div>
  )
}

export default PurchaseHistory
