import type { GetStaticPaths, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Bridge from '@/components/Icons/Bridge'
import Logo from '@/components/Icons/Logo'
import Modal from '@/components/Modal'
import type { ImageProps } from '@/utils/types'
import { useLastViewedPhoto } from '@/utils/useLastViewedPhoto'
import { getProjectData, getAllProjectIds, ProjectData } from '../../libs/static-data'
import { getHashString } from '@/utils/getHashString'

interface ProjectSlugProps {
  images: ImageProps[];
  project: ProjectData;
}


const Project: NextPage<ProjectSlugProps> = ({ images, project }) => {
  const router = useRouter()
  const { photoId, slug } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

    
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])


  return (
    <>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={images}
            onClose={() => {
              setLastViewedPhoto(photoId)
            }}
          />
        )}
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="border after:content relative mb-5 flex min-h-[429px] flex-col items-center justify-center gap-4 overflow-hidden rounded-lg px-6 pb-16 pt-64 text-center text-gray-800  after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0 shadow-xl transition-shadow hover:shadow-lg sm:p-6 lg:p-">
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
                {project.title}
            </h1>
            <p className="max-w-[40ch] text-gray-800/75 sm:max-w-[32ch]">
                {project.smallDescription}
            </p>
            <div className="max-w-[40ch] text-gray-800/75 sm:max-w-[32ch]">
              <p>{project.fullDescription}</p>
            </div>
            <Link
              className="pointer z-10 mt-6 rounded-lg border bg-black px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 md:mt-4"
              href="/"
            >
              Explore more projects
            </Link>
          </div>
          {images.map((image) => (
            <Link
              key={image.id}
              href={{
                pathname: `/${slug}`,
                query: {photoId: image.id.toString()},
              }
              }
              as={`/${slug}/p/${image.id}`}
              ref={image.id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt={image.alt}
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: 'translate3d(0, 0, 0)' }}
                placeholder="blur"
                blurDataURL={image.blurDataUrl || "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="}
                src={`/images/${image.filename}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export default Project

export async function getStaticProps({ params }) {
  const { slug } = params;
  const project = getProjectData(slug);
  
  if (!project) {
    return {
      notFound: true,
    }
  }

  // Convert our static data to match the expected ImageProps interface
  const images: ImageProps[] = project.images.map(image => ({
    id: image.id,
    height: image.height,
    width: image.width,
    filename: image.filename,
    alt: image.alt,
    blurDataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
  }));

  return {
    props: {
      images,
      project
    },
  }
}

export async function getStaticPaths() {
  const paths = getAllProjectIds();

  return {
    paths,
    fallback: false,
  }
}