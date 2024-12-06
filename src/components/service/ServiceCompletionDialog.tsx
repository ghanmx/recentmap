import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { completeService } from '@/utils/serviceCompletion'
import { Loader2, CheckCircle } from 'lucide-react'

interface ServiceCompletionDialogProps {
  isOpen: boolean
  onClose: () => void
  requestId: string
}

export const ServiceCompletionDialog = ({
  isOpen,
  onClose,
  requestId,
}: ServiceCompletionDialogProps) => {
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleComplete = async () => {
    setIsSubmitting(true)
    try {
      await completeService(requestId, notes)
      onClose()
    } catch (error) {
      console.error('Error completing service:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Confirm Service Completion
          </DialogTitle>
          <DialogDescription>
            Please confirm that the towing service has been completed to your
            satisfaction.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Add any notes about the service (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleComplete}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming...
              </>
            ) : (
              'Confirm Completion'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}