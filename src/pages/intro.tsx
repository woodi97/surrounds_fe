import { PageLayout } from '@src/components/layout'
import React from 'react'
import { Fade } from 'react-reveal'

function IntroPage(): JSX.Element {
  return (
    <PageLayout>
      <Fade>
        <div className="flex flex-col items-center justify-center h-96">Running Image</div>
      </Fade>
      <Fade>
        <div className="flex flex-col items-center justify-center h-96">Intro</div>
      </Fade>
      <Fade>
        <div className="flex flex-col items-center justify-center h-96">Policy</div>
      </Fade>
    </PageLayout>
  )
}

export default IntroPage
