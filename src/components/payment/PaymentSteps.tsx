import { motion } from 'framer-motion'

interface Step {
  title: string
  description: string
}

interface PaymentStepsProps {
  currentStep: number
  steps: Step[]
}

export const PaymentSteps = ({ currentStep, steps }: PaymentStepsProps): JSX.Element => {
  return (
    <div className="space-y-4 mb-6">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-4 rounded-lg border ${
            currentStep === index
              ? 'bg-primary/5 border-primary'
              : 'bg-white/50 border-gray-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                currentStep >= index ? 'bg-primary text-white' : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </div>
            <div>
              <h3 className="font-medium text-shadow-sm">{step.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{step.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}