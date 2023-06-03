import { useSelector } from "react-redux"
import { useGetquizscoreQuery, useQuizViewQuery, useUpdateScoreMutation } from "../../features/api/apiSlice"
import { useState } from "react"

const Quiz = ({data,course_id}) => {
  const {user} = useSelector(state=>state)

  const initial = {course_id, quiz_id:data.id, quiz_score_id:null, score:100}

  const{data:quizScore} = useGetquizscoreQuery({token:user.usertoken,quiz_id:data.id,course_id,})

console.log('quizscore',quizScore)
  const [quizData, setQuizData] = useState(initial)

  const{data:quiz} = useQuizViewQuery({id:data.id,token:user.usertoken})
  const [updateScore,{data:updated}] = useUpdateScoreMutation()



  console.log(updated)
  const submit=()=>{
    updateScore({token:user.usertoken,data:quizData})
  }

  return (
    <div>
      {/* {console.log(data)} */}
      {/* {console.log(quiz)} */}
      <button onClick={submit}>Submit</button>
    </div>
  )
}

export default Quiz
