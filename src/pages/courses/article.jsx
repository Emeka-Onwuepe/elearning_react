import React from 'react'

const Article = ({article,sections}) => {
  return (
    <div className="articleBox">
    <h2 className="center">{article.title}</h2>
    

  <article className="article">

  {article.audio?<audio src=""></audio>: "" }
      
      {article.image?
      <div className="imgcontainer">
          <figure className="">
              <img src={article.image} alt={article.image_description} />
              <figcaption><em>Image Source: {article.image_source}</em></figcaption>
          </figure>
      </div>
     :""
      }


      <section>
          {article.sub_heading?
          <h3 className="">{article.sub_heading}</h3>
          :""
        } 
        <div dangerouslySetInnerHTML={{__html:article.body_text}}>
        </div>
        
      </section>

      
      
      {sections?
        sections.map(section=>(
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

export default Article
