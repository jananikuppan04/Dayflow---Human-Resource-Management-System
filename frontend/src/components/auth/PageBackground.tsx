import { useEffect, useRef, useState } from 'react'
import ParticleCanvas from './ParticleCanvas'

interface Props { children: React.ReactNode }

export default function PageBackground({ children }: Props) {
  const [mouse, setMouse] = useState({ x: -9999, y: -9999 })
  const [glowPos, setGlowPos] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 })
  const [glowVisible, setGlowVisible] = useState(false)
  const glowRef = useRef(glowPos)
  const targetRef = useRef(mouse)
  const rafRef = useRef<number>(0)

  useEffect(() => { targetRef.current = mouse }, [mouse])

  useEffect(() => {
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
    function animate() {
      glowRef.current = {
        x: lerp(glowRef.current.x, targetRef.current.x, 0.06),
        y: lerp(glowRef.current.y, targetRef.current.y, 0.06),
      }
      setGlowPos({ ...glowRef.current })
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    function onMove(e: MouseEvent | TouchEvent) {
      const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX
      const y = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY
      setMouse({ x, y })
      if (!glowVisible) setGlowVisible(true)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onMove)
    }
  }, [glowVisible])

  return (
    <>
      <ParticleCanvas mouseX={glowPos.x} mouseY={glowPos.y} />
      <div
        className="cursor-glow"
        style={{
          left: glowPos.x, top: glowPos.y,
          opacity: glowVisible ? 1 : 0,
        }}
      />
      {children}
    </>
  )
}
