
const VideoLesson = ({data}) => {
 

  
  const onMediaError = (e) =>{
    const err = e
    console.log(err)
    // console.log(e)

  }

  return (
    <div>
      {/* <video src="" ></video> */}
      {/* <img src={data.file} onError={onMediaError} alt="testing" width='100px' height='auto' /> */}
    </div>
  )
}

export default VideoLesson


// onError={({ currentTarget }) => {
//   currentTarget.onerror = null; // prevents looping
//   currentTarget.src="image_path_here";
// }}