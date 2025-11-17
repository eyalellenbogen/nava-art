import Container from '@/components/container'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import CustomLogo from '@/components/CustomLogo'

interface HomePageProps {}

const Home: NextPage<HomePageProps> = () => {
  return (
    <>
      <Head>
        <title>Nava Ellenbogen - Art Gallery</title>
        <meta name="description" content="Nava Ellenbogen's art gallery featuring paintings and sculptures" />
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
          {/* Hero Section */}
          <div className="py-4 md:py-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="text-gray-900 dark:text-gray-100">
                <CustomLogo />
              </div>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-100 mt-1" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>art gallery</p>
            </div>

            {/* Bio Section */}
            <div className="max-w-2xl mx-auto space-y-6 text-gray-900 dark:text-gray-200">
              <Text asChild>
                <p>
                  Born in 1955 in Tel Aviv, Nava studied accounting and economics at Tel Aviv University, working professionally as an accountant for several optics companies. For over four decades, art has remained central to her life.
                </p>
              </Text>

              <Text asChild>
                <p>
                  She studied sculpture, painting, and ceramics under renowned artists including Yehuda Kria, Zeev Chernov, Alex Cherkov, and Yehezkel Yak Cohen. Nava trained in stained glass with Moshe Shamir and explored etching, printing, and relief techniques at the Jaffa Arts Center. She served as Chair of the Ramat Gan and Givatayim Painters and Sculptors Association.
                </p>
              </Text>

              <Text asChild>
                <p>
                  Her sculptural work, crafted from fired clay with glazes, cast in bronze or polyester, centers on the human figure, characterized by precise, rounded lines that invite touch and evoke intimacy. Her paintings, primarily realistic oil on canvas, reflect a deep sensitivity to form and emotion.
                </p>
              </Text>

              <Text asChild>
                <p>
                  Nava has participated in numerous exhibitions both in Israel and internationally, including solo shows at Al Ha'agam Gallery in Raanana (2010, 2015) and Holzminden, Germany (2014), as well as group exhibitions at galleries and venues throughout Israel.
                </p>
              </Text>
            </div>

            {/* Gallery Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mx-auto mt-16">
              <Link href="/paintings" legacyBehavior>
                <a className="p-8 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out group">
                  <h2 className="text-2xl font-bold mb-2 text-gray-950 dark:text-gray-100 group-hover:text-gray-100">Paintings</h2>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300">Explore the collection</p>
                </a>
              </Link>

              <Link href="/sculptures" legacyBehavior>
                <a className="p-8 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out group">
                  <h2 className="text-2xl font-bold mb-2 text-gray-950 dark:text-gray-100 group-hover:text-gray-100">Sculptures</h2>
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-300">Explore the collection</p>
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

