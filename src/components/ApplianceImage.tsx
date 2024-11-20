import { Image } from 'react-konva'
import styled from 'styled-components'
import { useState, useEffect } from 'react'

interface ApplianceImageProps {
  x: number
  y: number
  width: number
  height: number
  imageObj: HTMLImageElement
}

const ApplianceImage = ({
  x,
  y,
  width,
  height,
  imageObj,
}: ApplianceImageProps) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const img = new window.Image()
    img.src = imageObj.src || ''
    img.onload = () => {
      setImage(img)
    }
  }, [imageObj])

  return (
    <>
      {image && (
        <Image
          x={x}
          y={y}
          width={width}
          height={height}
          image={image}
          listening={false}
        />
      )}
    </>
  )
}

export default ApplianceImage
