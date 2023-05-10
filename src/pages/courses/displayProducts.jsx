import React from 'react'

const DisplayProducts = ({products}) => {
  return (
    <div>
      {products.map((cat,index)=>(
        <div key={`${index}div`}>
        <h2 key={index}>{cat.category}</h2>
        {cat.singles.map((single,index)=>(
            <div key={index}>
                <p>{single.name}</p>
                <p>{single.price}</p>
                <p>course</p>
                <button>add to cart</button>
            </div>
        ))}

    {cat.course_sets.map((course_set,index)=>(
            <div key={index}>
                <p>{course_set.name}</p>
                <p>{course_set.price}</p>
                <p>course_set</p>
                <button>add to cart</button>
            </div>
        ))}

        </div>
      ))}
    </div>
  )
}

export default DisplayProducts
