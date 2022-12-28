import { territoryApi } from "../../api/territoryApi"


export const getAllParroquias= async ()=>{
    try{

        const resp = await territoryApi.get(`/parroquias`)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}