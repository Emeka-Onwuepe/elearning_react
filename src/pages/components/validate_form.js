import React from 'react'

const ValidateForm = async({request}) => {
    const _data = await request.formData()
    const data = {
        email : _data.get("email"),
        password : _data.get("password")
    }

console.log(data)
  return (
    <div>
      
    </div>
  )
}

export default ValidateForm
