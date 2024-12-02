import { useState } from 'react'
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { VehicleForm } from './VehicleForm'
import { RouteDisplay } from './map/RouteDisplay'
import { CostEstimation } from './CostEstimation'
import { useSidebar } from '@/contexts/SidebarContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Location } from '@/types/location'

const NavContent = ({
  pickupLocation,
  dropLocation,
  pickupAddress,
  dropAddress,
  onPickupSelect,
  onDropSelect,
  onSelectingPickup,
  onSelectingDrop,
}: {
  pickupLocation: Location | null
  dropLocation: Location | null
  pickupAddress: string
  dropAddress: string
  onPickupSelect: (location: Location) => void
  onDropSelect: (location: Location) => void
  onSelectingPickup: () => void
  onSelectingDrop: () => void
}) => (
  <>
    <div className="sticky top-0 z-10 p-4 border-b bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-primary text-center">
        MRGruas
      </h1>
    </div>

    <ScrollArea className="h-[calc(100vh-4rem)] p-4 md:p-6">
      <div className="space-y-4 md:space-y-6 flex flex-col items-center pb-20">
        <VehicleForm
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          pickupAddress={pickupAddress || ''}
          dropAddress={dropAddress || ''}
          onPickupSelect={onPickupSelect}
          onDropSelect={onDropSelect}
          onSelectingPickup={onSelectingPickup}
          onSelectingDrop={onSelectingDrop}
        />
        <CostEstimation onShowPayment={() => {}} />
        <RouteDisplay
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
        />
      </div>
    </ScrollArea>
  </>
)

const Sidebar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { isOpen: isDesktopSidebarVisible, toggle: toggleDesktopSidebar } =
    useSidebar()
  const [pickupLocation, setPickupLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [dropLocation, setDropLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [pickupAddress, setPickupAddress] = useState('')
  const [dropAddress, setDropAddress] = useState('')
  const [selectingPickup, setSelectingPickup] = useState(false)
  const [selectingDrop, setSelectingDrop] = useState(false)

  const handlePickupSelect = (location: {
    lat: number
    lng: number
    address: string
  }) => {
    setPickupLocation({ lat: location.lat, lng: location.lng })
    setPickupAddress(location.address)
    setSelectingPickup(false)
  }

  const handleDropSelect = (location: {
    lat: number
    lng: number
    address: string
  }) => {
    setDropLocation({ lat: location.lat, lng: location.lng })
    setDropAddress(location.address)
    setSelectingDrop(false)
  }

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-[1000]">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:w-[400px] p-0">
            <NavContent
              pickupLocation={pickupLocation}
              dropLocation={dropLocation}
              pickupAddress={pickupAddress}
              dropAddress={dropAddress}
              onPickupSelect={handlePickupSelect}
              onDropSelect={handleDropSelect}
              onSelectingPickup={setSelectingPickup}
              onSelectingDrop={setSelectingDrop}
            />
          </SheetContent>
        </Sheet>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={toggleDesktopSidebar}
        className={cn(
          'fixed bottom-4 left-4 z-[1000] hidden lg:flex',
          'bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all',
        )}
      >
        {isDesktopSidebarVisible ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      <aside
        className={cn(
          'hidden lg:flex flex-col fixed left-0 top-0 h-screen',
          'bg-white/95 backdrop-blur-sm border-r shadow-lg z-[1000]',
          'transition-all duration-300 ease-in-out',
          isDesktopSidebarVisible ? 'w-[400px]' : 'w-0 overflow-hidden',
        )}
      >
        <NavContent
          pickupLocation={pickupLocation}
          dropLocation={dropLocation}
          pickupAddress={pickupAddress}
          dropAddress={dropAddress}
          onPickupSelect={handlePickupSelect}
          onDropSelect={handleDropSelect}
          onSelectingPickup={setSelectingPickup}
          onSelectingDrop={setSelectingDrop}
        />
      </aside>

      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          isDesktopSidebarVisible ? 'lg:pl-[400px]' : 'lg:pl-0',
        )}
      />
    </>
  )
}

export default Sidebar
