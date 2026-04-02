import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const handleDownloadPdf = async (elementId, fileName = 'ruxsatnomalar.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const pages = element.querySelectorAll('.page-a4');
  if (pages.length === 0) return;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  try {
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      
      const canvas = await html2canvas(page, {
        scale: 4, // Very high quality for professional look
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate height according to aspect ratio to avoid stretching
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Center vertically if height is less than page height
      const yOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;
      
      if (i > 0) {
        pdf.addPage();
      }
      
      pdf.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, imgHeight);
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
