import './App.css';
import React, {useState} from 'react'
import {CirclePicker} from 'react-color';
import Viewer from './Color';

function App() {
  const [background, setColor] = useState('#f36f88')
  const [background_second, setSecondColor] = useState('#f36f88')

  const handleChangeComplete = (color) => {
      setColor(color.hex)
      
  } 

  const handleSecondChangeComplete = (color) => {
    setSecondColor(color.hex)
    
} 

  return (
    <React.Fragment>
        <div className='picker'>
          <h1>Couleur 1 </h1>
            <CirclePicker 
                color={background}
                onChangeComplete={(color) => handleChangeComplete(color)}  
            />
        </div>
        <div className='picker'>
          <h1>Couleur 2 </h1>
            <CirclePicker 
                color={background_second}
                onChangeComplete={(color) => handleSecondChangeComplete(color)}  
            />
        </div>
        <div className='viewer'>
          <Viewer color_1={background} color_2={background_second}/>
        </div>
      </React.Fragment>
  )
}


export default App;
