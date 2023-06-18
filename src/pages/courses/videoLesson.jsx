import { useEffect, useState } from "react"
import { useGetMaterialQuery } from "../../features/api/apiSlice"
import { Navigate } from "react-router-dom"

const VideoLesson = ({data,token,nextLink}) => {
 
  const [skip, setSkip] = useState(true)
  const [ended, setEnded] = useState(false)
  const [finalData, setFinalData] = useState(data)
  const {data:video,isError,error}  = useGetMaterialQuery({id:data.id,token,type:"video"},{skip})

 
  const onMediaError = (e) =>{
    const error = e.nativeEvent.srcElement.error

    if(error.code === 4 && window.navigator.onLine) {
      setSkip(false)}

  }

  useEffect(() => {
    if (video) {
      setFinalData(video.data)
    }
  
  }, [video])


  const onEnded = () =>{
    setEnded(true)
    
    // console.log(e)

  }
  if(nextLink && ended){
    return <Navigate to={nextLink} />
  }
  return (
    <div className="center" style={{marginTop:'-20px'}}>
       <h3 className="center" style={{padding:'5px'}} >{finalData.name}</h3>
      <video className="video_lesson"  onEnded={onEnded} 
      onError={onMediaError} src={finalData.file} autoPlay controls  ></video>
      {/* <img src={data.file} onError={onMediaError} alt="testing" width='100px' height='auto' /> */}
      
    </div>
  )
}

export default VideoLesson


// onError={({ currentTarget }) => {
//   currentTarget.onerror = null; // prevents looping
//   currentTarget.src="image_path_here";
// }}