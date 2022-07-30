import { useEffect, useRef } from 'react'

export type TTouchPoint = {
  x: number
  y: number
}

export default function useTouch({
  cb,
  passive = true,
}: {
  cb: (e: TouchEvent, startPos: TTouchPoint, offset: TTouchPoint) => void
  passive?: boolean
}) {
  const startPos = useRef<TTouchPoint>({ x: 0, y: 0 })
  const offset = useRef<TTouchPoint>({ x: 0, y: 0 })

  const onTouchStart = (e: TouchEvent) => {
    startPos.current = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY,
    }
  }

  const onTouchMove = (e: TouchEvent) => {
    e.stopPropagation()
    offset.current = {
      x: startPos.current.x - e.touches[0].pageX,
      y: startPos.current.y - e.touches[0].pageY,
    }
    cb(e, startPos.current, offset.current)
  }

  useEffect(() => {
    window.addEventListener('touchstart', onTouchStart, false)
    window.addEventListener('touchmove', onTouchMove, {
      passive,
      capture: false,
    })
    return () => {
      window.removeEventListener('touchstart', onTouchStart, false)
      window.removeEventListener('touchmove', onTouchMove, {
        capture: false,
      })
    }
  })
}
