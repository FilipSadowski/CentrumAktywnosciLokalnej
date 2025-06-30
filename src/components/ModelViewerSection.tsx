'use client'

import { useEffect } from 'react'

interface ModelViewerSectionProps {
  modelSrc?: string
  iosSrc?: string
  alt?: string
}

export default function ModelViewerSection({
  modelSrc = '/model.gltf',
  iosSrc = '/model.usdz',
  alt = '3D model preview',
}: ModelViewerSectionProps) {
  useEffect(() => {
    const alreadyLoaded = document.querySelector('script[src*="model-viewer"]')
    if (!alreadyLoaded) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js'
      document.head.appendChild(script)
    }
  }, [])

  return (
    <section style={{ width: '100%', height: '100vh', background: '#000' }}>
      <model-viewer
        src={modelSrc}
        ios-src={iosSrc}
        alt={alt}
        auto-rotate
        camera-controls
        ar
        ar-modes="scene-viewer quick-look webxr"
        style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
        shadow-intensity="1"
        exposure="1"
        environment-image="neutral"
        camera-orbit="0deg 75deg 4 m"
        min-camera-orbit="auto 15deg auto"
        max-camera-orbit="auto 90deg auto"
      ></model-viewer>
    </section>
  )
}
