import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const envVars = {
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'NOT SET',
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY ? '****' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'NOT SET',
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET ? '****' + process.env.CLOUDINARY_API_SECRET.slice(-4) : 'NOT SET',
      CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER || 'NOT SET',
      NODE_ENV: process.env.NODE_ENV,
    }

    // Try to fetch from Cloudinary
    const { v2: cloudinary } = require('cloudinary')
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    })

    let cloudinaryTest = {
      status: 'pending',
      error: null as string | null,
    }

    try {
      const result = await cloudinary.search
        .expression('folder:nava-co-il/paintings/*')
        .max_results(1)
        .execute()

      cloudinaryTest = {
        status: 'success',
        error: null,
      }
    } catch (error) {
      cloudinaryTest = {
        status: 'failed',
        error: error instanceof Error ? error.message : String(error),
      }
    }

    res.status(200).json({
      environment: envVars,
      cloudinaryTest,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
