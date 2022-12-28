import { territoryApi } from "../../api/territoryApi"

export const deleteParroquia= async (parroquiaId)=>{
    try{

        const resp = await territoryApi.delete(`/parroquias/${parroquiaId}`)
        return resp.data

    }catch(error){
        throw new Error(error.message)
    }
}