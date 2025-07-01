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
    <section style={{ width: '100%', height: '100vh', background: '#000', position: 'relative' }}>
      {/* Logo i nagłówek */}
      <div className="absolute top-0 left-0 right-0 px-4 pt-6 pb-3 z-40 bg-black/80">
        <div className="flex items-center mb-2">
          <img src="/images/logo.svg" alt="Logo" className="h-8 w-auto mr-3" />
          <h1 className="text-white text-2xl sm:text-4xl font-bold">Model 3D</h1>
        </div>
        <div className="h-0.5 w-full bg-white rounded-full" />
      </div>

      {/* Model Viewer */}
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
        camera-orbit="0deg 75deg 4m"
        min-camera-orbit="auto 15deg auto"
        max-camera-orbit="auto 90deg auto"
      ></model-viewer>
    </section>
  )
}

// ⬇️ Dodaj na dole pliku (poza komponentem)
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string
        'ios-src'?: string
        alt?: string
        'auto-rotate'?: boolean
        'camera-controls'?: boolean
        ar?: boolean
        'ar-modes'?: string
        'shadow-intensity'?: string
        exposure?: string
        'environment-image'?: string
        'camera-orbit'?: string
        'min-camera-orbit'?: string
        'max-camera-orbit'?: string
        style?: React.CSSProperties
      }
    }
  }
}

export {}
