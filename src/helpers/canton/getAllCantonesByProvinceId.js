import { territoryApi } from "../../api/territoryApi"


export const getAllCantonesByProvinceId= async (provinciaId)=>{
    try{

        const resp = await territoryApi.get(`/cantones?provinciaId=${provinciaId}`)
        return resp.data

    }catch(error){
        return null;
        throw new Error(error.message)
    }
}