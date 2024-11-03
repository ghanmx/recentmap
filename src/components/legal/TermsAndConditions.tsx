import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const TermsAndConditions = () => {
  return (
    <Card className="p-6 max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
      <ScrollArea className="h-[70vh] pr-4">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Términos y Condiciones</h2>
          
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">1. Aceptación de los Términos</h3>
            <p className="text-gray-600">
              Al utilizar nuestros servicios de grúa, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos, por favor no utilice nuestros servicios.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">2. Descripción del Servicio</h3>
            <p className="text-gray-600">
              Proporcionamos servicios de grúa y asistencia en carretera, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Remolque de vehículos</li>
              <li>Asistencia en caso de averías</li>
              <li>Servicio de rescate</li>
              <li>Transporte de vehículos</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">3. Tarifas y Pagos</h3>
            <p className="text-gray-600">
              Las tarifas se calculan en base a:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Distancia del servicio</li>
              <li>Tipo de vehículo</li>
              <li>Condiciones del servicio</li>
              <li>Horario del servicio</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">4. Responsabilidades del Cliente</h3>
            <p className="text-gray-600">
              El cliente se compromete a:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Proporcionar información precisa sobre la ubicación y estado del vehículo</li>
              <li>Estar presente durante el servicio o designar un representante</li>
              <li>Asegurar que el vehículo está en condiciones de ser remolcado</li>
              <li>Realizar el pago acordado</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">5. Limitación de Responsabilidad</h3>
            <p className="text-gray-600">
              No nos hacemos responsables por:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Daños preexistentes en el vehículo</li>
              <li>Objetos personales dejados en el vehículo</li>
              <li>Retrasos causados por condiciones fuera de nuestro control</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">6. Cancelaciones</h3>
            <p className="text-gray-600">
              Las cancelaciones deben realizarse con un mínimo de tiempo de anticipación. Pueden aplicar cargos por cancelación según el caso.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">7. Modificaciones</h3>
            <p className="text-gray-600">
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">8. Ley Aplicable</h3>
            <p className="text-gray-600">
              Estos términos y condiciones se rigen por las leyes de México. Cualquier disputa será resuelta en los tribunales competentes.
            </p>
          </section>
        </div>
      </ScrollArea>
    </Card>
  );
};