import { territoryApi } from "../../api/territoryApi"


export const getAllParroquiasByCantonId= async (cantonId)=>{
    try{

        const resp = await territoryApi.get(`/parroquias?cantonId=${cantonId}`)
        return resp.data

    }catch(error){
        return null;
        throw new Error(error.message)
    }
}