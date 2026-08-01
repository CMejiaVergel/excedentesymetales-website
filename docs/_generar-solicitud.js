/* Solicitud de material — Excedentes y Metales S.A.
   Identidad visual Voltac Systems (misma paleta y retícula de las propuestas). */

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  AlignmentType, PageBreak, VerticalAlign,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom,
  convertMillimetersToTwip,
} = require("docx");

const ASSETS = "C:/Users/mejia/AppData/Roaming/Claude/local-agent-mode-sessions/skills-plugin/390b0d17-04c0-4f4c-8ea5-1d627e24358c/30bb410a-fa16-4d83-90e6-627bb2677e70/skills/voltac-oferta-comercial/assets";

/* ── Paleta Voltac ─────────────────────────────────────────────────────── */
const AZUL_PRIM  = "0F4761";
const AZUL_LBL   = "215E99";
const AZUL_DEST  = "DAE9F7";
const AZUL_INS   = "4C94D8";
const AZUL_LINEA = "83CBEB";
const TEXTO      = "0A0F2C";
const TEXTO_MED  = "37474F";
const LINEA_TBL  = "E8E8E8";
const CAMPO      = "9FB3C8";
const CAMPO_ALT  = "9EB2C7";   // difiere en un dígito: evita que Word fusione bordes
const BLANCO     = "FFFFFF";
const VERDE      = "1E7A4C";
const ROJO       = "B03A2E";

const F   = "Lato";
const FSY = "Segoe UI Symbol";

/* ── Métricas ──────────────────────────────────────────────────────────── */
const PAGE   = { width: 12240, height: 15840 };
const MG     = convertMillimetersToTwip(22.7);
const ANCHO  = PAGE.width - MG * 2;          // 9666 dxa

const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const sinBordes = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
                    insideHorizontal: noBorder, insideVertical: noBorder };

/* ── Bloques base ──────────────────────────────────────────────────────── */
const t = (text, o = {}) => new TextRun({
  text, font: o.font || F, size: o.size || 20, bold: o.bold, italics: o.italics,
  color: o.color || TEXTO, characterSpacing: o.cs, break: o.break,
});

const p = (text, o = {}) => new Paragraph({
  children: Array.isArray(text) ? text : [t(text, o)],
  alignment: o.align || AlignmentType.JUSTIFIED,
  spacing: { before: o.before ?? 0, after: o.after ?? 140, line: o.line || 276 },
  indent: o.indent,
  border: o.border,
});

const vacio = (h = 120) => new Paragraph({ children: [t("", { size: 12 })], spacing: { after: h } });

/* Encabezado de sección: etiqueta + título + filete */
function seccion(num, titulo) {
  return [
    new Paragraph({
      children: [t(`SECCIÓN ${num}`, { bold: true, size: 18, color: AZUL_LBL, cs: 26 })],
      spacing: { before: 0, after: 60 },
    }),
    new Paragraph({
      children: [t(titulo, { size: 36, color: AZUL_PRIM })],
      spacing: { after: 100, line: 320 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: AZUL_LINEA, space: 8 } },
    }),
    vacio(120),
  ];
}

/* Subtítulo azul en negrita */
const sub = (txt, before = 220) => new Paragraph({
  children: [t(txt, { bold: true, size: 21, color: AZUL_PRIM })],
  spacing: { before, after: 100 },
});

/* Caja de insight: fondo #DAE9F7, borde izquierdo #4C94D8 */
function caja(titulo, cuerpo, opts = {}) {
  const hijos = [];
  if (titulo) hijos.push(new Paragraph({
    children: [t(titulo, { bold: true, size: 20, color: AZUL_PRIM })],
    spacing: { after: cuerpo ? 80 : 0 },
  }));
  (Array.isArray(cuerpo) ? cuerpo : cuerpo ? [cuerpo] : []).forEach((c, i, a) =>
    hijos.push(new Paragraph({
      children: typeof c === "string" ? [t(c, { size: 19, color: TEXTO })] : c,
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: i === a.length - 1 ? 0 : 100, line: 264 },
    })));

  return new Table({
    width: { size: ANCHO, type: WidthType.DXA },
    columnWidths: [ANCHO],
    borders: {
      top: noBorder, bottom: noBorder, right: noBorder,
      insideHorizontal: noBorder, insideVertical: noBorder,
      left: { style: BorderStyle.SINGLE, size: 24, color: opts.borde || AZUL_INS },
    },
    rows: [new TableRow({ children: [new TableCell({
      width: { size: ANCHO, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: opts.fondo || AZUL_DEST },
      margins: { top: 170, bottom: 170, left: 220, right: 200 },
      children: hijos,
    })] })],
  });
}

