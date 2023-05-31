import { useGetSectionsQuery } from "../../features/api/apiSlice"
import '../../css/article.css'
import Article from "./article"

const ArticleLesson = ({data,token}) => {
 
  const {data:sections} = useGetSectionsQuery({token,id:data.id})

  return (
   <Article article={data} sections={sections.sections} />
  )
}

export default ArticleLesson
