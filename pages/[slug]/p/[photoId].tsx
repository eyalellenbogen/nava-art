import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@/components/Carousel'
import type { ImageProps } from '@/utils/types'
import { getAllProjects, getProject } from '../../../libs/cloudinary-data'

interface PhotoIdProps {
  currentPhoto: ImageProps;
}

const PhotoId: NextPage<PhotoIdProps> = ({ currentPhoto }) => {
  const router = useRouter();

  const { photoId, slug } = router.query as { photoId: string, slug: string };
  
  let index = Number(photoId);

  if (currentPhoto == undefined) {
    return <div>Photo not found.</div>;
  }
  
  const currentPhotoUrl = currentPhoto.filename;

  return (
    <>
      <Head>
        <meta property="og:image" content={currentPhotoUrl} />
        <meta name="twitter:image" content={currentPhotoUrl} />
      </Head>
       <div className="relative mx-auto max-w-[1960px] h-full p-4">
        <Carousel currentPhoto={currentPhoto} index={index} slug={slug}/>
      </div> 
    </>
  )
}

export default PhotoId

export async function getStaticPaths() {
  const cloudProjects = await getAllProjects()
  // Filter out paintings and sculptures since they have their own dedicated pages
  const totalPaths = cloudProjects
    .filter(p => p.id !== 'paintings' && p.id !== 'sculptures')
    .reduce((paths, project) => {
      const numAssets = project.images.length;
      for (let i = 0; i < numAssets; i++) {
        const photoId = project.images[i].id.toString();
        paths = paths.concat({ params: { slug: project.id, photoId } });
      }
      return paths;
    }, []);

  return {
    paths: totalPaths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { slug, photoId } = params;

  const project = await getProject(slug as string)
  if (!project) return { notFound: true }

  const current = project.images.find((img) => img.id.toString() === photoId)
  if (!current) return { notFound: true }

  const photoWithBlur: ImageProps = {
    id: current.id,
    filename: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_2000/${current.public_id}.${current.format}`,
    width: current.width,
    height: current.height,
    alt: current.title || current.description || '',
    blurDataUrl: null,
  }

  return {
    props: {
      currentPhoto: photoWithBlur,
    },
  };
}
