import type { NextApiRequest, NextApiResponse } from 'next'
import { getPaintings } from '../../libs/cloudinary-data'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const paintings = await getPaintings()
    res.status(200).json(paintings)
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to fetch paintings' })
  }
}
