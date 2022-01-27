import logo from './logo.svg';
import './App.css';
import { Canvas } from "@react-three/fiber";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Environment, OrbitControls } from "@react-three/drei";
import {Suspense, useRef,useState, useEffect} from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SketchPicker } from 'react-color';

import {createCanvas} from 'canvas'


function Model(...props) {
  console.log(props[0])
  const group = useRef()
  const gltf = useLoader(GLTFLoader, "./suzanne.gltf", loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-gltf/');
    loader.setDRACOLoader(dracoLoader);
  });

  const colorMap = useLoader(TextureLoader, props[0].texture)

  colorMap.flipY=false




  console.log(gltf)
 


  return (
    <>
      <group  ref={group} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={gltf.nodes.Suzanne.geometry}
        >
        
        <meshStandardMaterial map={colorMap} normalMap={colorMap}/>
        
          
          
        </mesh>
      </group>
    </>
  )
}



function App() {
  
  let new_image;
  const [texture, setTexture] = useState('./suzanne.png')

  const canvasRef = useRef(null)

  const hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }


  const replaceColor = (imageData,old_color, new_color) => {
    /* Conversion des couleurs hex en RGB */
    const old_rgb = hexToRgb(old_color)
    const old_r = old_rgb.r
    const old_g = old_rgb.g
    const old_b = old_rgb.b

    const new_rgb = hexToRgb(new_color)
    const new_r = new_rgb.r
    const new_g = new_rgb.g
    const new_b = new_rgb.b

    var i ;
    const err = 0.01 ;
    for (i=0; i< imageData.data.length; i +=4) {
      if ( old_r*(1-err) <= imageData.data[i] && old_r*(1+err) >=imageData.data[i] && old_g*(1-err) <= imageData.data[i+1] && old_g*(1+err) >=imageData.data[i+1] && old_b*(1-err) <= imageData.data[i+2] && old_b*(1+err) >=imageData.data[i+2] ) {
        imageData.data[i] = new_r;
        imageData.data[i + 1] = new_g;
        imageData.data[i + 2] = new_b;
        imageData.data[i + 3] = 255;
      }
    }
  }
 
  const draw = ctx => {

    var img = new Image()
    img.onload= function () {
      ctx.drawImage(img, 0, 0, img.width, img.height)
      var imageData = ctx.getImageData(0,0,img.width,img.height)
      replaceColor(imageData,'#ff0f62', '#f1c598')
      ctx.putImageData(imageData, 0, 0);
      new_image = canvasRef.current.toDataURL("image/png") 
      setTexture(new_image)
    }
    img.src='./suzanne.png'
    
  }


  useEffect(() => {

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    //Our draw come here
    draw(context)
  }, [draw])

  
  return (
    <div className="App">
      <canvas ref={canvasRef} width={'1000px'} height={'1000px'} />
      <Canvas style={{width:'100%', height:'600px'}}>
        <Suspense fallback={null}>
          <Model texture={texture} />
          <OrbitControls autoRotate/>
          <Environment preset="dawn" background />
        </Suspense>
      </Canvas>
  
      <img style={{height:'300px'}} src={'./suzanne.png'}/>

      
     
 
    </div>
  );
}

export default App;
