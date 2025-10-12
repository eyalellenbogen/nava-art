import Container from '@/components/container'
import Navbar from '@/components/Navbar'
import Project from '@/components/organisms/Project'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Heading } from '@/components/atoms/Heading'
import { Text } from '@/components/atoms/Text'
import { getPortfolioData, ProjectData } from '../libs/static-data'

interface PortfolioPageData {
  heading: string;
  description: string;
}

interface portfolioPageProps {
  portfolioPage: PortfolioPageData;
  projects: ProjectData[];
}


const Home: NextPage<portfolioPageProps> = ({ portfolioPage, projects }) => {
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
        <Heading>{portfolioPage?.heading}</Heading>
        <Text className='my-10' asChild><p> {portfolioPage?.description}</p></Text>
        <div className="grid grid-col-1 md:grid-cols-3 gap-4">
        {
          projects && projects.length > 0 && projects.map((project, index) => (
              <Project key={index} title={project.title} description={project.smallDescription} name={project.id}/>
          ))
        }
        </div>
        </Container>
      </main>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const portfolioData = getPortfolioData()
  
  return {
    props: {
      portfolioPage: portfolioData.portfolioPage,
      projects: portfolioData.projects
    },
  }
}

