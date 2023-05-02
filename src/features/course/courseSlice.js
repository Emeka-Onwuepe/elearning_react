import { createSlice } from '@reduxjs/toolkit';

const initialData = {
	course: {
		id: 0,
		name: "",
		course_week: [
			{
				id: 1,
				name: "",
				order: 0,
				course_unit: []
			}
		]
	},

	units: [
		{
			id: 0,
			order: 0,
			material: {
				id: 0,
				material_type: "video",
				video: 0,
				article: null,
				quiz: null
			}
		},
	],

	materials: [
		{
			id: 0,
			material_type: "video",
			video: {
				id: 0,
				name: "",
				file: ""
			},
			article: null,
			quiz: null
		},
		
	],
    mapper: []
}


let courseData = JSON.parse(localStorage.getItem("e_course"))
if(!courseData){
  localStorage.setItem("e_course", JSON.stringify(initialData))
  courseData = initialData
}

const initialState = {
 course: courseData.course,
 units: courseData.units,
 materials: courseData.materials,
 mapper: courseData.mapper
}


export const courseSlice = createSlice({
  name: 'course',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addCourse: (state,action) => {
        for (const key in action.payload) {
           state[key] = action.payload[key]
        }
        localStorage.setItem("e_course", JSON.stringify(action.payload))
    },
  },
 
});

export const getLesson = (state,type,id)=>{
const lesson = state.course.materials.filter(item=> item.material_type == type && item[item.material_type].id == id )
if(lesson.length > 0){
    return lesson[0][type]
}
return null
}

export const getNextLesson = (state,week,type,id)=>{
    let mapper = state.course.mapper
    let keyWord = `${week}-${id}-${type}`
    let index = mapper.indexOf(keyWord) 
    let nextWeek,nextId, nextType,nextlesson
    if(index>-1){
       
        try {
             nextlesson = mapper[index+1] 
             
        } catch (error) {
            
        }
        if(nextlesson){
            [nextWeek,nextId,nextType] = nextlesson.split('-')
            return [nextWeek,nextId, nextType,]
        }
    }

    return []
}

// export const getcourseToken = (state)=>state.token
export const { addCourse} = courseSlice.actions;

export default courseSlice.reducer;
