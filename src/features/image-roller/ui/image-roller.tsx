import { Carousel } from '@mantine/carousel'
import { Image } from '@mantine/core'
import '@mantine/carousel/styles.css'
import image1 from '@/shared/assets/images/carousel/image-1.webp'
import image2 from '@/shared/assets/images/carousel/image-2.webp'
import image3 from '@/shared/assets/images/carousel/image-3.webp'
import image4 from '@/shared/assets/images/carousel/image-4.webp'

interface CarouselImage {
  id: number
  url: string
  alt: string
}

const images: CarouselImage[] = [
  {
    id: 1,
    url: image1,
    alt: 'Nature landscape',
  },
  {
    id: 2,
    url: image2,
    alt: 'Urban cityscape',
  },
  { id: 3, url: image3, alt: 'Mountain view' },
  { id: 4, url: image4, alt: 'Ocean sunset' },
]

export function ImageRoller() {
  return (
    <Carousel
      withIndicators
      loop
      classNames={{
        root: 'w-full',
        viewport: 'rounded-lg',
        indicators: 'flex gap-2 mt-4',
        indicator:
          'w-2 h-2 transition-colors bg-gray-300 rounded-full hover:bg-blue-500',
        control: 'bg-white bg-opacity-50 hover:bg-white',
      }}
    >
      {images.map((image) => (
        <Carousel.Slide key={image.id}>
          <Image
            src={image.url}
            alt={image.alt}
            className="h-[400px] w-full object-cover"
            loading="lazy"
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
