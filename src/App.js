import logo from './logo.svg';
import './App.css';
import { Canvas } from "@react-three/fiber";
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment, OrbitControls } from "@react-three/drei";
import {Suspense, useRef,useState} from 'react';
import replaceColor from 'replace-color/src/replace-color';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { SketchPicker } from 'react-color';



function Model(...props) {
  console.log(props[0])
  const group = useRef()
  const gltf = useLoader(GLTFLoader, "./suzanne.gltf");
  console.log(gltf)
  const colorMap = useLoader(TextureLoader, props[0].source)
  const colorMap2 = useLoader(TextureLoader, './suzanne_2.png')
  colorMap.flipY=false
  colorMap2.flipY=false
  console.log(props[0].nouvelle_texture)

  
 


  return (
    <>
      <group ref={group} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={gltf.nodes.Suzanne.geometry}
        >
          {props[0].texture !== null ?
          <meshStandardMaterial color={colorMap2}
          />
          :
          <meshStandardMaterial map={colorMap}/>
          }
          
        </mesh>
      </group>
    </>
  )
}



function App() {
  
  const [nouvelle_texture, setTexture] = useState(null)


  const changeImageColor = () => {
    
    replaceColor({
      image: './suzanne.png',
      colors: {
        type: 'hex',
        targetColor: '#FFFFFF',
        replaceColor: '#32A852'
      }
    }, (err, jimpObject) => {
      console.log(jimpObject)
      setTexture(jimpObject)
    })
  }
  const source="./suzanne.png"

  

  
  

  
  return (
    <div className="App">
      <Canvas style={{width:'100%', height:'600px'}}>
        <Suspense fallback={null}>
          <Model source={source} texture={nouvelle_texture}  />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
      
      <button onClick={changeImageColor} >Changer couleur</button>
      <img style={{height:'300px'}} src={source}/>

     
 
    </div>
  );
}

export default App;