/* Campo diligenciable: texto + línea inferior.
   Word fusiona los bordes de párrafos consecutivos con formato idéntico y deja
   de dibujar las líneas intermedias. Alternar el color en un dígito —
   imperceptible a la vista— impide esa fusión. */
let _alt = 0;
const lineaCampo = () => ({
  bottom: { style: BorderStyle.SINGLE, size: 4, color: (_alt ^= 1) ? CAMPO : CAMPO_ALT, space: 6 },
});

function campo(label, lineas = 1) {
  const out = [new Paragraph({
    children: [t(label, { size: 20 })],
    border: lineaCampo(),
    spacing: { before: 150, after: lineas > 1 ? 0 : 60 },
  })];
  for (let i = 1; i < lineas; i++) {
    out.push(new Paragraph({
      children: [t("", { size: 20 })],
      border: lineaCampo(),
      spacing: { before: 280, after: i === lineas - 1 ? 60 : 0 },
    }));
  }
  return out;
}

/* Casilla de verificación */
function casilla(txt, o = {}) {
  const hijos = [t("☐  ", { font: FSY, size: 22, color: AZUL_PRIM })];
  if (o.bold) hijos.push(t(txt, { bold: true, size: 20 }));
  else hijos.push(t(txt, { size: 20 }));
  if (o.extra) hijos.push(t(o.extra, { size: 20, color: TEXTO_MED }));
  return new Paragraph({
    children: hijos,
    alignment: AlignmentType.LEFT,
    spacing: { before: o.before ?? 0, after: o.after ?? 110, line: 264 },
    indent: { left: o.left ?? 0, hanging: 0 },
  });
}

/* Ítem numerado de la lista de fotos: casilla + número + título + descripción */
function foto(num, titulo, desc) {
  return new Paragraph({
    children: [
      t("☐  ", { font: FSY, size: 22, color: AZUL_PRIM }),
      t(`${num}. ${titulo}  `, { bold: true, size: 20, color: AZUL_PRIM }),
      t(desc, { size: 19, color: TEXTO }),
    ],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 150, line: 264 },
    indent: { left: 340, hanging: 340 },
  });
}

/* Tabla genérica */
function tabla(filas, anchos, o = {}) {
  const total = anchos.reduce((a, b) => a + b, 0);
  const esc = anchos.map(a => Math.round(a * ANCHO / total));
  return new Table({
    width: { size: ANCHO, type: WidthType.DXA },
    columnWidths: esc,
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 4, color: LINEA_TBL },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: LINEA_TBL },
      left: noBorder, right: noBorder,
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: LINEA_TBL },
      insideVertical: noBorder,
    },
    rows: filas.map((fila, fi) => new TableRow({
      tableHeader: fi === 0 && o.encabezado,
      children: fila.map((celda, ci) => new TableCell({
        width: { size: esc[ci], type: WidthType.DXA },
        shading: fi === 0 && o.encabezado
          ? { type: ShadingType.CLEAR, fill: AZUL_DEST } : undefined,
        margins: { top: 110, bottom: 110, left: ci === 0 ? 60 : 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: (Array.isArray(celda) ? celda : [celda]).map(c =>
          typeof c === "string"
            ? new Paragraph({
                children: [t(c, {
                  size: 19,
                  bold: fi === 0 && o.encabezado,
                  color: fi === 0 && o.encabezado ? AZUL_PRIM : TEXTO,
                })],
                spacing: { after: 0, line: 258 },
              })
            : c),
      })),
    })),
  });
}

/* Celda con casillas Sí / No */
const siNo = () => new Paragraph({
  children: [
    t("☐", { font: FSY, size: 22, color: AZUL_PRIM }), t(" Sí     ", { size: 19 }),
    t("☐", { font: FSY, size: 22, color: AZUL_PRIM }), t(" No", { size: 19 }),
  ],
  spacing: { after: 0 },
});

/* Fondo de página (imagen flotante detrás del texto, en el encabezado) */
function fondo(archivo) {
  return new Header({ children: [new Paragraph({
    spacing: { before: 0, after: 0, line: 20 },
    children: [new ImageRun({
      type: "png",
      data: fs.readFileSync(path.join(ASSETS, archivo)),
      transformation: { width: 816, height: 1056 },   // 8.5" × 11" a 96 ppp
      floating: {
        horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, offset: 0 },
        verticalPosition:   { relative: VerticalPositionRelativeFrom.PAGE,   offset: 0 },
        behindDocument: true, allowOverlap: true, zIndex: 0,
      },
    })],
  })] });
}

const propsPagina = {
  page: {
    size: PAGE,
    margin: { top: MG, right: MG, bottom: MG, left: MG, header: 0, footer: 340 },
  },
};

