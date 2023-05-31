import React from 'react'
import { useGetArticleQuery } from '../../features/api/apiSlice'
import { useParams } from 'react-router-dom'
import Article from './article'
import { useSelector } from 'react-redux'
import Loading from '../loading'

const ViewArticle = () => {
    const {id} =useParams()
    const user = useSelector(state => state.user)
    const{data} = useGetArticleQuery({id,token:user.usertoken})
    
  return (
    <div id='lesson'>
    {data?<Article article={data.article} sections={data.sections} />:<Loading/>}
    </div>
  )
}

export default ViewArticle
