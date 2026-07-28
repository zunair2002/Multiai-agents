import { searchtool } from './config/tavily.js'

export const searchagent = async(state)=>{
    try {
        const result = await searchtool.invoke({
            query:state.prompt
        })
        console.log('search result agent:',result)
        return {
            ...state,
            searchresults:result,
        }
    } catch (error) {
        return {
            ...state,
            searchresults:[],
        }
        console.log(error)
    }
}