const saltoPagina = new Paragraph({ children: [new PageBreak()] });

/* ══════════════════════════════════════════════════════════════════════ */
/*  PORTADA                                                                */
/* ══════════════════════════════════════════════════════════════════════ */
const portada = [
  new Paragraph({ children: [t("", { size: 20 })], spacing: { before: 4600, after: 0 } }),
  new Paragraph({
    children: [t("SOLICITUD DE MATERIAL", { bold: true, size: 22, color: AZUL_LINEA, cs: 30 })],
    spacing: { after: 120 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: AZUL_LINEA, space: 10 } },
  }),
  vacio(180),
  new Paragraph({
    children: [t("COMERCIALIZADORA", { bold: true, size: 46, color: BLANCO })],
    spacing: { after: 0, line: 440 }, alignment: AlignmentType.LEFT,
  }),
  new Paragraph({
    children: [t("EXCEDENTES Y METALES S.A.", { bold: true, size: 46, color: BLANCO })],
    spacing: { after: 260, line: 440 }, alignment: AlignmentType.LEFT,
  }),
  new Paragraph({
    children: [t("Información y material requerido para completar el sitio web corporativo",
                 { size: 24, color: AZUL_LINEA })],
    spacing: { after: 0, line: 340 }, alignment: AlignmentType.LEFT,
  }),

  new Paragraph({ children: [t("", { size: 20 })], spacing: { before: 2600, after: 0 } }),
  ...[
    ["DOCUMENTO", "VS-SM-EYM-26-001"],
    ["FECHA", "1 de agosto de 2026"],
    ["ELABORADO POR", "Voltac Systems S.A.S."],
  ].map(([k, v]) => new Paragraph({
    children: [
      t(k.padEnd(0), { bold: true, size: 16, color: AZUL_LINEA, cs: 24 }),
      t("      ", { size: 16 }),
      t(v, { size: 18, color: BLANCO }),
    ],
    spacing: { after: 90 },
  })),
];

/* ══════════════════════════════════════════════════════════════════════ */
/*  CONTENIDO                                                              */
/* ══════════════════════════════════════════════════════════════════════ */
const C = [];
const add = (...x) => x.forEach(i => C.push(i));
const pagina = () => C.push(saltoPagina);

/* ── Introducción ─────────────────────────────────────────────────────── */
add(...seccion("00", "Cómo funciona este documento"));
add(p("Su página web ya está construida y funcionando. Para poder publicarla solo falta reemplazar las fotografías y los textos de prueba por los reales de la empresa. Este documento reúne, en un solo lugar, todo lo que necesitamos de ustedes."));
add(caja("El documento tiene dos partes", [
  "PARTE 1 — Fotos. Una lista de las tomas que necesitamos, con una casilla para ir marcando las que ya tienen listas.",
  "PARTE 2 — Datos. Campos en blanco para que escriban la información de la empresa.",
]));
add(vacio(200));
add(p([
  t("Puede llenarlo directamente en el computador o imprimirlo y escribirlo a mano. ", { size: 20 }),
  t("Si algún punto no aplica o no lo tienen, escriba «no aplica» y seguimos adelante", { bold: true, size: 20, color: AZUL_PRIM }),
  t(": casi todo tiene una solución alternativa que le explicamos al final.", { size: 20 }),
]));
add(sub("Cuánto tiempo toma"));
add(p("Llenar los datos toma alrededor de 20 minutos. Las fotografías dependen de cuándo puedan tomarlas. No es necesario entregarlo todo de una vez: pueden enviarnos primero las fotos y después los datos, o al revés."));
add(vacio(160));
add(caja("¿Dudas mientras lo llenan?",
  "Escríbanos por WhatsApp o correo en cualquier momento y lo resolvemos. Es preferible una pregunta rápida a dejar un campo en blanco.",
  { fondo: "F2F6FA", borde: AZUL_LINEA }));

pagina();

/* ── Sección 01: cómo tomar las fotos ─────────────────────────────────── */
add(...seccion("01", "Cómo tomar y enviar las fotos"));
add(p("Estas indicaciones aplican a todas las fotografías de la lista. Seguirlas evita tener que repetir la sesión."));

add(sub("Sí"));
[
  "Celular moderno o cámara, con la resolución configurada al máximo.",
  "Horizontales: el celular acostado, nunca parado.",
  "De día, con luz natural. Idealmente entre 8 y 10 de la mañana o entre 3 y 5 de la tarde.",
  "Todo el personal que aparezca, con casco, gafas, botas y chaleco reflectivo.",
  "Enviarlas por Google Drive, OneDrive o WeTransfer.",
].forEach(x => add(new Paragraph({
  children: [t("✓  ", { font: FSY, size: 20, color: VERDE, bold: true }), t(x, { size: 19 })],
  spacing: { after: 90, line: 264 }, indent: { left: 300, hanging: 300 },
})));

