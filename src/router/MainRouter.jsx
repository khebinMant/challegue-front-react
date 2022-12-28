import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CantonesPage } from '../pages/CantonesPage'
import { ParroquiasPage } from '../pages/ParroquiasPage'
import { ProvinciasPage } from '../pages/ProvinciasPage'

export const MainRouter = () => {
  return (
    <Routes>
        <Route path='/*' element={<ProvinciasPage/>}/>
        <Route path='/provincias' element={<ProvinciasPage/>}/>
        <Route path='/cantones/:provinciaId' element={<CantonesPage/>}/>
        <Route path='/parroquias/:cantonId' element={<ParroquiasPage/>}/>
    </Routes>
  )
}
