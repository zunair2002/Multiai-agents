import PDFDocument from "pdfkit";

export const generatePDF = async (data) => {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    // 1. Title
    doc.fontSize(24).text(data.title, { align: "center" });
    doc.moveDown();

    // 2. Subtitle
    if (data.subtitle) {
      doc.fontSize(14).fillColor("gray").text(data.subtitle, { align: "center" });
      doc.moveDown(2);
    }

    // 3. Sections & Points
    data.sections.forEach((section) => {
      doc.fillColor("black").fontSize(18).text(section.title);
      doc.moveDown(0.5);

      section.points.forEach((point) => {
        doc.fontSize(12).text(`• ${point}`, { indent: 20 });
      });
      
      doc.moveDown(); // Space between sections
    });

    doc.end();
  });
};