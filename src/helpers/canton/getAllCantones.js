import { territoryApi } from "../../api/territoryApi"


export const getAllCantones= async ()=>{
    try{

        const resp = await territoryApi.get(`/cantones`)
        return resp.data

    }catch(error){
        return null;
        throw new Error(error.message)
    }
}