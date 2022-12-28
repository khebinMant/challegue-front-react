import { territoryApi } from "../../api/territoryApi"

export const postCanton= async (canton)=>{
    try{

        const resp = await territoryApi.post(`/cantones`,canton)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}