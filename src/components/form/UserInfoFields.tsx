import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { UseFormReturn } from 'react-hook-form'
import { FormData } from '@/types/form'

interface UserInfoFieldsProps {
  form: UseFormReturn<FormData>
}

export const UserInfoFields = ({ form }: UserInfoFieldsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="userName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>User Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter your name" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="tel"
                placeholder="Enter your phone number"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}
