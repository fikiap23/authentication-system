import { Response } from 'express'

interface ApiResponse<T> {
  status: boolean
  statusCode: number
  message: string
  data?: T
}

// Fungsi untuk mengirim respon API
const sendResponseApi = ({
  res,
  statusCode,
  message,
  data,
}: {
  res: Response
  statusCode: number
  message: string
  data?: any
}): void => {
  const responseBody: ApiResponse<any> = {
    status: statusCode >= 200 && statusCode < 300,
    statusCode,
    message,
  }

  if (data !== undefined) {
    responseBody.data = data
  }

  res.status(statusCode).json(responseBody)
}

export default sendResponseApi
