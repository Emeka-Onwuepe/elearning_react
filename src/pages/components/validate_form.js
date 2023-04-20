import React from 'react'
import { useLoginMutation } from '../../features/api/apiSlice'

const ValidateForm = async({request}) => {
    const _data = await request.formData()
    const data = {
      data: {
        email : _data.get("email"),
        password : _data.get("password")
      }
    }

    // const {data:red} = useLoginMutation(data)
    // console.log(red)
    // console.log(data)
    // const [login] = useLoginMutation()
    // const getdata = (e)=>{
    //   e.preventDefault()
    //   login(data)
    // }

  return (
    <div >
      
    </div>
  )
}

export default ValidateForm
