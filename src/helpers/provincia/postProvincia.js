import { territoryApi } from "../../api/territoryApi"

export const postProvincia= async (provincia)=>{
    try{

        const resp = await territoryApi.post(`/provincias`,provincia)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}