import { territoryApi } from "../../api/territoryApi"

export const deleteCanton= async (cantonId)=>{
    try{

        const resp = await territoryApi.delete(`/cantones/${cantonId}`)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}