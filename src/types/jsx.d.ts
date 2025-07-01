import 'react'

declare module 'react' {
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
