import { territoryApi } from "../../api/territoryApi"

export const deleteProvincia= async (provinciaId)=>{
    try{

        const resp = await territoryApi.delete(`/provincias/${provinciaId}`)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}