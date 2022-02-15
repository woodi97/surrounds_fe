import React, { FC } from 'react'

interface IHozLineProps {
  height?: number
  color?: string
  margin?: number
}

const HorizontalLine: FC<IHozLineProps> = ({ height = 1, color = '#DDDDDD', margin = 0 }) => {
  return (
    <hr
      style={{
        backgroundColor: color,
        height: '1px',
        border: 0,
        margin,
      }}
    />
  )
}

export default HorizontalLine
