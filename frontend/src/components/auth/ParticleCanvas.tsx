import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  baseVx: number; baseVy: number
  size: number; opacity: number
  color: string; angle: number
  pullWeight: number
  life: number; maxLife: number
}

interface Props {
  mouseX: number; mouseY: number
}

const COLORS = [
  'rgba(99,102,241,',   // indigo/violet
  'rgba(139,92,246,',   // violet
  'rgba(167,139,250,',  // lavender
  'rgba(59,130,246,',   // blue
  'rgba(196,181,253,',  // soft lavender
  'rgba(244,114,182,',  // pink (rare)
]

function randomColor(): string {
  const r = Math.random()
  if (r < 0.30) return COLORS[0]
  if (r < 0.55) return COLORS[1]
  if (r < 0.73) return COLORS[2]
  if (r < 0.88) return COLORS[3]
  if (r < 0.97) return COLORS[4]
  return COLORS[5]
}

export default function ParticleCanvas({ mouseX, mouseY }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const mouseRef = useRef({ x: mouseX, y: mouseY })

  useEffect(() => { mouseRef.current = { x: mouseX, y: mouseY } }, [mouseX, mouseY])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let W = 0, H = 0

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    function spawnParticle(): Particle {
      // Radial distribution from center
      const angle = Math.random() * Math.PI * 2
      const r = Math.pow(Math.random(), 0.5) * Math.min(W, H) * 0.42
      const cx = W / 2, cy = H / 2
      const speed = 0.08 + Math.random() * 0.22
      const life = 200 + Math.random() * 400
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        baseVx: (Math.random() - 0.5) * speed,
        baseVy: (Math.random() - 0.5) * speed,
        size: 1 + Math.random() * 2.5,
        opacity: 0,
        color: randomColor(),
        angle: Math.random() * Math.PI * 2,
        pullWeight: 0.3 + Math.random() * 0.7,
        life: 0, maxLife: life,
      }
    }

    function init() {
      resize()
      particlesRef.current = Array.from({ length: 280 }, spawnParticle).map(p => ({
        ...p, life: Math.random() * p.maxLife, opacity: Math.random() * 0.6
      }))
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Subtle radial gradient overlay
      const grd = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * 0.55)
      grd.addColorStop(0, 'rgba(139,92,246,0.025)')
      grd.addColorStop(0.5, 'rgba(99,102,241,0.015)')
      grd.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const p of particlesRef.current) {
        // Lifecycle: fade in, sustain, fade out
        p.life++
        if (p.life > p.maxLife) {
          const np = spawnParticle()
          Object.assign(p, np)
          continue
        }
        const progress = p.life / p.maxLife
        if (progress < 0.15) p.opacity = Math.min(0.6, p.opacity + 0.02)
        else if (progress > 0.8)  p.opacity = Math.max(0, p.opacity - 0.015)

        // Pull toward mouse (eased position)
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const strength = p.pullWeight * 60 / (dist * dist + 3000)
        p.vx = p.baseVx + dx * strength
        p.vy = p.baseVy + dy * strength

        p.x += p.vx
        p.y += p.vy
        p.angle += 0.008

        // Wrap edges
        if (p.x < -20) p.x = W + 20
        if (p.x > W + 20) p.x = -20
        if (p.y < -20) p.y = H + 20
        if (p.y > H + 20) p.y = -20

        // Draw dash shape
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.globalAlpha = p.opacity * 0.85
        ctx.fillStyle = p.color + (p.opacity * 0.9) + ')'
        const w = p.size * 2.5, h = p.size * 0.9
        ctx.beginPath()
        ctx.roundRect(-w / 2, -h / 2, w, h, h / 2)
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', () => { resize() })
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}
