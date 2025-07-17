import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Download, Mail, Phone, Calendar, CheckCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';

const QuoteGenerator = () => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const downloadPDF = async () => {
    if (!quoteRef.current) return;

    try {
      const canvas = await html2canvas(quoteRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('Cotizacion_UTPL_Skilt.pdf');
      
      toast({
        title: "PDF descargado exitosamente",
        description: "La cotización se ha guardado en tu dispositivo",
      });
    } catch (error) {
      toast({
        title: "Error al generar PDF",
        description: "Por favor intenta nuevamente",
        variant: "destructive",
      });
    }
  };

  const packageItems = [
    "Ambiente tecnológico de práctica",
    "Uso de plataforma Skilt durante el evento",
    "Ejercicios y desafíos gamificados según necesidad",
    "Publicación del evento en varias fuentes de reclutamiento",
    "Scouting e invitación a reclutadores IT",
    "Logística, planificación de equipamiento y timing",
    "Comunicación a través de medios digitales",
    "Certificado de participación",
    "Certificado de ganadores",
    "Tool kit de diseños gráficos",
    "Reporte de participantes",
    "Presentador / Speaker (opcional)"
  ];

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Download Button */}
        <div className="flex justify-center">
          <Button 
            onClick={downloadPDF}
            className="bg-gradient-primary hover:opacity-90 shadow-elegant"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Descargar PDF
          </Button>
        </div>

        {/* Quote Content */}
        <div ref={quoteRef} className="bg-background p-8 rounded-lg shadow-card">
          {/* Header */}
          <div className="bg-gradient-header text-primary-foreground p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">COTIZACIÓN - Test</h1>
                <p className="text-lg opacity-90">UTPL - Universidad Técnica Particular de Loja</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">SKILT</div>
                <div className="text-sm opacity-90">Plataforma de Reclutamiento IT</div>
              </div>
            </div>
          </div>

          {/* Client Data */}
          <Card className="p-6 mb-6 border-border">
            <h2 className="text-xl font-semibold mb-4 text-primary">Datos del Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="font-medium">Nombre:</span>
                <span>UTPL</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-medium">Correo:</span>
                <span>mclandacay@utpl.edu.ec</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-medium">Teléfono:</span>
                <span>+593 99 446 0280</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium">Fecha:</span>
                <span>20/10/2025</span>
              </div>
            </div>
          </Card>

          {/* Quote Table */}
          <Card className="p-6 mb-6 border-border">
            <h2 className="text-xl font-semibold mb-4 text-primary">Detalle de Servicios</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 font-semibold text-foreground">Concepto</th>
                    <th className="text-center py-3 font-semibold text-foreground">Cantidad</th>
                    <th className="text-right py-3 font-semibold text-foreground">Precio Unit.</th>
                    <th className="text-right py-3 font-semibold text-foreground">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-4 text-foreground">Bootcamp UTPL (Virtual)</td>
                    <td className="text-center py-4 text-muted-foreground">25 participantes máx.</td>
                    <td className="text-right py-4 text-foreground">$ 1,290</td>
                    <td className="text-right py-4 text-foreground">$ 1,290</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-4 text-success font-medium">Descuento Especial</td>
                    <td className="text-center py-4"></td>
                    <td className="text-right py-4 text-success">–$ 390</td>
                    <td className="text-right py-4 text-success">–$ 390</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-primary-light">
                    <td className="py-4 font-bold text-primary" colSpan={3}>Total a Pagar</td>
                    <td className="text-right py-4 font-bold text-2xl text-primary">$ 900</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Card>

          {/* Package Includes */}
          <Card className="p-6 mb-6 border-border">
            <h2 className="text-xl font-semibold mb-4 text-primary">Nuestro Paquete Incluye</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {packageItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* General Considerations */}
          <Card className="p-6 mb-6 border-border">
            <h2 className="text-xl font-semibold mb-4 text-primary">Consideraciones Generales</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cualquier actividad o entregable adicional no incluido en esta propuesta queda fuera del alcance 
              y será facturado por separado, previa negociación entre las partes.
            </p>
          </Card>

          {/* Contact Information */}
          <div className="bg-accent p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-primary">Contacto Skilt</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-medium text-foreground">Teléfono</div>
                  <div className="text-muted-foreground">096-422-2040</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded"></div>
                </div>
                <div>
                  <div className="font-medium text-foreground">Web</div>
                  <div className="text-primary font-medium">skilt.io</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-foreground rounded"></div>
                </div>
                <div>
                  <div className="font-medium text-foreground">Socios Clave</div>
                  <div className="text-muted-foreground text-sm">Partners tecnológicos</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              Esta cotización es válida por 30 días desde la fecha de emisión
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;