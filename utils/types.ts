/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number
  height: number
  width: number
  filename: string
  alt: string
  blurDataUrl?: string
  slug?: string
}

export interface SharedModalProps {
  index: number
  images?: ImageProps[]
  currentPhoto?: ImageProps
  changePhotoId: (newVal: number) => void
  closeModal: () => void
  navigation: boolean
  direction?: number
}
