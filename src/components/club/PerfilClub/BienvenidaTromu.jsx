import React from 'react'
import "./bienvenidaTromu.css"

export function BienvenidaTromu() {
  return (
    <div className="contenedorbienvenida">
    <div className="bienvenida">
        <div className='row'>
        <div className='col-1'>
        <img src="/src/assets/img/icon.png" alt="" />
        </div>
        <div className='col-10'>
      <h1>¡Bienvenido a Tromü!</h1>
      </div>
      <div className='col-1'>
      <img id='ubb' src="/src/assets/img/ubb.png" alt="" />
      </div>
      </div>
      <div className='row'>
      <h2>Ligas de Baloncesto</h2>
      </div>
    </div>
    </div>
  )
}