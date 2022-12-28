import { territoryApi } from "../../api/territoryApi"

export const putCanton= async (canton)=>{
    try{

        const resp = await territoryApi.put(`/cantones/${canton.id}`,canton)
        return resp.data

    }catch(error){
        return null;
        throw new Error(error.message)
    }
}