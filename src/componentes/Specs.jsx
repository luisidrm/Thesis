import { useEffect, useState } from 'react'
import '../style/specs.css'

export default function Specs(props){
  // const [data, setData] = useState([])

  // useEffect(()=>{
  //   const fetchData = async() =>{
  //     const response = await fetch('http://api.example.com/specs')
  //     const result = await response.json()
  //     setData(result)
  //   }
  //   fetchData()
  // },[])


  return(
    <div className={props.specs ? 'card': 'hiddenCard'}>
      <div className='cabecera'>
        <h2>Emitir Reportes de:</h2>
      </div>
      <form>
        <select className='select' name="" id="" onChange={(e)=>props.setSelect(e.target.value)}>
          <option value="2024">Bebras 2024</option>
          <option value="2023">Bebras 2023</option>
          <option value="2022">Bebras 2022</option>
        </select>
        <select className='select' name="" id="" onChange={(e)=>props.setSelectParticipantes(e.target.value)}>
          <option value="Participantes">Participantes</option>
          <option value="Medallistas">Medallistas</option>
        </select>
        <button type='button' className='btn-submit' onClick={props.handleSpecs}>Ajustar</button>
      </form>
    </div>
  )
}