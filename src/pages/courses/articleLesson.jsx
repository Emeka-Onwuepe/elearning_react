import { useGetSectionsQuery } from "../../features/api/apiSlice"
import '../../css/article.css'

const ArticleLesson = ({data,token}) => {
 
  const {data:sections} = useGetSectionsQuery({token,id:data.id})

  return (
    <div className="articleBox">
      <h2 className="center">{data.title}</h2>
      

    <article className="article">

    {data.audio?<audio src=""></audio>: "" }
        
        {data.image?
        <div className="imgcontainer">
            <figure className="">
                <img src={data.image} alt={data.image_description} />
                <figcaption><em>Image Source: {data.image_source}</em></figcaption>
            </figure>
        </div>
       :""
        }


        <section>
            {data.sub_heading?
            <h3 className="">{data.sub_heading}</h3>
            :""
          } 
          <div dangerouslySetInnerHTML={{__html:data.body_text}}>
          </div>
          
        </section>

        
        
        {sections?
          sections.sections.map(section=>(
            <section key={section.id}>

            <h3>{section.sub_heading}</h3>

            { section.Sub_section_image?
            <figure style={{marginBottom: "10px"}} className="">
                <img src={section.Sub_section_image} alt={section.image_description} />
                <figcaption><em>Image Source: {section.image_source}</em></figcaption>
            </figure>
            :""
          } 
            
            <div dangerouslySetInnerHTML={{__html:section.body_text}}>
              </div>
        </section>
          ))
          : ""
       }

</article>

      
    </div>
  )
}

export default ArticleLesson
