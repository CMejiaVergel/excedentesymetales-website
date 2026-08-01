# Sitio web — Comercializadora Excedentes y Metales S.A.

Primera versión (bosquejo funcional) del sitio corporativo.
HTML + CSS + JavaScript estáticos, **sin build ni dependencias**: se sube por FTP a
cualquier hosting y funciona. También puede abrirse con doble clic sobre `index.html`.

---

## 1. Estructura

```
Website/
├── index.html                  Inicio
├── nosotros.html               Historia, misión, visión, valores, políticas
├── servicios.html              Listado de servicios + proceso + FAQ
├── casos-de-exito.html         Proyectos, reseñas y cuadrícula de clientes
├── contacto.html               Formulario, datos y mapa
├── politica-de-datos.html      Ley 1581 de 2012 (BORRADOR, requiere revisión jurídica)
├── servicios/
│   ├── materiales-ferrosos.html
│   ├── materiales-no-ferrosos.html
│   ├── alquiler-maquinaria.html
│   ├── desmonte-industrial.html
│   ├── manejo-tuberia.html
│   └── excedentes-industriales.html
├── assets/
│   ├── css/styles.css          Todo el diseño (un solo archivo, comentado por secciones)
│   ├── js/config.js            ⭐ DATOS DEL SITIO — es el archivo que se edita
│   ├── js/main.js              Comportamiento (carrusel, menú, formularios, mapa…)
│   └── img/                    Logos, placeholders de fotos y logos de clientes
├── favicon.ico / favicon.png
├── robots.txt
└── sitemap.xml
```

---

## 2. Cómo se actualiza el contenido

### Teléfonos, correos, redes sociales, horario, dirección

Todo está en **`assets/js/config.js`**. Se cambia ahí una sola vez y se actualiza en
las 12 páginas automáticamente (los valores del HTML son solo respaldo).

### Cuadrícula de logos de clientes

1. Subir el logo (PNG con fondo transparente o blanco, ~260 × 120 px) a `assets/img/clientes/`.
2. Agregar una línea en el arreglo `clientes` de `config.js`:

```js
{ nombre: 'Ecopetrol', logo: 'assets/img/clientes/ecopetrol.png' },
```

La cuadrícula aparece en **Casos de éxito** y la cinta en movimiento en el **Inicio**.

> El requerimiento pide que **el cliente pueda actualizar los logos mediante formulario**.
> Eso necesita un backend con panel de administración; queda para la siguiente fase
> (ver sección 5). Mientras tanto, la edición del archivo cumple la misma función.

### Formulario de contacto

Hoy funciona en **modo provisional**: al enviar, abre el gestor de correo del visitante
con la solicitud ya redactada. Para que envíe de verdad hay que definir el hosting y
poner el destino en `config.js`:

```js
formulario: { endpoint: '/enviar.php' }   // o la URL del servicio que se contrate
```

El formulario ya incluye validación, casilla de autorización de datos (Ley 1581) y
trampa anti-spam.

### Fotografías

Todas las imágenes con la marca de agua **"FOTO PENDIENTE"** son marcadores de posición.
Para reemplazarlas basta con subir el archivo real **con el mismo nombre** (cambiando la
extensión a `.jpg`) y ajustar la ruta en el HTML.

| Archivo | Uso | Tamaño sugerido |
|---|---|---|
| `assets/img/hero-1..3.svg` | Banner en movimiento del inicio | 1920 × 1000 px |
| `assets/img/servicios/*.svg` | Tarjetas de servicio | 900 × 620 px |
| `assets/img/servicios/*-hero.svg` | Cabecera de cada página de servicio | 1920 × 720 px |
| `assets/img/proyectos/proyecto-*.svg` | Registro fotográfico de casos de éxito | 900 × 620 px |
| `assets/img/nosotros-*.svg` | Sede y equipo de trabajo | 1100 × 780 px |

---

## 3. Requerimientos cotizados y su estado

| Requerimiento | Estado |
|---|---|
| 5 páginas principales (Inicio, Nosotros, Servicios, Contacto, Casos de éxito) | ✅ Listas |
| Banner en movimiento | ✅ Carrusel de 3 diapositivas, autoavance y controles |
| Links a redes sociales | ⚠️ Íconos listos; faltan las **URL reales** (se ocultan solos si están vacías) |
| Chat a WhatsApp | ✅ Botón flotante + botones contextuales por servicio |
| Mapa de Google | ✅ Embebido, sin API key |
| Página independiente por servicio + botón de contacto | ✅ 6 páginas |
| Cuadrícula de logos de clientes | ✅ Cuadrícula y cinta animada · ⏳ panel de autogestión = fase 2 |
| Formulario de envío de correo | ⚠️ Funciona en modo mailto; requiere hosting para el envío real |

