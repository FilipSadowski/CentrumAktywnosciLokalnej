'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info } from 'lucide-react'

const images = [
  { src: '/images/1.jpg', title: 'Plansza 1 - Orientacja i analizy', description: 'Analizy i wnioski z analiz. Graficzne przedstawienie założeń projektowych. Lokalizacja założenia. Orientacja działki w skali 1:2000.' },
  { src: '/images/2.jpg', title: 'Plansza 2 - Zagospodarowanie terenu', description: 'PZT w skali 1:500, aksonometria zespołu budynków, wizualizacja.' },
  { src: '/images/3.jpg', title: 'Plansza 3 - Strefy funkcjonalne', description: 'Szkic zagospodarowania terenu pokazujący zaprojektowany teren i powiązania z wnętrzem budynku w skali 1:250, schematy, zestawienia powierzchni, wizualizacja zagospodarowania terenu wzdłuż zewnętrznej elewacji budynku C.' },
  { src: '/images/4.jpg', title: 'Plansza 4 - Budynek A', description: 'Rzut parteru w skali 1:100, przekrój podłużny w skali 1:100, rzut tarasów w skali 1:200, rzut dachu w skali 1:200, elewacje północna i południowa w skali 1:200, zestawienie pomieszczeń budynku A, wizualizacja placu wewnętrznego na tle wejścia między budynkami A i B.' },
  { src: '/images/5.jpg', title: 'Plansza 5 - Budynek B', description: 'Rzut parteru w skali 1:100, przekrój podłużny w skali 1:100, przekrój poprzeczny w skali 1:100, rzut tarasów w skali 1:200, rzut dachu w skali 1:200, elewacje wschodnia i zachodnia w skali 1:200, schematy i spis przegród, detal architektoniczny elewacji od wewnątrz dziedzińca w skali 1:20, wizualizacja placu wewnętrznego  fragmentem elewacji wewnętrznej budynku C, ze skupieniem na kręcone schody na tle elewacji wewnętrznej budynku B.' },
  { src: '/images/6.jpg', title: 'Plansza 6 - Budynek C', description: 'Rzut parteru w skali 1:100, przekrój podłużny w skali 1:100, przekrój poprzeczny w skali 1:100, rzut tarasów w skali 1:200, rzut dachu w skali 1:200, elewacje północna i południowa w skali 1:200, zestawienie pomieszczeń budynków A, B i C, detal architektoniczny elewacji od zewnątrz założenia w skali 1:20,przedstawienie materiałów użytych na elewacjach, fragment widoku elewacji frontowej w skali 1:200.' },
  { src: '/images/7.jpg', title: 'Połączone plansze', description: 'Część graficzna została podana na 6 planszach formatu A1 w układzie pionowym. Są one zaprojektowane tak, aby tworzyły spójną całość ustawione obok siebie w odpowiedniej kolejności i zarazem miały sens kompozycyjny i merytoryczny w przypadku oglądania ich pojedynczo.' },
  { src: '/images/8.jpg', title: 'Aksonometria', description: 'Prezentacja zespołu budyków w widoku z góry - forma charakterystyczna dla architektów na studiach. W rzeczywistości nikt nie widzi budynku w taki sposób, a nawet przy chęciach zaprezentowania go z góry powinno się stosować perspektywę, aby nie zniekształcać proporcji. Aksonometria służy więc bardziej jak schemat rozwiązań, niż rzeczywiste pokazywanie wyglądu budynku w przestrzeni.' },
  { src: '/images/9.jpg', title: 'Wizualizacja najścia widokowego', description: 'Ważny widok w koncepcji zespołu budynków.' },
  { src: '/images/10.jpg', title: 'Wizualizacja dziedzińca', description: 'Serce założenia. Charakterystyczny akcent w kompozycyjnym centrum przykuwa uwagę. Sale skierowane "twarzą" do środka, przecinające się ciągi piesze oraz miejsca do spędzania wolnego czasu - tętnią życiem.' },
  { src: '/images/11.jpg', title: 'Wizualizacja elewacji', description: 'Przejście wzdłuż zewnętrznej elewacji zespołu. Podczas gdy po drugiej stronie budynku - na dziedzieńcu - toczy się zycie, deptak ten pozostaje spokojny. Zaprojektowany z myślą zapewnienia poczucia komfortu i bezpieczeństwa w tym pośrednim kontakcie z projektowaną przestrzenią.' },
]

