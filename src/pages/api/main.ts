import type { NextApiRequest, NextApiResponse } from 'next'
import course from './01.json'

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  const data = {
    name: '第一节课',
    statements: course,
  }
  res.status(200).json({ status: 1, data })
}
