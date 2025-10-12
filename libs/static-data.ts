import fs from 'fs'
import path from 'path'

export function getPortfolioData() {
  const filePath = path.join(process.cwd(), 'data', 'portfolio.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(fileContents)
  return data
}

export function getProjectData(projectId: string) {
  const data = getPortfolioData()
  return data.projects.find(project => project.id === projectId)
}

export function getAllProjectIds() {
  const data = getPortfolioData()
  return data.projects.map(project => ({
    params: { slug: project.id }
  }))
}

export interface StaticImageProps {
  id: number
  filename: string
  width: number
  height: number
  alt: string
  blurDataUrl?: string
}

export interface ProjectData {
  id: string
  title: string
  smallDescription: string
  fullDescription: string
  images: StaticImageProps[]
}