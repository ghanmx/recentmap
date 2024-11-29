import { toast } from '@/hooks/use-toast'

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown,
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof APIError) {
    toast({
      title: 'API Error',
      description: error.message,
      variant: 'destructive',
    })
    return
  }

  if (error instanceof Error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    })
    return
  }

  toast({
    title: 'Unknown Error',
    description: 'An unexpected error occurred',
    variant: 'destructive',
  })
}

export const createAPIError = (
  response: Response,
  message?: string,
): APIError => {
  return new APIError(
    message || `Request failed with status ${response.status}`,
    response.status,
  )
}
