import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useAnimations,
  useGLTF,
} from '@react-three/drei'
import * as THREE from 'three'

function Bedroom() {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      Math.sin(state.clock.elapsedTime * 0.18) * 0.025,
      1.2,
      delta,
    )
  })

  return (
    <group ref={group}>
      {/* Room shell */}
      <mesh position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[9, 0.16, 8]} />
        <meshStandardMaterial color="#6d5547" roughness={0.82} />
      </mesh>
      <mesh position={[0, 2.55, -4]} receiveShadow>
        <boxGeometry args={[9, 5.2, 0.16]} />
        <meshStandardMaterial color="#b9a99b" roughness={0.95} />
      </mesh>
      <mesh position={[-4.5, 2.55, 0]} receiveShadow>
        <boxGeometry args={[0.16, 5.2, 8]} />
        <meshStandardMaterial color="#a99585" roughness={0.95} />
      </mesh>
      <mesh position={[4.5, 2.55, 0]} receiveShadow>
        <boxGeometry args={[0.16, 5.2, 8]} />
        <meshStandardMaterial color="#a99585" roughness={0.95} />
      </mesh>
      <mesh position={[0, 5.15, 0]} receiveShadow>
        <boxGeometry args={[9, 0.16, 8]} />
        <meshStandardMaterial color="#d1c4b6" roughness={0.95} />
      </mesh>

      {/* Window and curtains */}
      <mesh position={[-2.65, 2.85, -3.88]}>
        <boxGeometry args={[2.5, 2.05, 0.08]} />
        <meshStandardMaterial color="#253a50" emissive="#41688a" emissiveIntensity={0.55} />
      </mesh>
      <mesh position={[-2.65, 2.85, -3.81]}>
        <boxGeometry args={[0.055, 2.05, 0.06]} />
        <meshStandardMaterial color="#d5c7b8" />
      </mesh>
      <mesh position={[-2.65, 2.85, -3.8]}>
        <boxGeometry args={[2.5, 0.055, 0.06]} />
        <meshStandardMaterial color="#d5c7b8" />
      </mesh>
      <mesh position={[-4.0, 2.8, -3.72]}>
        <boxGeometry args={[0.45, 2.55, 0.12]} />
        <meshStandardMaterial color="#725b59" roughness={0.9} />
      </mesh>
      <mesh position={[-1.3, 2.8, -3.72]}>
        <boxGeometry args={[0.45, 2.55, 0.12]} />
        <meshStandardMaterial color="#725b59" roughness={0.9} />
      </mesh>

      {/* Bed frame, mattress, pillows and blanket */}
      <mesh position={[1.55, 0.42, -1.25]} castShadow receiveShadow>
        <boxGeometry args={[3.35, 0.55, 4.15]} />
        <meshStandardMaterial color="#49352e" roughness={0.75} />
      </mesh>
      <mesh position={[1.55, 0.78, -1.25]} castShadow receiveShadow>
        <boxGeometry args={[3.25, 0.3, 4.05]} />
        <meshStandardMaterial color="#ded6ca" roughness={0.96} />
      </mesh>
      <mesh position={[1.55, 1.02, -2.68]} castShadow>
        <boxGeometry args={[1.25, 0.22, 0.72]} />
        <meshStandardMaterial color="#eee8df" roughness={1} />
      </mesh>
      <mesh position={[2.82, 1.02, -2.68]} castShadow>
        <boxGeometry args={[1.25, 0.22, 0.72]} />
        <meshStandardMaterial color="#eee8df" roughness={1} />
      </mesh>
      <mesh position={[1.55, 0.99, -0.65]} castShadow>
        <boxGeometry args={[3.18, 0.22, 2.5]} />
        <meshStandardMaterial color="#53677b" roughness={0.96} />
      </mesh>
      <mesh position={[1.55, 0.72, -3.35]} castShadow>
        <boxGeometry args={[3.5, 1.45, 0.18]} />
        <meshStandardMaterial color="#4b382f" roughness={0.8} />
      </mesh>

      {/* Bedside table and warm lamp */}
      <mesh position={[-0.72, 0.55, -2.45]} castShadow>
        <boxGeometry args={[1.05, 1.1, 0.9]} />
        <meshStandardMaterial color="#624638" roughness={0.65} />
      </mesh>
      <mesh position={[-0.72, 1.18, -2.45]} castShadow>
        <cylinderGeometry args={[0.23, 0.3, 0.48, 24]} />
        <meshStandardMaterial color="#d7c5a7" roughness={0.8} />
      </mesh>
      <pointLight position={[-0.72, 1.55, -2.45]} color="#ffbd78" intensity={18} distance={5} />

      {/* Study desk, books and chair */}
      <mesh position={[-2.85, 1.05, 0.15]} castShadow>
        <boxGeometry args={[2.35, 0.14, 1.1]} />
        <meshStandardMaterial color="#654936" roughness={0.7} />
      </mesh>
      {[-3.82, -1.88].map((x) => (
        <mesh key={x} position={[x, 0.52, 0.15]} castShadow>
          <boxGeometry args={[0.12, 1.0, 0.12]} />
          <meshStandardMaterial color="#49362b" />
        </mesh>
      ))}
      <mesh position={[-2.85, 1.28, 0.12]} castShadow>
        <boxGeometry args={[0.82, 0.035, 0.56]} />
        <meshStandardMaterial color="#222b34" metalness={0.25} roughness={0.45} />
      </mesh>
      <mesh position={[-2.85, 1.3, 0.12]} castShadow>
        <boxGeometry args={[0.74, 0.018, 0.48]} />
        <meshStandardMaterial color="#45627b" emissive="#172b3c" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-2.7, 1.19, -0.45]} rotation={[0, 0, -0.08]} castShadow>
        <boxGeometry args={[0.5, 0.08, 0.72]} />
        <meshStandardMaterial color="#9a6d45" roughness={0.9} />
      </mesh>
      <mesh position={[-2.85, 0.55, 1.15]} castShadow>
        <boxGeometry args={[1.15, 0.12, 1.0]} />
        <meshStandardMaterial color="#4b3830" />
      </mesh>
      <mesh position={[-2.85, 0.95, 1.58]} castShadow>
        <boxGeometry args={[1.15, 0.9, 0.12]} />
        <meshStandardMaterial color="#4b3830" />
      </mesh>

      {/* Rug */}
      <mesh position={[0.0, 0.015, 1.55]} receiveShadow>
        <boxGeometry args={[4.5, 0.035, 2.5]} />
        <meshStandardMaterial color="#8c7564" roughness={1} />
      </mesh>
    </group>
  )
}

