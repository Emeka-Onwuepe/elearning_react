import { useGetSectionsQuery } from "../../features/api/apiSlice"
import '../../css/article.css'
import Article from "./article"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { addAlert } from "../../features/alert/alertSlice"

const ArticleLesson = ({data,token}) => {
 
  const dispatch = useDispatch()
  const {data:sections,error,isError} = useGetSectionsQuery({token,id:data.id})

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
   <Article article={data} sections={sections?sections.sections:''} />
  )
}

export default ArticleLesson
