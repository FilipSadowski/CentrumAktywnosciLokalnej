'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

type Section = 'panorama' | 'gallery' | 'model'

type Props = {
  active: Section
  setActive: (section: Section) => void
  hidden?: boolean
  isOpen?: boolean
  setIsOpen?: (value: boolean) => void
}

export default function MobileMenu({
  active,
  setActive,
  hidden,
  isOpen: externalOpen,
  setIsOpen: externalSetOpen,
}: Props) {
  const [isOpenInternal, setIsOpenInternal] = useState(false)

  useEffect(() => {
    if (externalOpen !== undefined) {
      setIsOpenInternal(externalOpen)
    }
  }, [externalOpen])

  const toggleMenu = () => {
    const newState = !isOpenInternal
    setIsOpenInternal(newState)
    externalSetOpen?.(newState)
  }

  const handleChange = (section: Section) => {
    setActive(section)
    setIsOpenInternal(false)
    externalSetOpen?.(false)
  }

  if (hidden) return null

  return (
    <>
      <button
        onClick={toggleMenu}
        className="z-50 fixed top-6 right-4 text-white"
      >
        {isOpenInternal ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {isOpenInternal && (
          <>
            <motion.div
              key="overlay"
              onClick={() => handleChange(active)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            <motion.nav
              key="menu"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-full z-50 bg-black shadow-lg"
            >
              <ul className="flex flex-col items-center justify-center font-semibold gap-4 py-8 text-white text-lg font-[Helvetica]">
                <li>
                  <button
                    onClick={() => handleChange('panorama')}
                    className={`px-6 py-2 rounded transition-opacity duration-200 ${
                      active === 'panorama'
                        ? 'opacity-100 font-black underline underline-offset-6'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Panoramy 360°
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleChange('gallery')}
                    className={`px-6 py-2 rounded transition-opacity duration-200 ${
                      active === 'gallery'
                        ? 'opacity-100 font-black underline underline-offset-6'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Galeria Projektu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleChange('model')}
                    className={`px-6 py-2 rounded transition-opacity duration-200 ${
                      active === 'model'
                        ? 'opacity-100 font-black underline underline-offset-6'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    Model 3D
                  </button>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
