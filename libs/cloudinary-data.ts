import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

const ROOT_FOLDER = 'nava-co-il'

export interface CloudinaryImage {
  id: number
  public_id: string
  format: string
  width: number
  height: number
  alt: string
  title?: string
  description?: string
  medium?: string
  year?: string
  dimensions?: string
  tags: string[]
  blurDataUrl?: string
}

export interface CloudinaryProject {
  id: string
  title: string
  smallDescription: string
  fullDescription: string
  images: CloudinaryImage[]
  hasSubcategories: boolean
  subcategories?: string[]
}

// Fetch all images from a specific folder with metadata
export async function getImagesFromFolder(folderPath: string): Promise<CloudinaryImage[]> {
  try {
    const result = await cloudinary.search
      .expression(`folder:${folderPath}/*`)
      .with_field('context')
      .with_field('tags')
      .max_results(100)
      .execute()

    return result.resources.map((resource: any, index: number) => ({
      id: index + 1,
      public_id: resource.public_id,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      alt: resource.context?.alt || resource.context?.title || 'Art piece',
      title: resource.context?.title || '',
      description: resource.context?.description || '',
      medium: resource.context?.medium || '',
      year: resource.context?.year || '',
      dimensions: resource.context?.dimensions || '',
      tags: resource.tags || [],
    }))
  } catch (error) {
    console.error('Error fetching images from Cloudinary:', error)
    return []
  }
}

// Get all project folders and their metadata
export async function getAllProjects(): Promise<CloudinaryProject[]> {
  try {
    // Get all folders under nava-co-il
    const folders = await cloudinary.api.sub_folders(ROOT_FOLDER)
    
    const projects: CloudinaryProject[] = []
    
    for (const folder of folders.folders) {
      const folderPath = `${ROOT_FOLDER}/${folder.name}`
      
      // Get images from this folder
      const images = await getImagesFromFolder(folderPath)
      
      if (images.length > 0) {
        // Determine if this project has subcategories (like sculptures)
        const hasSubcategories = folder.name === 'sculptures'
        let subcategories: string[] = []
        
        if (hasSubcategories) {
          // Get unique tags from all images to create subcategories
          const allTags = images.flatMap(img => img.tags)
          subcategories = Array.from(new Set(allTags)).filter(tag => 
            ['abstract', 'human-body', 'geometric', 'figurative'].includes(tag)
          )
        }
        
        projects.push({
          id: folder.name,
          title: formatProjectName(folder.name),
          smallDescription: `A collection of ${folder.name.replace('-', ' ')} artworks`,
          fullDescription: `Explore this beautiful collection of ${folder.name.replace('-', ' ')} created by Nava.`,
          images: images,
          hasSubcategories,
          subcategories
        })
      }
    }
    
    return projects
  } catch (error) {
    console.error('Error fetching projects from Cloudinary:', error)
    // Return empty array on error - the page will still render with fallback content
    return []
  }
}

// Get a specific project by folder name
export async function getProject(projectId: string): Promise<CloudinaryProject | null> {
  try {
    const folderPath = `${ROOT_FOLDER}/${projectId}`
    const images = await getImagesFromFolder(folderPath)
    
    if (images.length === 0) return null
    
    const firstImage = images[0]
    
    const hasSubcategories = projectId === 'sculptures'
    let subcategories: string[] = []
    
    if (hasSubcategories) {
      const allTags = images.flatMap(img => img.tags)
      subcategories = Array.from(new Set(allTags)).filter(tag => 
        ['abstract', 'human-body', 'geometric', 'figurative'].includes(tag)
      )
    }
    
    return {
      id: projectId,
      title: formatProjectName(projectId),
      smallDescription: `A collection of ${projectId.replace('-', ' ')} artworks`,
      fullDescription: `Explore this beautiful collection of ${projectId.replace('-', ' ')} created by Nava.`,
      images: images,
      hasSubcategories,
      subcategories
    }
  } catch (error) {
    console.error('Error fetching project from Cloudinary:', error)
    return null
  }
}

// Get sculptures filtered by subcategory (tag)
export async function getSculpturesByCategory(category: string): Promise<CloudinaryImage[]> {
  try {
    const sculpturesProject = await getProject('sculptures')
    if (!sculpturesProject) return []
    
    return sculpturesProject.images.filter(image => 
      image.tags.includes(category)
    )
  } catch (error) {
    console.error('Error fetching sculptures by category:', error)
    return []
  }
}

// Get paintings - simple gallery of all paintings
export async function getPaintings(): Promise<CloudinaryImage[]> {
  try {
    const folderPath = `${ROOT_FOLDER}/paintings`
    return await getImagesFromFolder(folderPath)
  } catch (error) {
    console.error('Error fetching paintings:', error)
    return []
  }
}

// Get sculptures - simple gallery of all sculptures
export async function getSculptures(): Promise<CloudinaryImage[]> {
  try {
    const folderPath = `${ROOT_FOLDER}/sculptures`
    return await getImagesFromFolder(folderPath)
  } catch (error) {
    console.error('Error fetching sculptures:', error)
    return []
  }
}

// Helper function to format folder names as titles
function formatProjectName(folderName: string): string {
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export default cloudinary