add(sub("No"));
[
  "No las manden por WhatsApp. WhatsApp reduce la calidad a la mitad y quedan inservibles para la página.",
  "No las peguen dentro de un Word o un PowerPoint.",
  "No las recorten ni les apliquen filtros. De eso nos encargamos nosotros.",
  "Nada de fotos borrosas, oscuras o con la fecha impresa en la esquina.",
].forEach(x => add(new Paragraph({
  children: [t("✕  ", { font: FSY, size: 20, color: ROJO, bold: true }), t(x, { size: 19 })],
  spacing: { after: 90, line: 264 }, indent: { left: 300, hanging: 300 },
})));

add(vacio(180));
add(caja("De cada punto de la lista, envíen 3 o 4 fotos distintas",
  "Diferentes ángulos o momentos del mismo tema. Nosotros elegimos la que mejor funcione en la página."));
add(vacio(200));
add(caja("Una recomendación",
  "Si pueden contratar un fotógrafo por medio día en la sede, se resuelve toda esta lista en una sola jornada y el resultado es notablemente superior. Si no es viable, con un celular moderno también se logra un buen resultado: luz natural, cámara horizontal y limpiar el lente antes de disparar.",
  { fondo: "F2F6FA", borde: AZUL_LINEA }));

pagina();

/* ── Sección 02: lista de fotos ───────────────────────────────────────── */
add(...seccion("02", "Las fotos que necesitamos"));

add(sub("Las tres más importantes", 0));
add(p("Son las que se ven a pantalla completa apenas alguien entra a la página.", { after: 180 }));
add(foto(1, "El patio de operaciones.", "Vista amplia, con el material apilado y clasificado. Si hay una máquina trabajando al fondo, mejor."));
add(foto(2, "Maquinaria trabajando.", "Una máquina levantando o moviendo material, en plena maniobra. No estacionada."));
add(foto(3, "Cargue de tubería.", "Maquinaria manipulando tubería, con el personal dirigiendo la maniobra a distancia segura."));
add(caja("Importante en estas tres",
  "Procuren que la máquina o el sujeto principal quede hacia el lado derecho de la foto. Sobre el lado izquierdo va el texto de la página, y si el sujeto queda centrado, las letras se le montan encima."));

add(sub("La empresa"));
add(foto(4, "La sede.", "La fachada, la entrada con el aviso de la empresa, o una vista general del patio con la báscula."));
add(foto(5, "El equipo de trabajo.", "Todos juntos, de frente, sonriendo, con la dotación puesta. Al aire libre, con el patio o la maquinaria de fondo. Que se les vean bien las caras: no muy lejos."));
add(foto(6, "Los fundadores (opcional).", "Los hermanos Naranjo juntos. Una empresa familiar de 30 años con la foto de sus fundadores transmite mucha más confianza que cualquier texto."));

pagina();

add(sub("Los servicios", 0));
add(p("De cada servicio necesitamos dos fotos diferentes: una de cerca y una más amplia.", { after: 180 }));
add(foto(7,  "Material ferroso.", "Chatarra de hierro y acero clasificada: estructuras, láminas, perfiles, viruta. Que se vea el volumen y que está ordenado, no revuelto."));
add(foto(8,  "Material no ferroso.", "Cobre, aluminio y bronce separados por tipo, en canastillas o pilas distintas. Un primer plano de cable de cobre funciona muy bien."));
add(foto(9,  "La maquinaria.", "Los equipos propios, limpios. Si tienen varios, una foto de toda la flota reunida."));
add(foto(10, "Desmonte industrial.", "Una estructura siendo desarmada, o trabajo de oxicorte. Es la foto más impactante que puede tener la página."));
add(foto(11, "Tubería.", "Tubería de gran diámetro siendo levantada o estibada, con los aparejos visibles."));
add(foto(12, "Excedentes industriales.", "Una zona de acopio ordenada, contenedores de residuos, o el camión cargando."));

add(sub("Los proyectos"));
add(p("Una foto de cada proyecto que quieran mostrar como caso de éxito.", { after: 180 }));
add(foto(13, "Álcalis de Colombia", ""));
add(foto(14, "Ecopetrol", ""));
add(foto(15, "Tubos del Caribe", ""));
add(foto(16, "Drummond", ""));
add(foto(17, "Cerro Matoso", ""));
add(foto(18, "Otro proyecto:", "_______________________________________________"));
add(caja("Si de algún proyecto no tienen fotos",
  "Avísennos y lo reemplazamos por otro que sí las tenga. Es mejor mostrar cuatro proyectos con registro fotográfico real que seis con imágenes genéricas."));

