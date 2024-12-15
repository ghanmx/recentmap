import React, { useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          onReset={() => this.setState({ hasError: false })}
        />
      )
    }

    return this.props.children
  }
}

interface ErrorFallbackProps {
  error?: Error
  onReset: () => void
}

const ErrorFallback = ({ error, onReset }: ErrorFallbackProps) => {
  const { toast } = useToast()

  useEffect(() => {
    toast({
      title: 'An error occurred',
      description: error?.message || 'Something went wrong',
      variant: 'destructive',
    })
  }, [error, toast])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-[200px] p-4"
    >
      <Card className="p-6 max-w-md w-full bg-destructive/5 border-destructive/20">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertTriangle className="h-10 w-10 text-destructive" />
          <div>
            <h3 className="text-lg font-semibold text-destructive">
              Something went wrong
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {error?.message || 'An unexpected error occurred'}
            </p>
          </div>
          <Button onClick={onReset} variant="outline" className="mt-2">
            Try again
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}