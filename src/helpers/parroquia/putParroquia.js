import { territoryApi } from "../../api/territoryApi"

export const putParroquia= async (parroquia)=>{
    try{

        const resp = await territoryApi.put(`/parroquias/${parroquia.id}`,parroquia)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}