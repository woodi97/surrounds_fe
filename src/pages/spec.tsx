import React, { Fragment, useMemo, useState } from 'react'
import { DraggableSheet, Header } from '@components/common'
import { motion, useAnimation } from 'framer-motion'

const SpecPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const SheetWrapper = useMemo(() => {
    const SheetContent = () => {
      return (
        <Fragment>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
          <div>abc</div>
        </Fragment>
      )
    }
    return SheetContent
  }, [])

  return (
    <div className="flex flex-grow overflow-hidden">
      <div className="hidden border-r-2 border-r-slate-700 md:block min-w-[300px] w-1/4 h-screen">
        <div className="pt-10 px-6 children:px-4 children:py-2 children:bg-white">
          <SheetWrapper />
        </div>
      </div>
      <div className="z-20 relative w-full md:w-3/4 h-screen bg-slate-500">
        <DraggableSheet className="md:hidden" onClose={onClose} onOpen={onOpen}>
          <SheetWrapper />
        </DraggableSheet>
        <Header />
      </div>
    </div>
  )
}

export default SpecPage