export default function GallerySection({ setFullscreen }: { setFullscreen: (v: boolean) => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [zoomedIn, setZoomedIn] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [startFadeOut, setStartFadeOut] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const pinchZooming = useRef<boolean>(false)
  const initialPinchDistance = useRef<number | null>(null)
  const lastTap = useRef<number | null>(null)

  useEffect(() => {
    const html = document.documentElement
    const body = document.body

    if (selectedIndex !== null) {
      setFullscreen(true)
      setZoomedIn(false)
      setShowInfo(false)
      setStartFadeOut(false)

      body.style.overflow = 'hidden'
      html.style.overflow = 'hidden'
    } else {
      setFullscreen(false)
      body.style.overflow = ''
      html.style.overflow = ''
    }

    return () => {
      body.style.overflow = ''
      html.style.overflow = ''
    }
  }, [selectedIndex, setFullscreen])

  useEffect(() => {
    if (selectedIndex !== null) {
      setShowInfo(true)
      setStartFadeOut(false)

      const fadeTimer = setTimeout(() => setStartFadeOut(true), 1200)
      const hideTimer = setTimeout(() => {
        setShowInfo(false)
        setStartFadeOut(false)
      }, 2500)

      return () => {
        clearTimeout(fadeTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [selectedIndex])

  const handleClose = () => {
    setSelectedIndex(null)
    setZoomedIn(false)
    setShowInfo(false)
    setStartFadeOut(false)
    pinchZooming.current = false
    initialPinchDistance.current = null
    lastTap.current = null

    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')
    }

    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  const getDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0
    const dx = touches[0].clientX - touches[1].clientX
    const dy = touches[0].clientY - touches[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const touches = e.touches as unknown as TouchList

    if (touches.length === 1) {
      const now = Date.now()
      if (lastTap.current && now - lastTap.current < 300) {
        setZoomedIn(prev => !prev)
        lastTap.current = null
        return
      }
      lastTap.current = now
      touchStartX.current = touches[0].clientX
    } else {
      touchStartX.current = null
    }

    if (touches.length === 2) {
      pinchZooming.current = false
      initialPinchDistance.current = getDistance(touches)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touches = e.touches as unknown as TouchList

    if (touches.length === 2 && initialPinchDistance.current !== null) {
      const currentDistance = getDistance(touches)
      const zoomThreshold = 10
      if (Math.abs(currentDistance - initialPinchDistance.current) > zoomThreshold) {
        pinchZooming.current = true
      }
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (pinchZooming.current || selectedIndex === null || zoomedIn) {
      pinchZooming.current = false
      initialPinchDistance.current = null
      touchStartX.current = null
      return
    }

    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].clientX - touchStartX.current

    if (diff > 50) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
    } else if (diff < -50) {
      setSelectedIndex((selectedIndex + 1) % images.length)
    }

    touchStartX.current = null
  }

  return (
    <div className="bg-black min-h-screen">
      <div className="px-4 pt-6 pb-6">
        <div className="flex items-center mb-2">
          <img src="/images/logo.svg" alt="Logo" className="h-8 w-auto mr-3" />
          <h1 className="text-white text-2xl sm:text-4xl font-bold">Galeria Projektu</h1>
        </div>
        <div className="h-0.5 w-screen100 bg-white rounded-full" />
      </div>


      <div className="px-4 pb-8 columns-2 space-y-4 overflow-y-auto max-h-[calc(100vh-8rem)] pr-2">
        {images.map((item, i) => {
          const [loaded, setLoaded] = useState(false)
          return (
            <div
              key={i}
              className="mb-4 break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
              onClick={() => setSelectedIndex(i)}
            >
              {!loaded && (
                <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-2xl" />
              )}
              <img
                src={item.src}
                alt={`img-${i}`}
                className={`w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => setLoaded(true)}
              />
            </div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center overflow-y-auto scrollbar scrollbar-none md:scrollbar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="absolute top-3 right-4 text-white text-3xl font-bold z-50"
              onClick={handleClose}
            >
              ✕
            </button>

            <button
              className="absolute top-1 left-2 z-50 p-2 rounded-full transition hover:scale-110 active:scale-95"
              onClick={() => {
                setShowInfo(prev => !prev)
                setStartFadeOut(false)
              }}
            >
              <Info className="w-8 h-8 text-white drop-shadow-lg" />
            </button>

            <motion.img
              key={images[selectedIndex].src}
              src={images[selectedIndex].src}
              alt={`full-${selectedIndex}`}
              className="max-w-full max-h-full rounded-2xl shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                opacity: 1,
                scale: zoomedIn ? 2 : 1,
                transition: { duration: 0.3 }
              }}
              exit={{ scale: 0.9, opacity: 0 }}
            />

            <AnimatePresence>
              {showInfo && (
                <motion.div
                  className="absolute bottom-16 left-4 right-4 bg-black/70 text-white rounded-xl p-4 text-sm z-40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: startFadeOut ? 0 : 1,
                    y: startFadeOut ? 20 : 0,
                    transition: { duration: 0.3 }
                  }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <h2 className="text-lg font-semibold mb-1">
                    {images[selectedIndex].title}
                  </h2>
                  <p className="text-gray-300">{images[selectedIndex].description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