function TeenCharacter() {
  const root = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/teen-character-rigged.glb')
  const { actions, names } = useAnimations(animations, root)
  const model = useMemo(() => scene, [scene])

  useLayoutEffect(() => {
    if (!root.current) return
    const bounds = new THREE.Box3().setFromObject(model)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    bounds.getSize(size)
    bounds.getCenter(center)
    const height = Math.max(size.y, 0.001)
    const scale = 1.72 / height
    root.current.scale.setScalar(scale)
    model.position.set(-center.x, -bounds.min.y, -center.z)
  }, [model])

  useEffect(() => {
    const idle = actions['Idle'] ?? actions[names[0]]
    if (!idle) return
    idle.reset().fadeIn(0.6).play()
    return () => {
      idle.fadeOut(0.3)
    }
  }, [actions, names])

  return (
    <group ref={root} position={[0.8, 0.02, 0.15]}>
      <primitive object={model} />
    </group>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#171b25']} />
      <fog attach="fog" args={['#171b25', 10, 22]} />
      <PerspectiveCamera makeDefault position={[7.8, 5.2, 9.8]} fov={38} />
      <ambientLight intensity={0.65} />
      <hemisphereLight args={['#dce8ff', '#5c4034', 1.0]} />
      <directionalLight
        position={[-4, 8, 5]}
        intensity={2.2}
        color="#ffe0b8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight position={[-3.2, 4.5, -2.7]} angle={0.48} penumbra={0.8} intensity={35} color="#8bbcff" />
      <Bedroom />
      <Suspense fallback={null}>
        <TeenCharacter />
        <Environment preset="apartment" />
      </Suspense>
      <ContactShadows position={[0, 0.025, 0]} opacity={0.42} scale={12} blur={2.4} far={5} />
      <OrbitControls
        makeDefault
        target={[0, 1.15, -0.25]}
        minDistance={6}
        maxDistance={17}
        maxPolarAngle={Math.PI / 2.03}
      />
    </>
  )
}

