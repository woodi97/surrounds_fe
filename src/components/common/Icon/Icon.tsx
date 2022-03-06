import React, { FC } from 'react'
import PlusSVG from './assets/Plus'

export type SVGTypes = 'plus'

type Props = {
  name: SVGTypes
  onClick?: () => void
}

const Icon: FC<Props> = ({ name, onClick }) => {
  const IconSelector: { [keys in SVGTypes]: JSX.Element } = {
    plus: <PlusSVG />,
  }

  return <div onClick={onClick}>{IconSelector[name]}</div>
}

export default Icon
