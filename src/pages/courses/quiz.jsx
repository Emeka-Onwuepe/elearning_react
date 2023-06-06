import { useDispatch, useSelector } from "react-redux"
import { useGetquizscoreQuery, useQuizViewQuery, useUpdateScoreMutation } from "../../features/api/apiSlice"
import { useEffect, useState } from "react"
import { addAlert } from "../../features/alert/alertSlice"

const Quiz = ({data,course_id}) => {
  const {user} = useSelector(state=>state)
  const dispatch = useDispatch()
  const initial = {course_id, quiz_id:data.id, quiz_score_id:null, score:0,weight:0}

  const{data:quizScore,error,isError} = useGetquizscoreQuery({token:user.usertoken,quiz_id:data.id,course_id})


  const [quizData, setQuizData] = useState(initial)
  const [answers, setAnswers] = useState({})
  const [userAnswers, setUserAnswers] = useState({answered:false})
  const [quizscore, setQuizScore] = useState( { agg_score: 0, previous_agg_score: 0, current_score: 0,
                                                daily_count: 2, last_updated: "04/Jun/2023 15:34",
                                                is_today:true})

  const{data:quiz} = useQuizViewQuery({id:data.id,token:user.usertoken})
  const [updateScore,{data:updated}] = useUpdateScoreMutation()
  
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

  useEffect(() => {
    if(quizScore){
      const last_updated = new Date(quizScore.last_updated).toDateString()
      const today = new Date().toDateString()
      setQuizScore({...quizScore,is_today: last_updated === today})
    }
      if(updated){
      const last_updated = new Date(updated.last_updated).toDateString()
      const today = new Date().toDateString()
      setQuizScore({...updated,is_today: last_updated === today})
    }
 }, [updated,quizScore])


 useEffect(() => {
  const answerdata = {}
  const userAnswersInit = {}

  if(quiz){
    quiz.quiz.forEach(quiz => {
      answerdata[quiz.id] = quiz.answer.map(item=>item.id)
      userAnswersInit[quiz.id] = {selected:[],correct:1}
    });
    userAnswersInit.answered = false
    setAnswers(answerdata)
    setUserAnswers(userAnswersInit)

    let num = quiz.quiz.length
    let weight = parseInt(100/num)
    setQuizData({...quizData,weight})
  }
 
 }, [quiz])
  
  const onChange = (e)=>{
    const checked = e.target.checked
    const type = e.target.type
    const question = e.target.name
    const selected_option = parseInt(e.target.id.split("-")[0])

    if(type === 'radio'){
      setUserAnswers({...userAnswers,[question]:{...userAnswers[question],
                      selected:[selected_option]}})
    }else{
      if(checked){
        // let new 
        setUserAnswers({...userAnswers,[question]:{...userAnswers[question],
                        selected:[...userAnswers[question].selected,selected_option]}})
      }else{
        let filtered = userAnswers[question].selected.filter(item=>item !== selected_option)
        setUserAnswers({...userAnswers,[question]:{...userAnswers[question],selected:filtered}})
      }
    }
  }


  const submit=()=>{
    let userAnswerCopy = {...userAnswers}
    
    for (const key in answers) {
      if(key !== 'answered'){
        answers[key].forEach(ans=>{
          if(userAnswers[key].selected.indexOf(ans) < 0){
            userAnswerCopy[key].correct =  0
            // {...userAnswerCopy,[key]:{...userAnswerCopy[key],correct:0}}
          }
        })
  
        userAnswers[key].selected.forEach(ans=>{
          if(answers[key].indexOf(ans) < 0){
            userAnswerCopy[key].correct =  0
            // {...userAnswerCopy,[key]:{...userAnswerCopy[key],correct:0}}
          }
        })
      }

      
      
    }
    let correctAns = 0
    for (const key in userAnswerCopy ) {
      if(key !== 'answered'){
      correctAns += userAnswerCopy[key].correct 
      }
    }

    let score = quizData.weight * correctAns
    let data = {...quizData,score}
    userAnswerCopy.answered = true
    setUserAnswers(userAnswerCopy)
    updateScore({token:user.usertoken,data})
  }

  const reset = ()=>{
    let userAnswerCopy = {...userAnswers}
    
    for (const key in userAnswerCopy) {
      if(key !== 'answered'){
        userAnswerCopy[key].correct = 1
        userAnswerCopy[key].selected = []
      }else{
        userAnswerCopy[key] = false
      }
    }

    const inputs = document.querySelectorAll('input')
    
    for (const input of inputs) {
      input.checked = false
    }
    setUserAnswers(userAnswerCopy)
  }

  return (
    <div>
      <div className="scoreboard flex_container_inner">
        <p className="flex_item">Average Score: {quizscore.agg_score}%</p>
        <p className="flex_item">Score: {quizscore.current_score}%</p>
      </div>
      <h3 className="center">{data.name}</h3>
      <p className="lesser">Please note that you can only take this quiz twice a day.</p>
      {userAnswers.answered && quizscore.daily_count < 2 ?
      <button className="retake" onClick={reset}>Retake</button> :""}

      {quiz?
      <ol>
      {quiz.quiz.map((item,index)=>(
        
        <div key={index} className="questions">
         
          <li>{item.question}  {userAnswers.answered?
          userAnswers[item.id].correct === 1?
          <span className="correct lesser2">Correct</span>:
          <span className="wrong lesser2">Wrong</span>
          :""} </li>
          <div>
            {item.answer.length>1?
            <div>
              {item.options.map((opt,opt_index)=>(
                <div className="options" key={opt_index}>
                  <input type="checkbox" name={item.id} id={`${opt.id}-${index}`}  onChange={onChange}/>
                  <label htmlFor={`que_${item.id}`} >{opt.option}</label>
                </div>
                
              ))}
            </div>
              :
              <div>
                {item.options.map((opt,opt_index)=>(
                <div className="options" key={opt_index}>
                  <input type="radio"name={item.id} id={`${opt.id}-${index}`}  onChange={onChange}/>
                  <label htmlFor={`que_${item.id}`} >{opt.option}</label>
                </div>
                
              ))}
              </div>}
          </div>
          
        </div>
      ))}
      </ol>
     
      :""}
      {quizscore.is_today && quizscore.daily_count ==2 ?
      "":
      <button className="submit_quiz" onClick={submit}>Submit</button>}
    </div>
  )
}

export default Quiz