Extras incluidos sin costo adicional de alcance: página de política de datos,
preguntas frecuentes, línea de tiempo histórica, datos estructurados para Google
(schema.org), `sitemap.xml`, `robots.txt`, diseño responsive y accesibilidad básica
(saltar al contenido, foco visible, `prefers-reduced-motion`).

---

## 4. Pendientes de información del cliente

> Hay dos documentos sobre lo que falta, según a quién se le entregue:
>
> - 📄 **[SOLICITUD-DE-MATERIAL.md](SOLICITUD-DE-MATERIAL.md) — para enviarle al cliente.**
>   Formulario simple que la empresa diligencia: lista de fotos a tomar y campos en
>   blanco para completar. Sin lenguaje técnico.
> - 🔧 **[REQUERIMIENTOS-CLIENTE.md](REQUERIMIENTOS-CLIENTE.md) — de uso interno.**
>   Los 24 espacios de fotografía con archivo destino, ubicación, formato y tamaño
>   exactos, más las especificaciones técnicas de cada dato.
>
> Lo de abajo es el resumen.

Marcados en el código con el comentario `← CONFIRMAR` o `DATO POR CONFIRMAR`.

1. **Correos electrónicos reales.** Se asumió `ventas@excedentesymetales.com` e
   `info@excedentesymetales.com` a partir del dominio visto en el Plan de Inducción
   (`recursoshumanos@excedentesymetales.com`, este sí confirmado).
2. **URL de redes sociales** (Facebook, Instagram, LinkedIn, YouTube).
3. **NIT** de la compañía, para el pie de página y la política de datos.
4. **Horario de atención real** (el actual es una suposición razonable).
5. **Logos de clientes y aliados** en alta resolución, con autorización de uso.
6. **Registro fotográfico** de patio, maquinaria, equipo de trabajo y proyectos.
7. **Testimonios reales** con nombre, cargo y empresa autorizados por escrito.
8. **Cifra de "operaciones atendidas"** en la franja de indicadores del inicio
   (hoy dice 500+, es un marcador de posición).
9. **Ubicación exacta en el mapa.** La búsqueda por dirección cae en el sector
   correcto; conviene confirmar coordenadas exactas o el enlace de Google Business.
10. **Años de la reseña histórica.** El material de origen registra cuatro hitos
    distintos con el año 1995 (primer proyecto, expansión, nuevo servicio). Conviene
    confirmar los años reales de cada uno.
11. **Listado real de maquinaria** disponible para alquiler (tipos, capacidades).
12. **Certificaciones vigentes** (ISO, RUC, ARL, licencias ambientales) si se quieren
    mostrar con sus sellos.
13. **Dominio y hosting** definitivos. El código asume
    `https://www.excedentesymetales.com/` en los `canonical`, el `sitemap.xml` y los
    datos estructurados; si cambia, hay que actualizarlos.

---

## 5. Fase siguiente (fuera del alcance actual)

- Backend del formulario con envío real de correo y registro de solicitudes.
- Panel de administración para que el cliente cargue logos de clientes, casos de
  éxito y fotografías sin tocar código.
- Blog o sección de noticias / precios del material.
- Google Analytics y Search Console.
- Versión en inglés.

---

## 6. Notas técnicas

- **Tipografías:** Barlow Condensed (títulos) e Inter (texto), servidas por Google Fonts.
  Si se requiere operación sin llamadas externas, se descargan y se sirven localmente.
- **Colores de marca:** naranja `#e8611a`, tinta `#14171b`, acero `#6e757d`.
  Definidos como variables CSS en el bloque *Tokens* de `styles.css`.
- **Logos:** se reconstruyeron a partir de la fotografía del logotipo original
  (`LOGO-EYM.png`). Quedaron tres versiones: `logo-eym-color.png` (fondos claros),
  `logo-eym-blanco.png` (fondos oscuros) e `isotipo-eym.png`.
  **Si existe el archivo vectorial original (.ai / .eps / .svg / .cdr), conviene
  reemplazarlos** para obtener nitidez perfecta en pantallas de alta densidad.
- **Compatibilidad:** navegadores modernos (Chrome, Edge, Firefox, Safari) y móviles.
- **Prueba local:** doble clic en `index.html`. Todo funciona salvo el mapa, que en
  algunos navegadores exige servidor; para probarlo completo:

```bash
python -m http.server 8000
```

y abrir `http://localhost:8000`.
