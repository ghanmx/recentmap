import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useRef } from 'react'

export const TermsAndConditions = () => {
  const scrollRef = useRef(null)

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <Card className="p-6 max-w-4xl mx-auto bg-white/95 backdrop-blur-sm shadow-lg rounded-lg">
      <ScrollArea ref={scrollRef} className="h-[70vh] pr-4">
        <div className="space-y-6">
          {/* Navigation Links */}
          <nav className="space-y-2 mb-4">
            <p className="font-semibold text-gray-700">Ir a:</p>
            <ul className="list-disc pl-6 text-blue-600 space-y-1">
              <li>
                <button
                  onClick={() => scrollToSection('acceptance')}
                  className="underline"
                >
                  1. Aceptación de los Términos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('special-maneuvers')}
                  className="underline"
                >
                  2. Maniobras Especiales y Cargos Adicionales
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('cancellation')}
                  className="underline"
                >
                  3. Política de Cancelación y Reembolsos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('client-responsibilities')}
                  className="underline"
                >
                  4. Responsabilidades del Cliente
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('liability')}
                  className="underline"
                >
                  5. Limitación de Responsabilidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('modifications')}
                  className="underline"
                >
                  6. Modificaciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('applicable-law')}
                  className="underline"
                >
                  7. Ley Aplicable
                </button>
              </li>
            </ul>
          </nav>

          <h2 className="text-2xl font-bold text-primary" id="title">
            Términos y Condiciones del Servicio
          </h2>

          {/* Section 1 */}
          <section
            className="space-y-4"
            aria-labelledby="acceptance"
            id="acceptance"
          >
            <h3 className="text-lg font-semibold">
              1. Aceptación de los Términos
            </h3>
            <p className="text-gray-600">
              Al utilizar nuestros servicios de grúa, usted acepta estos
              términos y condiciones en su totalidad. Si no está de acuerdo con
              estos términos, por favor no utilice nuestros servicios.
            </p>
          </section>

          {/* Section 2 */}
          <section
            className="space-y-4 bg-yellow-50/50 p-4 rounded-lg border border-yellow-200"
            aria-labelledby="special-maneuvers"
            id="special-maneuvers"
          >
            <h3 className="text-lg font-semibold text-yellow-800">
              2. Maniobras Especiales y Cargos Adicionales
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>2.1.</strong> El cliente tiene la obligación de informar
                correctamente sobre la necesidad de maniobras especiales al
                momento de solicitar el servicio.
              </p>
              <p>
                <strong>2.2.</strong> En caso de que el cliente no haya
                declarado la necesidad de maniobras especiales al momento de la
                solicitud:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  La empresa se reserva el derecho de cobrar el cargo adicional
                  por maniobra en el lugar del servicio.
                </li>
                <li>
                  El cargo por maniobra especial deberá ser liquidado en su
                  totalidad antes de realizar el servicio.
                </li>
                <li>
                  El cliente acepta que este cargo adicional es independiente
                  del monto inicial cotizado.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section
            className="space-y-4 bg-red-50/50 p-4 rounded-lg border border-red-200"
            aria-labelledby="cancellation"
            id="cancellation"
          >
            <h3 className="text-lg font-semibold text-red-800">
              3. Política de Cancelación y Reembolsos
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>3.1.</strong> Una vez realizado el pago del servicio:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  No se realizarán reembolsos por cancelación del servicio.
                </li>
                <li>El monto pagado no es transferible a otros servicios.</li>
                <li>
                  La empresa no está obligada a reprogramar el servicio sin
                  costo adicional.
                </li>
              </ul>
              <p>
                <strong>3.2.</strong> Esta política aplica tanto al cargo base
                como a cualquier cargo adicional por maniobras especiales.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section
            className="space-y-4"
            aria-labelledby="client-responsibilities"
            id="client-responsibilities"
          >
            <h3 className="text-lg font-semibold">
              4. Responsabilidades del Cliente
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>El cliente se compromete a:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Proporcionar información precisa sobre la ubicación y estado
                  del vehículo.
                </li>
                <li>
                  Informar sobre cualquier condición especial que pueda requerir
                  maniobras adicionales.
                </li>
                <li>
                  Estar presente durante el servicio o designar un representante
                  autorizado.
                </li>
                <li>
                  Realizar el pago acordado según los términos establecidos.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section
            className="space-y-4"
            aria-labelledby="liability"
            id="liability"
          >
            <h3 className="text-lg font-semibold">
              5. Limitación de Responsabilidad
            </h3>
            <p className="text-gray-600">
              La empresa no se hace responsable por:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Daños preexistentes en el vehículo.</li>
              <li>
                Retrasos causados por condiciones fuera de nuestro control.
              </li>
              <li>
                Costos adicionales derivados de información incorrecta
                proporcionada por el cliente.
              </li>
            </ul>
          </section>

          {/* Section 6 */}
          <section
            className="space-y-4"
            aria-labelledby="modifications"
            id="modifications"
          >
            <h3 className="text-lg font-semibold">6. Modificaciones</h3>
            <p className="text-gray-600">
              Nos reservamos el derecho de modificar estos términos y
              condiciones en cualquier momento. Los cambios entrarán en vigor
              inmediatamente después de su publicación.
            </p>
          </section>

          {/* Section 7 */}
          <section
            className="space-y-4"
            aria-labelledby="applicable-law"
            id="applicable-law"
          >
            <h3 className="text-lg font-semibold">7. Ley Aplicable</h3>
            <p className="text-gray-600">
              Estos términos y condiciones se rigen por las leyes de México.
              Cualquier disputa será resuelta en los tribunales competentes de
              la jurisdicción correspondiente.
            </p>
          </section>
        </div>
      </ScrollArea>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-md hover:bg-primary-dark"
        aria-label="Scroll back to top"
      >
        ↑
      </button>
    </Card>
  )
}
