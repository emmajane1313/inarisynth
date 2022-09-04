import React, { FunctionComponent, useEffect, useRef } from 'react';

const images: string[] = [
  '/images/home/gallery1.png',
  '/images/home/gallery2.png',
  '/images/home/gallery3.png',
  '/images/home/gallery4.png',
  '/images/home/gallery5.png',
  '/images/home/gallery6.png',
  '/images/home/gallery7.png',
  '/images/home/gallery8.png',
  '/images/home/gallery9.png',
  '/images/home/gallery10.png',
  '/images/home/gallery11.png'
]

export const HomeAnimation: FunctionComponent = (): JSX.Element => {
  const itemEls = useRef(new Array());

  const scaleItems = Array.from({length: images.length}, (_, i) => -i * 0.3)
  const isMouseOver = Array.from({length: images.length}, (_, i) => false)


  const xPos = Array.from({length: images.length}, (_, i) => -50)
  const yPos = Array.from({length: images.length}, (_, i) => -50)
  const xSteps = Array.from({length: images.length}, (_, i) => (i % 2 ? 1 : -1) * 0.3)
  const ySteps = Array.from({length: images.length}, (_, i) => (
      (
        i % 4 == 0 ? 1
        : i % 4 == 1 ? -1
        : i % 4 == 2 ? -1
        : 1
      ) * 0.3
    )
  )

  let currentTimer: any;

  const IsMouseOver = (): boolean => {
    if (isMouseOver.findIndex(item => item === true) >= 0) return true;
    return false;
  }

  const moveImages = (): void => {
      !IsMouseOver() && itemEls.current.forEach((item, index) => {
      scaleItems[index] += 0.003;
      if (scaleItems[index] > 3) {
        scaleItems[index] = scaleItems[index] - 3;
        xPos[index] = -50
        yPos[index] = -50
      }  else if (scaleItems[index] > 0) {
        xPos[index] += xSteps[index]
        yPos[index] += ySteps[index]
      }

      if (item) {
        item.style=`transform: scale(${scaleItems[index] > 0 ? scaleItems[index] : 0}) translate(${xPos[index]}%, ${yPos[index]}%)`;
      }
    })

    currentTimer = setTimeout(() => {
      moveImages()
    }, 30)
  }

  useEffect(() => {
    currentTimer && clearTimeout(currentTimer);
    moveImages();
  }, [])

  return (
    <div className="absolute overflow-hidden w-full h-screen z-0">
      {
        images.map((item, index) => {
          return (
            <img 
              className='cursor-pointer absolute top-1/2 left-1/2 origin-homeAnim translate-y-1/2 translate-x-1/2 hover:grayscale'
              key={index}
              src={item}
              ref={(element) => {
              itemEls.current[index] = element}}
              onMouseEnter={(): void => {
                console.log('enter');
                isMouseOver[index] = true
              }}
              onMouseLeave={(): void => {
                console.log('leave');
                isMouseOver[index] = false
              }}
            />
          )
        })
      }
    </div>
  )
}