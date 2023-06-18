import React from 'react'

const Article = ({article,sections}) => {
  return (
    <div className="articleBox">
    <h2 className="center">{article.title}</h2>
    {console.log(article)}
  <article className="article">
      
      {article.image?
      <div className="imgcontainer">
          <figure className="">
            {console.log(article)}
              <img src={article.image} alt={article.image_description} />
              <figcaption><em>Image Source: {article.image_source}</em></figcaption>
          </figure>
      </div>
     :""
      }

   {article.audio?<audio src={article.audio} controls></audio>: "" }

      <section>
          {article.sub_heading?
          <h3 className="">{article.sub_heading}</h3>
          :""
        } 
        {article.body_text?
        <div dangerouslySetInnerHTML={{__html:article.body_text.replace(/<p>&nbsp;<\/p>/g,'')}}>
        </div>:""}
        
      </section>

      
      
      {sections?
        sections.map(section=>(
          <section key={section.id}>

{ section.sub_heading? <h3>{section.sub_heading}</h3> : ""}

          { section.Sub_section_image?
          <figure style={{marginBottom: "10px"}} className="">
              <img src={section.Sub_section_image} alt={section.image_description} />
              <figcaption><em>Image Source: {section.image_source}</em></figcaption>
          </figure>
          :""
        } 

      {section.audio?<audio src={section.audio} controls></audio>: "" }
          
          { section.body_text? <div dangerouslySetInnerHTML={{__html:section.body_text.replace(/<p>&nbsp;<\/p>/g,'')}}>
            </div> :""}
      </section>
        ))
        : ""
     }

</article>

    
  </div>
  )
}

export default Article
