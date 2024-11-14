import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const PrivacyPolicy = () => {
  return (
    <Card className="p-6 max-w-4xl mx-auto bg-white/95 backdrop-blur-sm">
      <ScrollArea className="h-[70vh] pr-4">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary">Aviso de Privacidad</h2>
          
          <section className="space-y-4">
            <h3 className="text-lg font-semibold">1. Identidad y Domicilio del Responsable</h3>
            <p className="text-gray-600">
              [Nombre de la Empresa], con domicilio en [Dirección completa], es responsable del tratamiento de sus datos personales.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">2. Datos Personales Recopilados</h3>
            <p className="text-gray-600">
              Para la prestación de nuestros servicios de grúa, recopilamos los siguientes datos personales:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Nombre completo</li>
              <li>Dirección</li>
              <li>Teléfono de contacto</li>
              <li>Correo electrónico</li>
              <li>Información del vehículo (marca, modelo, año)</li>
              <li>Ubicación GPS para el servicio</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">3. Finalidad del Tratamiento de los Datos</h3>
            <p className="text-gray-600">Sus datos personales son utilizados para:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Prestación del servicio de grúa solicitado</li>
              <li>Facturación y cobro</li>
              <li>Seguimiento del servicio</li>
              <li>Comunicación sobre el estado del servicio</li>
              <li>Mejora de nuestros servicios</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">4. Transferencia de Datos</h3>
            <p className="text-gray-600">
              Sus datos personales pueden ser compartidos con:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Operadores de grúas para la prestación del servicio</li>
              <li>Proveedores de servicios de facturación</li>
              <li>Autoridades competentes cuando sea requerido por ley</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">5. Derechos ARCO</h3>
            <p className="text-gray-600">
              Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada conforme a los principios, deberes y obligaciones previstas en la normativa (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición).
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">6. Medidas de Seguridad</h3>
            <p className="text-gray-600">
              Implementamos diversas medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales, incluyendo encriptación de datos, acceso restringido a la información y políticas internas de privacidad.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">7. Uso de Cookies</h3>
            <p className="text-gray-600">
              Utilizamos cookies y otras tecnologías de seguimiento para mejorar su experiencia en nuestro sitio web, recordar sus preferencias y entender cómo interactúan los usuarios con nuestro servicio.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold">8. Cambios al Aviso de Privacidad</h3>
            <p className="text-gray-600">
              Nos reservamos el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso de privacidad. Cualquier modificación será notificada a través de nuestro sitio web.
            </p>
          </section>
        </div>
      </ScrollArea>
    </Card>
  );
};