add(sub("Otros archivos"));
add(foto("A", "Logo de la empresa en original.", "Si conservan el archivo del diseñador (.ai, .eps, .cdr o .svg), envíenlo. El logo que estamos usando lo reconstruimos a partir de una foto del aviso; funciona bien, pero el original se ve más nítido en pantallas modernas."));
add(foto("B", "Sellos de certificaciones", "(ISO, RUC u otras), si las tienen vigentes y quieren mostrarlas."));

pagina();

/* ── Sección 03: contacto ─────────────────────────────────────────────── */
add(...seccion("03", "Datos de contacto"));
add(sub("Confirme si estos datos están correctos", 0));
add(vacio(100));
add(tabla([
  ["Dato", "Lo que tenemos hoy", "¿Correcto?"],
  ["Teléfono de ventas", "+57 310 413 7057", siNo()],
  ["Teléfono de operaciones", "+57 320 565 7439", siNo()],
  ["Dirección", "Variante Mamonal – Turbaco, Cra 67 Bo. 3, Sector Policarpa", siNo()],
  ["Ciudad", "Cartagena de Indias, Bolívar", siNo()],
], [26, 48, 26], { encabezado: true }));
add(vacio(120));
add(...campo("Si algo hay que corregir, escríbalo aquí:", 2));

add(sub("Y complete estos, que no tenemos"));
add(...campo("Correo de ventas:"));
add(...campo("Correo general de la empresa:"));
add(...campo("¿A qué correo deben llegar las solicitudes que la gente envíe desde la página?"));
add(...campo("¿Alguien más debe recibir copia?"));
add(...campo("Teléfono fijo (si tienen):"));

add(sub("Horario de atención al público"));
add(...campo("Lunes a viernes, de _______________ a _______________"));
add(...campo("Sábados, de _______________ a _______________"));
add(casilla("No atendemos sábados", { before: 60 }));

pagina();

/* ── Sección 04: redes y ubicación ────────────────────────────────────── */
add(...seccion("04", "Redes sociales y ubicación"));
add(p("Escriba el enlace completo de cada red. Si no tienen alguna, escriba «no tenemos»: el ícono simplemente no aparecerá en la página, sin dejar espacios vacíos."));
add(...campo("Facebook:"));
add(...campo("Instagram:"));
add(...campo("LinkedIn:"));
add(...campo("YouTube o TikTok:"));
add(...campo("Ficha de Google (Google Business):"));

add(sub("Ubicación exacta en el mapa"));
add(p("La página incluye un mapa de Google. Hoy busca por la dirección y cae en el sector correcto, pero no en la portería exacta."));
add(caja("Cómo obtener el punto exacto",
  "Párese en la entrada de la empresa, abra Google Maps en el celular, mantenga el dedo presionado sobre el punto donde está y copie las coordenadas que aparecen en pantalla."));
add(vacio(140));
add(...campo("Coordenadas:"));
add(...campo("¿Tienen otras sedes o patios? ¿Cuáles?", 2));

pagina();

/* ── Sección 05: datos legales ────────────────────────────────────────── */
add(...seccion("05", "Datos legales de la empresa"));
add(p("Estos datos aparecen en el pie de página del sitio y en la política de tratamiento de datos personales."));
add(...campo("NIT (con dígito de verificación):"));
add(...campo("Matrícula mercantil (opcional):"));
add(...campo("Nombre del representante legal:"));
add(sub("¿Quién atiende las peticiones sobre datos personales?"));
add(...campo("Nombre:"));
add(...campo("Correo:"));
add(sub("Certificaciones vigentes"));
add(...campo("¿Cuáles tienen? (ISO 9001, ISO 14001, ISO 45001, RUC, licencias ambientales…)", 2));
add(vacio(160));
add(caja("Un punto que requiere revisión de su parte",
  "Le enviamos junto con este documento el texto de la política de tratamiento de datos personales que redactamos para la página. Es un borrador base y debe ser revisado por su abogado o su contador antes de publicarlo, porque compromete legalmente a la empresa.",
  { fondo: "FDF3E7", borde: "E8A33D" }));
add(vacio(140));
add(casilla("Confirmamos que nuestro abogado o contador revisó y aprobó ese texto."));

pagina();

