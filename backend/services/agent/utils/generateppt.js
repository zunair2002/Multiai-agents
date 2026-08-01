import pptxgen from "pptxgenjs";

export const generatePPT = async (data) => {
  const pptx = new pptxgen();

  // 1. Title slide
  const titleSlide = pptx.addSlide();
  titleSlide.addText(data.title, {
    x: 0.5,
    y: 2.2,
    w: "90%",
    h: 1,
    align: "center",
    fontSize: 32,
    bold: true,
  });
  if (data.subtitle) {
    titleSlide.addText(data.subtitle, {
      x: 0.5,
      y: 3.2,
      w: "90%",
      h: 0.8,
      align: "center",
      fontSize: 16,
      color: "666666",
    });
  }

  // 2. One slide per section
  data.sections.forEach((section) => {
    const slide = pptx.addSlide();
    slide.addText(section.title, {
      x: 0.5,
      y: 0.4,
      w: "90%",
      h: 0.8,
      fontSize: 22,
      bold: true,
    });

    slide.addText(
      section.points.map((point) => ({ text: point, options: { bullet: true, breakLine: true } })),
      {
        x: 0.5,
        y: 1.4,
        w: "90%",
        h: 5,
        fontSize: 14,
        valign: "top",
      }
    );
  });

  const buffer = await pptx.write({ outputType: "nodebuffer" });
  return buffer;
};
