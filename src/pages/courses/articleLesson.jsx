import { useGetMaterialQuery, useGetSectionsQuery } from "../../features/api/apiSlice"
import '../../css/article.css'
import Article from "./article"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addAlert } from "../../features/alert/alertSlice"

const ArticleLesson = ({data,token}) => {
 
  const dispatch = useDispatch()
  const {data:sections,error,isError} = useGetSectionsQuery({token,id:data.id})

  const [skip, setSkip] = useState(true)
  const [finalData, setFinalData] = useState(data)
  const {data:article}  = useGetMaterialQuery({id:data.id,token,type:"article"},{skip})


  useEffect(() => {
    if (article) {
      setFinalData(article.data)
    }
  
  }, [article])


  const imageError = (e)=>{
    if(window.navigator.onLine) setSkip(false)
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

  return (
    <>
    <img src={data.test_image} onError={imageError}  style={{display:"none"}} alt="" />
    <Article article={finalData} sections={sections?sections.sections:''} />
    </>
   
  )
}

export default ArticleLesson
