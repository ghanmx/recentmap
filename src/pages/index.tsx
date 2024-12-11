import { Suspense, lazy } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { TowingWrapper } from '@/components/TowingWrapper'
import { LoadingSpinner } from '@/components/index/LoadingSpinner'
import { NavigationBar } from '@/components/index/NavigationBar'

const TowMap = lazy(() => import('@/features/map/TowMap'))

const Index = (): JSX.Element => {
  const methods = useForm()

  return (
    <FormProvider {...methods}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-[100dvh] overflow-hidden bg-gradient-to-br from-blue-50/90 via-white/90 to-blue-100/90 dark:from-blue-950/90 dark:via-gray-900/90 dark:to-blue-900/90 safe-area-view"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent" />

        <NavigationBar />

        <div className="relative z-10 h-full">
          <TowingWrapper>
            <Suspense fallback={<LoadingSpinner />}>
              <TowMap />
            </Suspense>
          </TowingWrapper>
        </div>
      </motion.div>
    </FormProvider>
  )
}

export default Index
