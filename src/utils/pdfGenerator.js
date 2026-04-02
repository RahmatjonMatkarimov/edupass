import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const createPdfInstance = async (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return null;
  
  const pages = element.querySelectorAll('.page-a4');
  if (pages.length === 0) return null;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    
    const canvas = await html2canvas(page, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const clonedPages = clonedDoc.querySelectorAll('.page-a4');
        clonedPages.forEach(p => {
          p.style.transform = 'none';
          p.style.margin = '0';
          p.style.boxShadow = 'none';
        });
      }
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgProps = pdf.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
    const yOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;
    
    if (i > 0) {
      pdf.addPage();
    }
    
    pdf.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, imgHeight);
  }
  
  return pdf;
};

export const handleDownloadPdf = async (elementId, fileName = 'ruxsatnomalar.pdf') => {
  try {
    const pdf = await createPdfInstance(elementId);
    if (pdf) {
      pdf.save(fileName);
    }
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
};

export const handlePrintPdf = async (elementId) => {
  try {
    const pdf = await createPdfInstance(elementId);
    if (!pdf) return;

    pdf.autoPrint();
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    const printFrame = document.createElement('iframe');
    printFrame.setAttribute('style', 'position:fixed; right:0; bottom:0; width:0; height:0; border:0;');
    printFrame.src = pdfUrl;
    document.body.appendChild(printFrame);
    
    printFrame.onload = () => {
      setTimeout(() => {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
        setTimeout(() => {
          document.body.removeChild(printFrame);
          URL.revokeObjectURL(pdfUrl);
        }, 1000);
      }, 100);
    };
    
  } catch (error) {
    console.error('Error printing PDF:', error);
  }
};
