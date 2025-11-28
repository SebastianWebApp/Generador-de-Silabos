import html2pdf from "html2pdf.js";

export const generarPDF = () => {
  const elemento = document.querySelector(".preview-card") as HTMLElement;
  if (!elemento) return;

  // Guardar estilos originales del contenedor
  const estiloOriginal = {
    width: elemento.style.width,
    maxWidth: elemento.style.maxWidth,
    margin: elemento.style.margin,
    background: elemento.style.background,
  };

  // Seleccionar todos los campos editables
  const campos = elemento.querySelectorAll("input, textarea, select");

  // Guardar elementos ocultos con su display original
  const elementosOcultos: { el: HTMLElement; displayOriginal: string }[] = [];
  const spansCreados: HTMLElement[] = [];

  // Estilo temporal para quitar bordes, fondos, líneas y controlar saltos de página
  const styleTemporal = document.createElement("style");
  styleTemporal.textContent = `
    .row-container .flex:not(:last-child)::after { display: none !important; }
    .checkbox-radio-container, .checkbox-radio-container * {
      background: transparent !important;
      border: none !important;
      border-radius: 0 !important;
      box-shadow: none !important;
      outline: none !important;
    }
    input, textarea, select, button {
      -webkit-appearance: none !important;
      appearance: none !important;
      background: transparent !important;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }
  `;
  document.head.appendChild(styleTemporal);

  // Reemplazar campos por spans
  campos.forEach((campo) => {
    const campoEl = campo as HTMLElement; // Cast a HTMLElement
    elementosOcultos.push({
      el: campoEl,
      displayOriginal: campoEl.style.display,
    });

    let valor = "";

    // Determinar valor del campo
    if (
      (campoEl as HTMLInputElement).type === "checkbox" ||
      (campoEl as HTMLInputElement).type === "radio"
    ) {
      valor = (campoEl as HTMLInputElement).checked ? "☑" : "☐";
    } else {
      valor =
        (
          campoEl as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        ).value?.trim() || "";
    }

    // Crear span si hay valor
    console.log(valor);
    if (valor) {
      const span = document.createElement("span");

      if (campoEl.tagName === "TEXTAREA") {
        span.textContent = valor;
        span.style.whiteSpace = "pre-wrap";
        span.style.wordWrap = "break-word";
        span.style.display = "block";
      } else {
        span.textContent = valor;
        span.style.display = "inline-block";
      }

      const estiloCampo = getComputedStyle(campoEl);
      span.style.fontSize =
        (campoEl as HTMLInputElement).type === "checkbox" ||
        (campoEl as HTMLInputElement).type === "radio"
          ? "30px"
          : estiloCampo.fontSize;
      span.style.fontFamily = estiloCampo.fontFamily;
      span.style.fontWeight = estiloCampo.fontWeight;
      span.style.color = estiloCampo.color;
      span.style.lineHeight = estiloCampo.lineHeight;
      span.style.textAlign = estiloCampo.textAlign;
      span.style.padding = "0 6px";
      span.style.margin = "0 4px";

      campoEl.parentNode?.insertBefore(span, campoEl);
      campoEl.style.display = "none";

      spansCreados.push(span);
    } else {
      campoEl.style.display = "none";
    }
  });

  // Ajustar tamaño del div para html2pdf
  elemento.style.width = "1200px";
  elemento.style.maxWidth = "none";
  elemento.style.margin = "0 auto";
  elemento.style.background = "white";

  // Configuración de html2pdf
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const opt: any = {
    margin: [3, 3, 3, 3] as [number, number, number, number],
    filename: "Syllabus_Completo.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      backgroundColor: "#ffffff",
      width: 1200,
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    },
  };

  // Generar PDF
  html2pdf()
    .set(opt)
    .from(elemento)
    .save()
    .then(() => {
      // Restaurar estilos originales del contenedor
      elemento.style.width = estiloOriginal.width;
      elemento.style.maxWidth = estiloOriginal.maxWidth;
      elemento.style.margin = estiloOriginal.margin;
      elemento.style.background = estiloOriginal.background;

      // Restaurar display original de cada campo
      elementosOcultos.forEach(({ el, displayOriginal }) => {
        el.style.display = displayOriginal;
      });

      // Eliminar spans creados y estilo temporal
      spansCreados.forEach((span) => span.remove());
      document.head.removeChild(styleTemporal);
    });
};
