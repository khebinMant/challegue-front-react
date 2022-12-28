import { territoryApi } from "../../api/territoryApi"

export const postParroquia= async (parroquia)=>{
    try{

        const resp = await territoryApi.post(`/parroquias`,parroquia)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}