import { territoryApi } from "../../api/territoryApi"


export const getAllProvincias= async ()=>{
    try{

        const resp = await territoryApi.get(`/provincias`)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}