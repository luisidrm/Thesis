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
  console.log(props.select)

  return(
    <div className={props.specs ? 'card': 'hiddenCard'}>
      <div className='cabecera'>
        <h2>Emitir Reportes de:</h2>
      </div>
      <form>
        <select className='select' name="" id="" onChange={(e)=>props.setSelect(e.target.value)}>
          <option value="asd">Bebras 2024</option>
          <option value="zxc">Bebras 2023</option>
          <option value="qwe">Bebras 2022</option>
        </select>
        <button className='btn-submit'>Ajustar</button>
      </form>
    </div>
  )
}