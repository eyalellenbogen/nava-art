import Container from '@/components/container'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { getPaintings } from '../libs/cloudinary-data'
import type { CloudinaryImage } from '../libs/cloudinary-data'

interface PaintingsPageProps {
  paintings: CloudinaryImage[]
}

const PaintingsPage: NextPage<PaintingsPageProps> = ({ paintings }) => {
  return (
    <>
      <Head>
        <title>Paintings - Nava Art Gallery</title>
        <meta name="description" content="View Nava's paintings collection" />
      </Head>
      <main>
        <Container>
          <div className="mb-12">
            <Heading>Paintings</Heading>
            <Text className='my-6' asChild>
              <p>A collection of paintings by Nava</p>
            </Text>
          </div>

          {paintings && paintings.length > 0 ? (
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
              {paintings.map((painting) => (
                <div key={painting.id} className="mb-4 break-inside-avoid">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_500/${painting.public_id}.${painting.format}`}
                      alt={painting.alt}
                      className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                    />
                    {painting.title && (
                      <div className="p-3 bg-white dark:bg-gray-900">
                        <h3 className="font-semibold text-sm">{painting.title}</h3>
                        {painting.year && <p className="text-xs text-gray-600 dark:text-gray-400">{painting.year}</p>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400">No paintings found. Check back soon!</p>
            </div>
          )}
        </Container>
      </main>
    </>
  )
}

export default PaintingsPage

export async function getStaticProps() {
  const paintings = await getPaintings()

  return {
    props: {
      paintings: paintings || [],
    },
    revalidate: 3600, // Revalidate every hour
  }
}
