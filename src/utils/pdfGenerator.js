import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const handleDownloadPdf = async (elementId, fileName = 'ruxsatnomalar.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Calculate how many pages we need
    const pageHeight = pdf.internal.pageSize.getHeight();
    let heightLeft = pdfHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export const handlePrintPdf = async (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  try {
    // For printing, we rely more on the CSS @media print which is already optimized
    window.print();
  } catch (error) {
    console.error('Error printing document:', error);
  }
};