/* ── Sección 06: cifra e historia ─────────────────────────────────────── */
add(...seccion("06", "Un número y la historia de la empresa"));
add(sub("La cifra de la página de inicio", 0));
add(p("La página muestra cuatro cifras grandes: los años de trayectoria, el año de fundación, la cobertura nacional, y una cuarta que necesitamos que ustedes definan. Elija la que puedan sustentar y escriba el valor."));
add(casilla("Toneladas de material que recuperamos al año:", { extra: "   ______________" }));
add(casilla("Número de clientes activos:", { extra: "   ______________" }));
add(casilla("Número de empleados:", { extra: "   ______________" }));
add(casilla("Proyectos de desmonte ejecutados:", { extra: "   ______________" }));
add(casilla("Otro: ____________________________________", { extra: "   Valor: ____________" }));
add(casilla("Preferimos no poner ninguna cifra."));
add(vacio(150));
add(caja("Debe ser un número real y verificable",
  "Si un cliente o un competidor pregunta, la empresa tiene que poder respaldarlo. Un número inflado en la página de inicio es un riesgo reputacional innecesario.",
  { fondo: "FDF3E7", borde: "E8A33D" }));

add(sub("Los años de la historia"));
add(p("Tenemos la reseña histórica que aparece en su Plan de Inducción, pero cuatro hitos distintos figuran con el mismo año 1995, lo que parece un error de digitación. Ayúdenos con el año aproximado de cada uno: con el año basta, no necesitamos la fecha exacta."));
add(vacio(100));
add(tabla([
  ["Momento de la historia", "Año"],
  ["Depósito El Paisa y Depósito El Retorno (los inicios)", "1995 · ¿correcto?  ____________"],
  ["Se constituye la sociedad", "1995 · ¿correcto?  ____________"],
  ["Primer proyecto: Álcalis de Colombia", "____________"],
  ["Llegan Ecopetrol, Drummond y Cerro Matoso", "____________"],
  ["Nace el servicio de tubería con Tubos del Caribe", "____________"],
], [58, 42], { encabezado: true }));
add(vacio(160));
add(...campo("¿Hay algún otro momento importante que quieran incluir? (la primera máquina propia, la sede actual, una certificación…)", 3));

pagina();

/* ── Sección 07: clientes ─────────────────────────────────────────────── */
add(...seccion("07", "Clientes"));
add(p("La página tiene un espacio para mostrar los logos de sus clientes. Escriba los nombres de las empresas que quieren mostrar: con el nombre completo nosotros buscamos el logo. Mínimo 6, ideal entre 10 y 18."));
add(vacio(120));
{
  const filas = [];
  for (let i = 0; i < 6; i++) {
    filas.push([
      `${i + 1}.  ______________________________________`,
      `${i + 7}.  ______________________________________`,
    ]);
  }
  add(tabla(filas, [50, 50]));
}
add(vacio(200));
add(caja("Un punto importante antes de decidir", [
  "Publicar el logo de otra empresa en su página web requiere el permiso de esa empresa. No basta con haberle prestado el servicio.",
  "Compañías grandes como Ecopetrol, Drummond o Cerro Matoso tienen políticas estrictas sobre el uso de su marca, y su departamento jurídico puede pedir que se retire del sitio.",
], { fondo: "FDF3E7", borde: "E8A33D" }));
add(vacio(180));
add(sub("Elijan cómo prefieren manejarlo", 0));
add(casilla("Pedimos autorización a cada cliente.", { bold: true, extra: "  Un correo del área de comunicaciones basta. Es lo correcto y lo que recomendamos.", after: 140 }));
add(casilla("Solo mencionamos los nombres en texto,", { bold: true, extra: "  sin los logos. Menos vistoso, pero sin riesgo.", after: 140 }));
add(casilla("No nombramos a nadie.", { bold: true, extra: "  Ponemos algo como «empresas del sector minero-energético». Es lo que se usa cuando no hay autorización.", after: 140 }));

pagina();

/* ── Sección 08: testimonios ──────────────────────────────────────────── */
add(...seccion("08", "Testimonios de clientes"));
add(p("La página tiene espacio para tres comentarios de clientes. Hoy están con textos de ejemplo que escribimos nosotros y hay que reemplazarlos por comentarios reales."));
add(caja("Cómo conseguirlos en una tarde",
  "Llame a tres clientes de confianza y hágales dos preguntas: «¿qué problema le resolvimos?» y «¿qué destacaría del servicio?». Con esas respuestas nosotros redactamos el texto y se lo enviamos para que ellos contesten «aprobado» por correo."));
add(vacio(200));