export default function App() {
  const canvasHost = useRef<HTMLDivElement>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingError, setRecordingError] = useState('')
  const [videoUrl, setVideoUrl] = useState('')

  useEffect(() => {
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl)
    }
  }, [videoUrl])

  const recordFiveSeconds = async () => {
    setRecordingError('')
    setVideoUrl('')
    const canvas = canvasHost.current?.querySelector('canvas')
    if (!canvas) {
      setRecordingError('The 3D scene is not ready yet. Please wait a moment and try again.')
      return
    }
    if (typeof MediaRecorder === 'undefined' || !canvas.captureStream) {
      setRecordingError('This browser does not support canvas video recording.')
      return
    }

    const mimeType = [
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
    ].find((type) => MediaRecorder.isTypeSupported(type))

    if (!mimeType) {
      setRecordingError('WebM recording is not supported by this browser.')
      return
    }

    const stream = canvas.captureStream(30)
    const chunks: BlobPart[] = []
    let recorder: MediaRecorder

    try {
      recorder = new MediaRecorder(stream, { mimeType })
    } catch {
      stream.getTracks().forEach((track) => track.stop())
      setRecordingError('Could not start the video recorder in this browser.')
      return
    }

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data)
    }
    recorder.onerror = () => {
      setRecordingError('Recording failed. Please try again.')
      setIsRecording(false)
      stream.getTracks().forEach((track) => track.stop())
    }
    recorder.onstop = () => {
      stream.getTracks().forEach((track) => track.stop())
      if (chunks.length) {
        const blob = new Blob(chunks, { type: mimeType })
        setVideoUrl(URL.createObjectURL(blob))
      } else {
        setRecordingError('The recording was empty. Please try again.')
      }
      setIsRecording(false)
    }

    recorder.start()
    setIsRecording(true)
    window.setTimeout(() => {
      if (recorder.state !== 'inactive') recorder.stop()
    }, 5000)
  }

  return (
    <main
      style={{
        width: '100%',
        height: '100dvh',
        minHeight: 520,
        overflow: 'hidden',
        position: 'relative',
        background: '#10131b',
        color: '#f4eee7',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <div ref={canvasHost} style={{ position: 'absolute', inset: 0 }}>
        <Canvas shadows dpr={[1, 1.75]} gl={{ antialias: true, preserveDrawingBuffer: true }}>
          <Scene />
        </Canvas>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          right: 18,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 12,
          pointerEvents: 'none',
        }}
      >
        <div style={{ textShadow: '0 2px 12px #000' }}>
          <div style={{ fontSize: 11, letterSpacing: 3, opacity: 0.72 }}>CINEMATIC 3D</div>
          <div style={{ fontSize: 20, fontWeight: 650, marginTop: 5 }}>A Quiet Evening</div>
          <div style={{ fontSize: 12, opacity: 0.72, marginTop: 4 }}>Bedroom scene · Rigged character</div>
        </div>
        <div style={{ fontSize: 11, opacity: 0.72, textAlign: 'right', textShadow: '0 2px 8px #000' }}>
          DRAG TO ORBIT
          <br />
          SCROLL TO ZOOM
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 16,
          right: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <button
          onClick={recordFiveSeconds}
          disabled={isRecording}
          style={{
            border: '1px solid rgba(255,255,255,.28)',
            borderRadius: 999,
            padding: '13px 23px',
            background: isRecording ? '#704b45' : 'rgba(20,24,32,.88)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            boxShadow: '0 8px 28px rgba(0,0,0,.35)',
            cursor: isRecording ? 'default' : 'pointer',
          }}
        >
          {isRecording ? 'Recording 5 seconds…' : 'Record 5 Seconds'}
        </button>
        {recordingError && (
          <div
            role="alert"
            style={{
              maxWidth: 320,
              borderRadius: 8,
              padding: '8px 12px',
              color: '#fff',
              background: '#8f3535',
              fontSize: 13,
              textAlign: 'center',
            }}
          >
            {recordingError}
          </div>
        )}
        {videoUrl && (
          <a
            href={videoUrl}
            download="cinematic-bedroom.webm"
            style={{
              color: '#fff',
              background: '#344e43',
              borderRadius: 999,
              padding: '10px 18px',
              fontSize: 13,
              textDecoration: 'none',
            }}
          >
            Download 5-second video
          </a>
        )}
      </div>
    </main>
  )
}

useGLTF.preload('/teen-character-rigged.glb')
