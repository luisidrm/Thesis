import '../style/NavBar.css'
import Options from './Options'

export default function NavBar({handleMostrar}) {
  return (
    <div className="navbar">
      <h1 className='titulo'>Geoportal de Bebras</h1>
      <div className='derecha'>
      <Options
        handleMostrar = {handleMostrar}
      />
      </div>
    </div>
  )
}