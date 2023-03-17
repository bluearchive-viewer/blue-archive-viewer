import { NextApiRequest, NextApiResponse } from "next"

export default async function getData(req: NextApiRequest, res: NextApiResponse) {
  try {
    const url = "https://prod-noticeindex.bluearchiveyostar.com/prod/index.json"
    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Something went wrong" })
  }
}
