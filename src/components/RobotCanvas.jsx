import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default function RobotCanvas() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loaderLog, setLoaderLog] = useState('Initializing WebGL Subsystem...')

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    let width = containerRef.current.clientWidth
    let height = containerRef.current.clientHeight

    // 1. Scene Setup
    const scene = new THREE.Scene()
    // Deep spatial dark background matching the landing page theme
    scene.background = null // Transparent so it sits elegantly over CSS grid animations!

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0, 8)

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.0

    // 4. Group for centering & model manipulation
    const modelGroup = new THREE.Group()
    scene.add(modelGroup)

    // 5. Lighting Setup (Premium clean studio lighting matching minimal website aesthetics)
    // Soft ambient fill light (warm slate) to keep the cute ghost bright and soft
    const ambientLight = new THREE.AmbientLight('#f1f5f9', 2.4)
    scene.add(ambientLight)

    // Dominant clean white key light (top-left) for beautiful highlights
    const keyLight = new THREE.DirectionalLight('#ffffff', 4.5)
    keyLight.position.set(-4, 6, 5)
    scene.add(keyLight)

    // Balanced soft fill light (top-right)
    const fillLight = new THREE.DirectionalLight('#e2e8f0', 2.8)
    fillLight.position.set(4, 5, 3)
    scene.add(fillLight)

    // Subtle warm rim light from behind to separate the shape from the white background
    const rimLight = new THREE.DirectionalLight('#fffbeb', 2.2)
    rimLight.position.set(0, -1, -5)
    scene.add(rimLight)

    // Dynamic mouse-following soft white spotlight that casts interactive highlights
    const cursorLight = new THREE.PointLight('#ffffff', 10, 15)
    cursorLight.position.set(0, 0, 3)
    scene.add(cursorLight)

    // 5.5. Soft Levitating Drop Shadow Plane
    const shadowCanvas = document.createElement('canvas')
    shadowCanvas.width = 128
    shadowCanvas.height = 128
    const shadowCtx = shadowCanvas.getContext('2d')
    const shadowGrad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64)
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.42)') // Soft dark center
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)')    // Fades out completely
    shadowCtx.fillStyle = shadowGrad
    shadowCtx.fillRect(0, 0, 128, 128)
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas)

    const shadowPlaneGeo = new THREE.PlaneGeometry(2.5, 2.5)
    const shadowPlaneMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.5,
      depthWrite: false
    })
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat)
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.set(0, -2.25, 0) // Position directly below the floating group
    scene.add(shadowPlane)

    // 6. Interactive Mouse & Drag Tracker
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    const drag = { isDragging: false, prevX: 0, prevY: 0, rotX: 0, rotY: 0 }

    const handlePointerDown = (event) => {
      drag.isDragging = true
      drag.prevX = event.clientX
      drag.prevY = event.clientY
      drag.rotY = modelGroup.rotation.y
      drag.rotX = modelGroup.rotation.x
      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing'
      }
    }

    const handlePointerMove = (event) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        mouse.targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1
        mouse.targetY = -((event.clientY - rect.top) / rect.height) * 2 + 1
      }

      if (drag.isDragging) {
        const deltaX = event.clientX - drag.prevX
        const deltaY = event.clientY - drag.prevY

        drag.rotY += deltaX * 0.007
        drag.rotX += deltaY * 0.007

        // Clamp vertical pitch to prevent flipping upside down
        drag.rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, drag.rotX))

        drag.prevX = event.clientX
        drag.prevY = event.clientY
      }
    }

    const handlePointerUp = () => {
      if (drag.isDragging) {
        drag.isDragging = false
        if (containerRef.current) {
          containerRef.current.style.cursor = 'grab'
        }
      }
    }

    containerRef.current.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    // 7. GLTF Loader
    const loader = new GLTFLoader()
    let mixer = null
    let loadedModel = null
    let headBone = null

    // Logging helper to display fun terminal progress logs
    const updateLog = (percent) => {
      if (percent < 25) {
        setLoaderLog('Downloading 3D geometry assets...')
      } else if (percent < 60) {
        setLoaderLog('Unpacking textures and binary matrices...')
      } else if (percent < 90) {
        setLoaderLog('Compiling physical PBR shaders & materials...')
      } else {
        setLoaderLog('Calibrating lights and orbital camera...')
      }
    }

    loader.load(
      '/models/cute.glb',
      (gltf) => {
        loadedModel = gltf.scene

        // Traverse through meshes and enhance materials for a glowing premium finish
        loadedModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            
            // If the material has textures, make sure they render perfectly
            if (child.material) {
              child.material.roughness = Math.min(child.material.roughness || 0.4, 0.6)
              child.material.metalness = Math.max(child.material.metalness || 0.5, 0.8)
              
              // Enable nice environment reflections if emissive colors are present
              if (child.material.emissive) {
                child.material.emissiveIntensity = 2.0
              }
            }
          }
        })

        // Compute Bounding Box to center and scale the model dynamically & responsively
        const box = new THREE.Box3().setFromObject(loadedModel)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())

        // Reset local position so that center of bounding box is at group origin (0, 0, 0)
        loadedModel.position.x -= center.x
        loadedModel.position.y -= center.y
        loadedModel.position.z -= center.z

        // Traverse to find the first bone or group whose name contains 'head' or 'neck'
        loadedModel.traverse((child) => {
          const name = child.name.toLowerCase()
          if (!headBone && (child.isBone || child.isMesh || child.isGroup)) {
            if (name.includes('head') || name.includes('neck') || name.includes('face')) {
              headBone = child
              console.log('Successfully targeted bone for eye-tracking:', child.name)
            }
          }
        })

        // Shift model down slightly to center it nicely
        loadedModel.position.y -= size.y * 0.05

        // Scale model to fit beautifully in the viewport
        const targetHeight = 4.8
        const scaleFactor = targetHeight / size.y
        modelGroup.scale.setScalar(scaleFactor)

        // Add to our interactive rotation group
        modelGroup.add(loadedModel)

        // Set up animations if the GLB file has skeletal animations included
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(loadedModel)
          // Play the first animation (often an idle pose)
          const action = mixer.clipAction(gltf.animations[0])
          action.play()
        }

        setLoading(false)
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100)
          setProgress(percent)
          updateLog(percent)
        } else {
          // Fallback if content-length is missing
          setProgress((prev) => Math.min(prev + 2, 99))
        }
      },
      (error) => {
        console.error('Error loading 3D robot model:', error)
        setLoaderLog('ERROR: Failed to load 3D subsystem.')
      }
    )

    // 8. Animation & Render Loop
    const clock = new THREE.Clock()

    const animate = () => {
      const delta = clock.getDelta()
      const elapsedTime = clock.getElapsedTime()

      // Update animation mixer (skeletal motion)
      if (mixer) {
        mixer.update(delta)
      }

      // Smoothly interpolate (lerp) mouse movement coordinates for lag trails
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      // Rotate model dynamically to turn/follow the cursor or drag
      if (modelGroup) {
        if (drag.isDragging) {
          // Direct drag-to-spin
          modelGroup.rotation.y = drag.rotY
          modelGroup.rotation.x = drag.rotX
        } else {
          // When NOT dragging, smoothly blend/lerp back to the mouse-watching pose!
          // Adding a base rotation offset of 2.4 radians so it faces forward-left by default (resting normal)
          const targetRotY = 4.4 + mouse.x * 0.32
          const targetRotX = -mouse.y * 0.12

          // Slowly lerp the drag accumulators back to follow targets so there are no visual jumps when letting go
          drag.rotY += (targetRotY - drag.rotY) * 0.06
          drag.rotX += (targetRotX - drag.rotX) * 0.06

          modelGroup.rotation.y = drag.rotY
          modelGroup.rotation.x = drag.rotX
        }

        // Premium floating/levitating effect (only when NOT dragging to make manual rotation extremely precise!)
        const bob = drag.isDragging ? 0 : Math.sin(elapsedTime * 1.5)
        modelGroup.position.y += ((bob * 0.12) - modelGroup.position.y) * 0.05

        // Levitating contact drop shadow animation
        if (shadowPlane) {
          const shadowBob = drag.isDragging ? 0 : bob
          shadowPlane.material.opacity = 0.5 - shadowBob * 0.08
          const shadowScale = 1.0 + shadowBob * 0.06
          shadowPlane.scale.set(shadowScale, shadowScale, 1)
        }
      }

      // Dynamic mouse spotlight follows the normalized screen mouse position
      cursorLight.position.x = mouse.x * 4
      cursorLight.position.y = mouse.y * 4

      // Render
      renderer.render(scene, camera)
    }

    renderer.setAnimationLoop(animate)

    // 9. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return
      width = containerRef.current.clientWidth
      height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    const resizeObserver = new ResizeObserver(() => handleResize())
    resizeObserver.observe(containerRef.current)

    // 10. Clean Up on Unmount (Memory Leak Prevention)
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('pointerdown', handlePointerDown)
      }
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      resizeObserver.disconnect()
      renderer.setAnimationLoop(null)

      // Dispose geometries & materials recursively
      scene.traverse((object) => {
        if (!object.isMesh) return

        object.geometry.dispose()

        if (object.material.isMaterial) {
          cleanMaterial(object.material)
        } else {
          for (const material of object.material) {
            cleanMaterial(material)
          }
        }
      })

      renderer.dispose()
    }

    function cleanMaterial(material) {
      material.dispose()
      // Dispose textures
      for (const key of Object.keys(material)) {
        const value = material[key]
        if (value && typeof value.dispose === 'function') {
          value.dispose()
        }
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full flex items-center justify-center cursor-grab pointer-events-auto"
      style={{ minHeight: '400px', touchAction: 'none' }}
    >
      {/* 3D WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block"
        style={{ outline: 'none' }}
      />

      {/* Cyber Loader HUD (Visible while progress < 100) */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]/85 backdrop-blur-md rounded-[32px] border border-blue-500/10 p-6 z-20">
          <div className="w-[85%] max-w-[320px] font-mono text-[10px] text-blue-400">
            {/* Sci-Fi Terminal Header */}
            <div className="flex justify-between border-b border-blue-500/20 pb-2 mb-4">
              <span>[ SYSTEM_CORE_INFERENCE ]</span>
              <span className="animate-pulse text-cyan-400">ONLINE</span>
            </div>

            {/* Glowing Percentage */}
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xs tracking-widest text-white font-bold">LOADING NEURAL MODEL</span>
              <span className="text-xl font-bold text-cyan-400 font-sans">{progress}%</span>
            </div>

            {/* Pulsing Progress Bar */}
            <div className="w-full h-1.5 bg-blue-950/50 rounded-full border border-blue-500/20 overflow-hidden mb-4 relative">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 rounded-full transition-all duration-300 shadow-[0_0_12px_#00f0ff]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Dynamic Console Logs */}
            <div className="h-6 text-[9px] text-gray-400 overflow-hidden flex items-center gap-1.5 border-t border-blue-500/10 pt-2 font-mono">
              <span className="text-cyan-500">&gt;</span>
              <span className="tracking-wide animate-pulse">{loaderLog}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
