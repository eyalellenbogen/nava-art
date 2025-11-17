import type { NextApiRequest, NextApiResponse } from 'next'
import { getSculptures } from '../../libs/cloudinary-data'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sculptures = await getSculptures()
    res.status(200).json(sculptures)
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ error: 'Failed to fetch sculptures' })
  }
}
