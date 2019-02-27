import React, {Component} from 'react'
import * as THREE from "three"
import {
  Scene, PerspectiveCamera,
  WebGLRenderer,
  FontLoader,
  TextGeometry,
  MeshPhongMaterial,
  MeshBasicMaterial,
  Mesh
} from "three"
// import OrbitControls from "./three/OrbitControls"
// import BetterOrbitControls from "./three/BetterOrbitControls"
// import FirstPersonControls from "./three/FirstPersonControls"
import CameraControls from "camera-controls"

CameraControls.install({THREE: THREE})

class App extends Component {
  
  componentDidMount() {
    
    const scene = new Scene()
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
    camera.position.set(0, 0, 1200)
    
    // const controls = new OrbitControls(camera)
    // const controls = new BetterOrbitControls(camera)
    // controls.target.set(0, 0, 0)
    // controls.update()
    
    
    // const fpcontrols = new FirstPersonControls(camera)
    // fpcontrols.lookSpeed = 0.0125
    // fpcontrols.movementSpeed = 500
    // fpcontrols.noFly = false
    // fpcontrols.lookVertical = true
    // fpcontrols.lookAt(scene.position)
    
    
    // renderer.setSize(window.innerWidth, window.innerHeight)
    
    const canvas = document.querySelector("#canvas__render")
    const desiredWidthInCSSPixels = window.innerWidth
    const desiredHeightInCSSPixels = window.innerHeight
    // set the display size of the canvas.
    canvas.style.width = desiredWidthInCSSPixels + "px"
    canvas.style.height = desiredHeightInCSSPixels + "px"
    
    // set the size of the drawingBuffer
    const devicePixelRatio = window.devicePixelRatio || 1
    canvas.width = desiredWidthInCSSPixels * devicePixelRatio
    canvas.height = desiredHeightInCSSPixels * devicePixelRatio
    
    const renderer = new WebGLRenderer({alpha: true, antialias: true, canvas})
    renderer.setClearColor(0xfffff0, 1)
    document.body.appendChild(canvas)
    
    const cameraControls = new CameraControls(camera, renderer.domElement, {
      keepMousedownListener: false,
      keepContextmenuListener: false,
      disableTouchRotation: true,
      disableThreeFingerTouchTruck: true,
      disableTwoFingerTouchTruck: true,
    })
    
    cameraControls.maxDistance = 1200
    
    const loader = new FontLoader()
    
    loader.load('/resources/fonts/helvetiker_regular.typeface.json', function (font) {
      
      const hello = new TextGeometry('Hello three.js!', {
        font: font,
        size: 80,
        height: 0,
        curveSegments: 20
      })
      
      hello.center()
      
      // const material = new MeshPhongMaterial({color: 0xff0000, transparent: true})
      const material = new MeshBasicMaterial({color: 0xff0000, transparent: false})
      // material.map.minFilter = THREE.LinearFilter;
      
      const helloMesh = new Mesh(hello, material)
      
      helloMesh.position.set(0, 0, 500)
      
      const back = new TextGeometry('Back Year', {
        font: font,
        size: 50,
        height: 0,
        curveSegments: 8
      })
      
      back.center()
      
      const backMesh = new Mesh(back, material)
      
      backMesh.position.set(0, 0, 0)
      
      scene.add(helloMesh)
      scene.add(backMesh)
      
    })
    // const ambientLight = new THREE.AmbientLight(0xffffff)
    // scene.add(ambientLight)
    
    const clock = new THREE.Clock()
    
    render()
    
    function render() {
      const delta = clock.getDelta()
      requestAnimationFrame(render)
      renderer.render(scene, camera)
      cameraControls.update(delta)
      // controls.update();
      // fpcontrols.update(delta)
    }
    
  }
  
  onMouseMove = () => {
  
  }
  
  render() {
    return (
      <canvas id={"canvas__render"}/>
    )
  }
}

export default App