for (let i = 1; i <= 3; i++) {
  if (i === 3) pagina();
  add(sub(`Testimonio ${i}`, i === 1 || i === 3 ? 0 : 300));
  add(...campo("Nombre completo:"));
  add(...campo("Cargo:"));
  add(...campo("Empresa:"));
  add(...campo("Lo que dijo:", 3));
  add(casilla("Autorizó por escrito que publiquemos su nombre y su empresa.", { before: 60 }));
}
add(vacio(220));
add(casilla("No tenemos testimonios por ahora.", { bold: true, extra: "  En ese caso quitamos la sección. Es preferible a inventarlos: un cliente informado lo nota de inmediato." }));

pagina();

/* ── Sección 09: proyectos ────────────────────────────────────────────── */
add(...seccion("09", "Proyectos destacados"));
add(p("Llene una ficha por cada proyecto que quieran mostrar. Con cuatro es suficiente; con seis la sección queda completa. Si necesitan más fichas, copien el mismo formato en una hoja aparte."));
add(caja("Sobre las dos cifras de cada proyecto",
  "Cada ficha muestra dos números grandes. Sirven, por ejemplo: toneladas movidas, días de ejecución, metros de tubería manipulados, equipos desmontados, o accidentes registrados. Si ese último número es cero, es un dato muy potente."));

for (let i = 1; i <= 4; i++) {
  if (i > 1) pagina();
  add(sub(`Proyecto ${i}`, i === 1 ? 300 : 0));
  add(...campo("Cliente:"));
  add(...campo("Año:                                                       Ciudad o planta:"));
  add(...campo("¿Qué servicio prestamos?"));
  add(...campo("¿Qué se hizo? (tres o cuatro líneas)", 4));
  add(...campo("Cifra 1: ___________________     ¿de qué? ______________________________"));
  add(...campo("Cifra 2: ___________________     ¿de qué? ______________________________"));
  add(casilla("El cliente autoriza que lo nombremos en la página.", { before: 60 }));
}

pagina();

/* ── Sección 10: servicios ────────────────────────────────────────────── */
add(...seccion("10", "Servicios y maquinaria"));
add(p("Armamos seis servicios a partir de la información que nos entregaron. Confirme si están bien planteados."));
add(vacio(120));
add(tabla([
  ["Servicio", "¿Lo prestan hoy?"],
  ["1.  Compra de material ferroso", siNo()],
  ["2.  Compra de material no ferroso", siNo()],
  ["3.  Alquiler de maquinaria amarilla", siNo()],
  ["4.  Desmonte y desmantelamiento industrial", siNo()],
  ["5.  Cargue, descargue y traslado de tubería", siNo()],
  ["6.  Gestión de excedentes industriales", siNo()],
], [70, 30], { encabezado: true }));
add(vacio(140));
add(...campo("¿Falta algún servicio que presten y no esté en la lista?", 2));

add(sub("Preguntas sueltas"));
add(...campo("¿Compran papel, cartón y plástico, o solamente metales?"));
add(...campo("¿Atienden fuera de Bolívar? (todo el país / solo la costa / solo Bolívar)"));
add(vacio(100));
add(tabla([
  ["¿Tienen báscula certificada en la sede?", siNo()],
  ["¿Le compran material a personas naturales que llegan al patio?", siNo()],
  ["¿Manejan residuos peligrosos (RESPEL)?", siNo()],
  ["¿Prestan servicio de transporte por separado?", siNo()],
], [70, 30]));

pagina();

add(sub("La maquinaria que alquilan", 0));
add(p("Esta es la información que más nos hace falta. La página de alquiler está muy genérica porque no tenemos equipos concretos, y quien busca alquilar una máquina quiere ver capacidades, no adjetivos."));
add(vacio(140));
{
  const filas = [["Tipo de equipo", "Marca y modelo", "Capacidad", "Cuántos"]];
  for (let i = 0; i < 9; i++) filas.push(["", "", "", ""]);
  add(tabla(filas, [32, 30, 24, 14], { encabezado: true }));
}

pagina();

/* ── Sección 11: dominio ──────────────────────────────────────────────── */
add(...seccion("11", "Dominio, correo y contraseñas"));
add(p("Esta sección define dónde va a vivir la página y cómo la publicamos."));
add(...campo("¿Ya tienen un dominio comprado? ¿Cuál es?"));
add(...campo("¿Dónde lo compraron? (GoDaddy, Hostinger, Colombia Hosting, otro)"));
add(vacio(100));
add(tabla([
  ["¿Tienen correos con el dominio de la empresa? (tipo nombre@excedentesymetales.com)", siNo()],
  ["¿Tienen una página web anterior?", siNo()],
], [72, 28]));
add(vacio(160));
add(sub("Si tienen correos corporativos, ¿con qué servicio?", 0));
add(casilla("Gmail / Google Workspace"));
add(casilla("Outlook / Microsoft 365"));
add(casilla("El correo del mismo hosting"));
add(casilla("No sabemos"));
add(vacio(150));
add(caja("Por qué preguntamos esto",
  "Si movemos la configuración del dominio sin saber dónde está alojado el correo, se puede caer el correo electrónico de toda la empresa. Con esta respuesta lo evitamos.",
  { fondo: "FDF3E7", borde: "E8A33D" }));

