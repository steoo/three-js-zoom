import React, {Component} from 'react'
import * as THREE from "three"
import {
  Scene, PerspectiveCamera,
  WebGLRenderer,
  FontLoader,
  TextGeometry,
  // MeshPhongMaterial,
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
    // camera.position.set(0, 0, 1200)
    camera.position.set(0, 0, 1500)
    // camera.lookAt(new THREE.Vector3(0, 0, 0))
    console.log(camera)
    
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
    
    // const controls = new OrbitControls(camera)
    // controls.target.set(0, 0, 0)
    // controls.update()
    
    const cameraControls = new CameraControls(camera, renderer.domElement, {
      keepMousedownListener: false,
      keepContextmenuListener: false,
      disableTouchRotation: true,
      disableThreeFingerTouchTruck: true,
      disableTwoFingerTouchTruck: true
    })
    
    cameraControls.maxDistance = 1500
    
    const loader = new FontLoader()
    
    let backYearMesh = null
    let anotherMesh = null
    
    loader.load('resources/fonts/helvetiker_regular.typeface.json', function (font) {
      
      const hello = new TextGeometry('Hello three.js!', {
        font: font,
        size: 80,
        height: 0,
        curveSegments: 20
      })
      
      hello.center()
      
      let material = new MeshBasicMaterial({color: 0xff0000, transparent: true})
      let material1 = new MeshBasicMaterial({color: 0xff0000, transparent: true})
      let material2 = new MeshBasicMaterial({color: 0xff0000, transparent: true})
      
      const helloMesh = new Mesh(hello, material)
      
      helloMesh.position.set(0, 0, 1000)
      
      const back = new TextGeometry('Back Year', {
        font: font,
        size: 50,
        height: 0,
        curveSegments: 8
      })
      
      back.center()
      
      backYearMesh = new Mesh(back, material1)
      
      backYearMesh.position.set(0, 0, 500)
      
      const another = new TextGeometry('another mesh', {
        font: font,
        size: 50,
        height: 0,
        curveSegments: 8
      })
      
      another.center()
      
      anotherMesh = new Mesh(another, material2)
      
      anotherMesh.position.set(0, 0, 0)
      
      backYearMesh.material.opacity = 0
      anotherMesh.material.opacity = 0
      
      scene.add(anotherMesh)
      scene.add(backYearMesh)
      scene.add(helloMesh)
      
    })
    // const ambientLight = new THREE.AmbientLight(0xffffff)
    // scene.add(ambientLight)
    
    const clock = new THREE.Clock()
    
    
    render()
    
    const delta = 600
    let nearBackMesh = false
    
    function render() {
      const clockDelta = clock.getDelta()
      requestAnimationFrame(render)
      cameraControls.update(clockDelta)
      renderer.render(scene, camera)
      
      if (backYearMesh) {
        const camZ = camera.position.z - delta
        const diff = camZ < backYearMesh.position.z
        if (diff) {
          // const newOpacity = Math.floor(Math.abs(camZ - backYearMesh.position.z)) * 0.008
          const newOpacity = Math.abs(camZ - backYearMesh.position.z) / 400
          // console.log("near backyearmesh", Math.floor(Math.abs(camZ - backYearMesh.position.z)) * 0.001)
          console.log("near backyearmesh", camZ - backYearMesh.position.z, newOpacity)
          backYearMesh.material.opacity = newOpacity
          // nearBackMesh = true
        } else {
          backYearMesh.material.opacity = 0
        }
      }
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
