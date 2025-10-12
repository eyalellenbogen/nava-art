import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Carousel from '@/components/Carousel'
import type { ImageProps } from '@/utils/types'
import { getPortfolioData, getProjectData } from '../../../libs/static-data'

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
  
  const currentPhotoUrl = `/images/${currentPhoto.filename}`;

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
  const portfolioData = getPortfolioData();
  const projects = portfolioData.projects;

  const totalPaths = projects.reduce((paths, project) => {
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
  const project = getProjectData(slug as string);
  
  if (!project) {
    return {
      notFound: true,
    }
  }

  const currentPhoto = project.images.find((img) => img.id.toString() === photoId);
  
  if (!currentPhoto) {
    return {
      notFound: true,
    }
  }

  // Add blur data URL for the photo
  const photoWithBlur: ImageProps = {
    ...currentPhoto,
    blurDataUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
  };

  return {
    props: {
      currentPhoto: photoWithBlur,
    },
  };
}
