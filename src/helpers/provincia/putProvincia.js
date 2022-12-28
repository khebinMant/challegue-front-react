import { territoryApi } from "../../api/territoryApi"

export const putProvincia= async (provincia)=>{
    try{

        const resp = await territoryApi.put(`/provincias/${provincia.id}`,provincia)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}