import Container from '@/components/container'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'

interface HomePageProps {}

const Home: NextPage<HomePageProps> = () => {
  return (
    <>
      <Head>
        <meta
          property="og:image"
          content="https://photo-gallery-12.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://photo-gallery-12.vercel.app/og-image.png"
        />
      </Head>
      <main>
        <Container>
          <div className="py-20 text-center">
            <Heading>Nava Art Gallery</Heading>
            <Text className='my-10 text-lg' asChild>
              <p>Welcome to a curated collection of paintings and sculptures. Explore the artworks below.</p>
            </Text>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
              <Link href="/paintings" legacyBehavior>
                <a className="p-8 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all dark:border-gray-600 dark:hover:border-blue-400">
                  <h3 className="text-2xl font-bold mb-2">Paintings</h3>
                  <p className="text-gray-600 dark:text-gray-400">View our collection of paintings</p>
                </a>
              </Link>
              
              <Link href="/sculptures" legacyBehavior>
                <a className="p-8 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all dark:border-gray-600 dark:hover:border-blue-400">
                  <h3 className="text-2xl font-bold mb-2">Sculptures</h3>
                  <p className="text-gray-600 dark:text-gray-400">View our collection of sculptures</p>
                </a>
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}

export default Home

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 3600,
  }
}

