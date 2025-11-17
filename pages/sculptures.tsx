import Container from '@/components/container'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import type { CloudinaryImage } from '../libs/cloudinary-data'
import { getSculptures } from '../libs/cloudinary-data'

interface SculpturesPageProps {
  sculptures: CloudinaryImage[]
}

const SculpturesPage: NextPage<SculpturesPageProps> = ({ sculptures }) => {
  return (
    <>
      <Head>
        <title>Sculptures - Nava Art Gallery</title>
        <meta name="description" content="View Nava's sculptures collection" />
      </Head>
      <main>
        <Container>
          <div className="mb-12">
            <Heading>Sculptures</Heading>
            <Text className='my-6' asChild>
              <p>A collection of sculptures by Nava</p>
            </Text>
          </div>

          {sculptures && sculptures.length > 0 ? (
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
              {sculptures.map((sculpture) => (
                <div key={sculpture.id} className="mb-4 break-inside-avoid">
                  <div className="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                    <img
                      src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_limit,w_500/${sculpture.public_id}.${sculpture.format}`}
                      alt={sculpture.alt}
                      className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                      loading="lazy"
                    />
                    {sculpture.title && (
                      <div className="p-3 bg-gray-100 dark:bg-gray-900">
                        <h3 className="font-semibold text-sm">{sculpture.title}</h3>
                        {sculpture.year && <p className="text-xs text-gray-600 dark:text-gray-400">{sculpture.year}</p>}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400">No sculptures found yet. Check back soon!</p>
            </div>
          )}
        </Container>
      </main>
    </>
  )
}

export default SculpturesPage

export async function getServerSideProps() {
  try {
    const sculptures = await getSculptures()
    return {
      props: {
        sculptures: sculptures || [],
      },
    }
  } catch (error) {
    console.error('Error fetching sculptures:', error)
    return {
      props: {
        sculptures: [],
      },
    }
  }
}
