import { memo } from 'react'
import Shimmer from 'react-shimmer-effect'

const ShimmeringSheetContent = () => {
  return (
    <>
      {[...Array(8).keys()].map((_, idx) => {
        return (
          <div key={`shimmer-content-${idx}`} className="flex items-center pb-2 space-x-3">
            <Shimmer key={`shimmer-item-${idx}`}>
              <div className="w-10 h-10 rounded-2xl" />
              <div className="w-64 h-8 rounded-xl" />
            </Shimmer>
          </div>
        )
      })}
    </>
  )
}

export default memo(ShimmeringSheetContent)