add(sub("Sobre las contraseñas"));
add(p([
  t("No nos envíen usuarios ni contraseñas por WhatsApp ni por correo electrónico. ", { bold: true, size: 20, color: AZUL_PRIM }),
  t("Quedan guardados de forma permanente en esas conversaciones y fuera de su control. En vez de eso, elijan una de estas opciones:", { size: 20 }),
]));
add(casilla("Nos dan acceso como usuario adicional", { bold: true, extra: "  desde el panel de su proveedor. Ustedes mantienen el control y pueden quitárnoslo cuando quieran. Es lo que recomendamos.", after: 140 }));
add(casilla("Nos lo envían por un enlace que se autodestruye", { bold: true, extra: "  después de leerlo. Les indicamos cómo generarlo.", after: 140 }));
add(casilla("Ustedes hacen los cambios", { bold: true, extra: "  y nosotros les indicamos paso a paso qué configurar.", after: 140 }));

pagina();

/* ── Sección 12: cierre ───────────────────────────────────────────────── */
add(...seccion("12", "Si algo no lo tienen"));
add(p("No pasa nada. La página ya funciona; cada punto que falte tiene una salida:"));
add(vacio(120));
add(tabla([
  ["Si falta…", "Qué hacemos"],
  ["Los logos de clientes", "Quitamos la sección. La página funciona igual."],
  ["Los testimonios", "Quitamos la sección."],
  ["Las redes sociales", "Los íconos desaparecen solos, sin dejar espacios vacíos."],
  ["La cifra de la página de inicio", "La reemplazamos por un texto."],
  ["El logo original del diseñador", "Seguimos con la versión que reconstruimos."],
  ["El inventario de maquinaria", "La página de alquiler queda genérica y vende menos."],
], [38, 62], { encabezado: true }));
add(vacio(200));
add(caja("Lo único que sí necesitamos sin falta son las fotografías",
  "Sin ellas la página no se puede publicar, porque hoy tiene imágenes de relleno que dicen literalmente «FOTO PENDIENTE».",
  { fondo: "FDF3E7", borde: "E8A33D" }));

add(sub("Lo mínimo para publicar"));
add(p("Si tienen poco tiempo, empiecen por estos cuatro puntos. Con eso publicamos, y el resto lo vamos completando después sin necesidad de bajar la página."));
add(casilla("Las 18 fotos de la Parte 1", { bold: true, after: 130 }));
add(casilla("Los correos de la empresa", { bold: true, extra: "  (Sección 03)", after: 130 }));
add(casilla("El NIT", { bold: true, extra: "  (Sección 05)", after: 130 }));
add(casilla("El dominio y dónde está alojado el correo", { bold: true, extra: "  (Sección 11)", after: 130 }));

add(vacio(400));
add(new Paragraph({
  children: [t("Voltac Systems S.A.S.", { bold: true, size: 20, color: AZUL_PRIM })],
  spacing: { after: 60 },
  border: { top: { style: BorderStyle.SINGLE, size: 8, color: AZUL_LINEA, space: 12 } },
}));
add(p([t("NIT 901.734.603  ·  Cartagena de Indias, Colombia", { size: 18, color: TEXTO_MED })], { after: 40 }));
add(p([t("sales@voltac.com.co", { size: 18, color: TEXTO_MED })], { after: 0 }));

/* ══════════════════════════════════════════════════════════════════════ */
const doc = new Document({
  creator: "Voltac Systems S.A.S.",
  title: "Solicitud de material — Excedentes y Metales S.A.",
  description: "Información y material requerido para completar el sitio web corporativo",
  styles: {
    default: {
      document: { run: { font: F, size: 20, color: TEXTO } },
    },
  },
  sections: [
    { properties: { page: { size: PAGE, margin: { top: MG, right: MG, bottom: MG, left: MG, header: 0, footer: 0 } } },
      headers: { default: fondo("cover_template_letter.png") },
      children: portada },
    { properties: propsPagina,
      headers: { default: fondo("content_template.png") },
      children: C },
  ],
});

const salida = process.argv[2] || "salida.docx";
Packer.toBuffer(doc).then(b => {
  fs.writeFileSync(salida, b);
  console.log("OK →", salida, (b.length / 1024).toFixed(0) + " KB");
});
