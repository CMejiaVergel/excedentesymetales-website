# Requerimientos de información — Sitio web Excedentes y Metales S.A.

Documento de solicitud de material al cliente.
Lista **exactamente** qué falta para terminar el sitio: cada fotografía con su
ubicación, formato y tamaño; cada dato; y cada autorización necesaria.

- **Proyecto:** sitio corporativo COMERCIALIZADORA EXCEDENTES Y METALES S.A.
- **Repositorio:** https://github.com/CMejiaVergel/excedentesymetales-website
- **Estado:** primera versión construida y funcional, con marcadores de posición.
- **Última actualización:** 1 de agosto de 2026

---

## 0. Cómo entregar el material

**Un solo enlace de Google Drive / OneDrive / WeTransfer** con esta estructura:

```
ENTREGA-EYM/
├── 01-FOTOS-BANNER/
├── 02-FOTOS-NOSOTROS/
├── 03-FOTOS-SERVICIOS/
├── 04-FOTOS-PROYECTOS/
├── 05-LOGOS-CLIENTES/
├── 06-LOGO-EYM-VECTORIAL/
└── 07-DATOS.docx          (o el formulario de la sección 13 diligenciado)
```

Reglas que ahorran retrabajo:

1. **Enviar los archivos originales de la cámara o el celular**, sin recortar,
   sin filtros y sin comprimir. Nosotros hacemos el recorte y la optimización.
2. **No mandar las fotos por WhatsApp.** WhatsApp reduce la resolución a menos de
   la mitad y las inutiliza para el banner principal.
3. **No incrustar las fotos dentro de un Word o un PowerPoint.** Ese proceso
   también las degrada. Van como archivos sueltos.
4. Nombrar los archivos con el número del espacio que ocupan según este documento
   (por ejemplo `B1-patio.jpg`, `S3-maquinaria.jpg`). Si no, igual las recibimos y
   las clasificamos nosotros.
5. **Enviar 3 o 4 opciones por cada espacio.** De 24 espacios salen unas 80 fotos
   en bruto; de ahí elegimos las mejores.

---

## 1. Semáforo: qué bloquea la publicación

| | Requerimiento | Sección |
|---|---|---|
| 🔴 | Fotografías reales (24 espacios) | 2 |
| 🔴 | Correos electrónicos reales de la empresa | 8 |
| 🔴 | NIT | 9 |
| 🔴 | Dominio y hosting definitivos | 12 |
| 🟠 | Logos de clientes + autorización de uso | 3 |
| 🟠 | Testimonios reales | 4 |
| 🟠 | Detalle y autorización de los casos de éxito | 5 |
| 🟠 | URL de redes sociales | 8 |
| 🟠 | Confirmación del listado de servicios | 6 |
| 🟡 | Cifras del contador de indicadores | 10 |
| 🟡 | Años reales de la reseña histórica | 11 |
| 🟡 | Logo en vectorial | 7 |

🔴 sin esto no se publica · 🟠 se publica pero incompleto · 🟡 mejora la calidad

---

## 2. FOTOGRAFÍAS — 24 espacios

### 2.0 Reglas que aplican a todas

| Aspecto | Requerimiento |
|---|---|
| Formato de entrega | JPG o PNG originales de cámara (también sirve HEIC de iPhone) |
| Resolución mínima | 1920 px en el lado más largo. Ideal: 3000 px o más |
| Orientación | **Horizontal (apaisada)** en todos los casos, salvo donde se indique |
| Peso | Sin límite en la entrega. Nosotros las optimizamos a menos de 400 KB |
| Iluminación | Luz de día, preferiblemente entre 8 y 10 a.m. o 3 y 5 p.m. |
| Qué evitar | Fotos borrosas, capturas de pantalla, fotos de fotos, marcas de agua, fecha impresa en la esquina |
| Seguridad industrial | **Todo el personal que aparezca debe tener casco, gafas, botas y chaleco reflectivo.** Una foto donde alguien opera sin protección contradice el discurso HSEQ de todo el sitio y no se puede publicar |
| Autorización de imagen | Toda persona identificable debe firmar autorización de uso de imagen (Ley 1581 de 2012). Formato en la sección 14 |

**Zona segura del banner y las cabeceras:** sobre estas fotos va texto blanco
alineado a la izquierda. El sujeto principal (la máquina, el operario) debe quedar
**en la mitad derecha del encuadre**, dejando la izquierda con cielo, piso o fondo
despejado. Si el sujeto queda centrado, el texto se le monta encima.

---

### 2.1 Banner principal en movimiento — 3 fotos

Ocupan toda la pantalla al entrar al sitio. **Son las fotos más importantes del
proyecto**: es lo primero que ve cualquier visitante.

| Código | Archivo destino | Tamaño mínimo | Qué debe mostrar |
|---|---|---|---|
| **B1** | `assets/img/hero-1.jpg` | 1920 × 1000 px | **Patio de operaciones en actividad.** Vista amplia del patio de chatarra con material clasificado en montañas, idealmente con una máquina trabajando al fondo. Debe transmitir volumen y capacidad instalada |
| **B2** | `assets/img/hero-2.jpg` | 1920 × 1000 px | **Maquinaria amarilla en plena maniobra.** Excavadora, cargador o grúa levantando material. En movimiento, no estacionada. Cielo visible en la parte superior |
| **B3** | `assets/img/hero-3.jpg` | 1920 × 1000 px | **Cargue o traslado de tubería.** Maquinaria manipulando tubería de gran diámetro, con personal dirigiendo la maniobra a distancia segura |

> **B1** se usa además como fondo de la cabecera de la página **Contacto**, así que
> conviene que sea la más representativa de la sede.

**Detalle técnico:** el sitio las recorta a `1920 × 1000` y aplica un degradado
oscuro de izquierda a derecha para que el texto se lea. Fotos con cielo muy blanco
o quemado no funcionan bien; preferir cielo con nubes o azul.

---

### 2.2 Sección Nosotros — 2 fotos

| Código | Archivo destino | Tamaño mínimo | Dónde aparece | Qué debe mostrar |
|---|---|---|---|---|
| **N1** | `assets/img/nosotros-planta.jpg` | 1920 × 1280 px | Página **Inicio**, bloque "Quiénes somos" (al lado del texto) **y** cabecera de la página **Nosotros** | **La sede en Cartagena.** Fachada, entrada principal con el aviso de la empresa, o vista general del patio con la báscula. Es la foto que dice "esta empresa existe y tiene infraestructura" |
| **N2** | `assets/img/nosotros-equipo.jpg` | 1600 × 900 px | Página **Nosotros**, bloque "Quiénes somos" | **El equipo de trabajo posando.** Grupo completo, de frente, sonriendo, con dotación y elementos de protección puestos. Al aire libre, con el patio o la maquinaria de fondo. Que se vean las caras: no muy lejos |

> **N1 se usa en dos lugares con recortes distintos** (vertical en Inicio, panorámico
> en Nosotros). Por eso pedimos resolución alta: necesitamos margen para recortar.
> Si prefieren dos fotos distintas para cada uso, mándenlas y las separamos.

**Foto adicional recomendada (opcional pero valiosa):** los **fundadores, los
hermanos Naranjo**, juntos. Una empresa familiar de 30 años con una foto de sus
fundadores en la sección de historia genera más confianza que cualquier texto. Si
la autorizan, la ubicamos en la línea de tiempo.

---

### 2.3 Servicios — 12 fotos (2 por cada servicio)

Cada servicio necesita **dos fotos distintas**: una para la tarjeta cuadrada del
listado y otra panorámica para la cabecera de su página.

| Código | Archivo destino | Tamaño | Dónde aparece |
|---|---|---|---|
| **S1a** | `assets/img/servicios/ferrosos.jpg` | 1400 × 960 px (3:2) | Tarjeta "Material ferroso" en Inicio, Servicios y páginas de servicio |
| **S1b** | `assets/img/servicios/ferrosos-hero.jpg` | 2400 × 900 px | Cabecera de `servicios/materiales-ferrosos.html` |
| **S2a** | `assets/img/servicios/no-ferrosos.jpg` | 1400 × 960 px | Tarjeta "Material no ferroso" |
| **S2b** | `assets/img/servicios/no-ferrosos-hero.jpg` | 2400 × 900 px | Cabecera de `servicios/materiales-no-ferrosos.html` |
| **S3a** | `assets/img/servicios/maquinaria.jpg` | 1400 × 960 px | Tarjeta "Alquiler de maquinaria" |
| **S3b** | `assets/img/servicios/maquinaria-hero.jpg` | 2400 × 900 px | Cabecera de `servicios/alquiler-maquinaria.html` |
| **S4a** | `assets/img/servicios/desmonte.jpg` | 1400 × 960 px | Tarjeta "Desmonte y desmantelamiento" |
| **S4b** | `assets/img/servicios/desmonte-hero.jpg` | 2400 × 900 px | Cabecera de `servicios/desmonte-industrial.html` **y** cabecera de la página **Servicios** |
| **S5a** | `assets/img/servicios/tuberia.jpg` | 1400 × 960 px | Tarjeta "Manejo de tubería" |
| **S5b** | `assets/img/servicios/tuberia-hero.jpg` | 2400 × 900 px | Cabecera de `servicios/manejo-tuberia.html` |
| **S6a** | `assets/img/servicios/excedentes.jpg` | 1400 × 960 px | Tarjeta "Excedentes industriales" |
| **S6b** | `assets/img/servicios/excedentes-hero.jpg` | 2400 × 900 px | Cabecera de `servicios/excedentes-industriales.html` |

**Qué debe mostrar cada par:**

| Servicio | Contenido sugerido |
|---|---|
| **S1 · Material ferroso** | Chatarra de hierro y acero clasificada: estructuras, láminas, perfiles, viruta. Primer plano del material apilado. Se debe ver el volumen y que está *ordenado*, no revuelto |
| **S2 · Material no ferroso** | Cobre, aluminio y bronce **separados por tipo**, en canastillas, big bags o pilas independientes. La clasificación por grado es el argumento de venta: la foto debe demostrarla. Un primer plano de cable de cobre pelado funciona muy bien |
| **S3 · Alquiler de maquinaria** | La maquinaria propia, limpia y en operación. Si tienen varios equipos, una foto de la flota reunida. Que se lea el logo de la empresa en la máquina si lo tiene |
| **S4 · Desmonte y desmantelamiento** | Estructura industrial siendo desarmada, trabajo de oxicorte con chispas, o el "antes y después" de un área desmontada. Es la foto más impactante que puede tener el sitio |
| **S5 · Manejo de tubería** | Tubería de gran diámetro siendo izada o estibada, con aparejos visibles y personal señalizando |
| **S6 · Excedentes industriales** | Zona de acopio ordenada dentro de una planta cliente, contenedores de residuos con el código de colores, o el camión cargando excedentes |

---

### 2.4 Casos de éxito — 6 fotos

Registro fotográfico de proyectos reales. Aparecen en `casos-de-exito.html` y las
tres primeras también en el Inicio.

| Código | Archivo destino | Tamaño | Proyecto actualmente asignado |
|---|---|---|---|
| **P1** | `assets/img/proyectos/proyecto-1.jpg` | 1400 × 960 px | Álcalis de Colombia — *también se usa como fondo de la cabecera de Casos de éxito y en el Inicio* |
| **P2** | `assets/img/proyectos/proyecto-2.jpg` | 1400 × 960 px | Ecopetrol / sector energético |
| **P3** | `assets/img/proyectos/proyecto-3.jpg` | 1400 × 960 px | Tubos del Caribe |
| **P4** | `assets/img/proyectos/proyecto-4.jpg` | 1400 × 960 px | Drummond |
| **P5** | `assets/img/proyectos/proyecto-5.jpg` | 1400 × 960 px | Cerro Matoso |
| **P6** | `assets/img/proyectos/proyecto-6.jpg` | 1400 × 960 px | Zona industrial de Mamonal |

Cada foto debe corresponder al proyecto que ilustra. Si no existe registro de
alguno, avísennos: reemplazamos ese caso por otro que sí tenga fotos, antes que
poner una imagen genérica.

**Atención:** si en la foto se ve el logo, el aviso o las instalaciones
identificables del cliente, hace falta su autorización (ver sección 5).

---

### 2.5 Fondo de la franja de llamado a la acción — 1 foto

| Código | Archivo destino | Tamaño | Dónde aparece |
|---|---|---|---|
| **C1** | `assets/img/cta-fondo.jpg` | 2400 × 800 px | Franja naranja/oscura de "Solicitar cotización", **al pie de las 11 páginas del sitio** |

Va muy oscurecida y con texto encima, así que funciona una textura más que una
escena: metal apilado en primer plano, chatarra vista desde arriba, o el patio en
contraluz. Debe verse bien recortada a una franja muy ancha y baja.

---

### 2.6 Resumen de fotografías

| Bloque | Espacios | Fotos a enviar (3 opciones c/u) |
|---|---|---|
| Banner principal | 3 | 9 |
| Nosotros | 2 | 6 |
| Servicios | 12 | 36 |
| Casos de éxito | 6 | 18 |
| Franja de llamado | 1 | 3 |
| **Total** | **24** | **≈ 72** |

> **Recomendación:** contratar una sesión fotográfica de medio día en la sede. Un
> fotógrafo industrial cubre los 24 espacios en una jornada y el resultado es
> incomparablemente mejor que fotos de celular acumuladas. Si no es viable, con
> celular moderno también se logra: luz natural, cámara horizontal, resolución
> máxima activada y limpiar el lente antes de disparar.

---

## 3. LOGOS DE CLIENTES

Aparecen en dos lugares: cinta animada en el **Inicio** y cuadrícula en
**Casos de éxito**. Hoy hay 12 marcadores de posición.

### Lo que necesitamos

1. **El listado de nombres de los clientes** que la empresa quiere mostrar.
   Con el nombre exacto y completo nosotros podemos buscar el logo oficial.
   Mínimo 6, ideal entre 10 y 18.
2. **Confirmación de que cada cliente autoriza el uso de su logo.**

### Sobre la autorización — importante

Publicar el logo de un tercero en un sitio comercial **requiere su permiso**. No
basta con haberle prestado el servicio. Empresas como Ecopetrol, Drummond o Cerro
Matoso tienen políticas estrictas de uso de marca y su departamento jurídico puede
exigir el retiro.

Tres caminos, de más a menos seguro:

- **Autorización escrita** de cada cliente (un correo del área de comunicaciones
  basta). Es lo correcto y lo que recomendamos.
- **Mencionar solo el nombre en texto**, sin el logo. Menos vistoso, mucho menos
  riesgoso.
- **Describir el sector sin nombrar**: "compañías del sector minero-energético".
  Es lo que se usa cuando no hay autorización.

Díganos qué camino toma la empresa y ajustamos la sección.

### Especificaciones del archivo de logo

| Aspecto | Requerimiento |
|---|---|
| Formato preferido | SVG (vectorial) o PNG con **fondo transparente** |
| Tamaño mínimo si es PNG | 520 × 240 px |
| Fondo | Transparente. Si viene con fondo blanco también sirve, lo recortamos |
| Versión | Logo completo horizontal. Evitar el isotipo suelto |
| Qué no sirve | Logo recortado de una captura de pantalla, con bordes pixelados o con el fondo de otra página |

Los logos se ven en escala de grises y toman color al pasar el mouse, así que los
logos muy claros (amarillo, blanco) pierden legibilidad; si hay alguno así, avisen
y le damos tratamiento especial.

---

## 4. TESTIMONIOS

El sitio tiene **3 espacios de reseña**, en el Inicio y en Casos de éxito.
Hoy están con textos de muestra escritos por nosotros.

Por cada testimonio necesitamos:

| Campo | Detalle | Ejemplo |
|---|---|---|
| Texto | Entre 25 y 45 palabras. Concreto, no genérico | "Retiraron 40 toneladas de excedentes en tres días, con la documentación completa desde el primer despacho." |
| Nombre completo | De la persona que lo firma | Ing. María Fernanda Ríos |
| Cargo | Su cargo exacto | Jefe de Mantenimiento |
| Empresa | Razón social | Planta XYZ S.A.S. |
| Autorización | Correo o documento firmado autorizando publicar nombre, cargo y empresa | — |
| Foto (opcional) | Retrato, 400 × 400 px, fondo neutro | — |

**Cómo conseguirlos rápido:** llamar a tres clientes de confianza, hacerles dos
preguntas ("¿qué problema le resolvimos?" y "¿qué destacaría del servicio?"),
redactar nosotros el texto con sus palabras y enviárselo por correo para que
respondan "aprobado". Se consiguen en una tarde.

**Si no hay testimonios disponibles**, avísennos: eliminamos la sección completa.
Es preferible a dejar textos inventados, que un cliente informado detecta de
inmediato y resta credibilidad a todo el sitio.

---

## 5. CASOS DE ÉXITO — contenido detallado

Hay **6 fichas**. Cada una muestra un título, una etiqueta de categoría, una
ubicación, un párrafo descriptivo y **dos datos destacados en números grandes**.

Los textos actuales los redactamos a partir de la reseña histórica del Plan de
Inducción; hay que confirmarlos y completarlos.

Por cada caso necesitamos:

| Campo | Detalle |
|---|---|
| **Cliente** | Nombre de la empresa, **y si autoriza ser nombrada** |
| **Año o periodo** | 1995, o "2018–2020" |
| **Ubicación** | Ciudad y planta o zona |
| **Servicio prestado** | Cuál de los 6 servicios del sitio |
| **Descripción** | 40 a 60 palabras: qué necesitaba el cliente, qué se hizo, cómo terminó |
| **Dato destacado 1** | Cifra + etiqueta. Ej: `1.200 t` / "Material recuperado" |
| **Dato destacado 2** | Cifra + etiqueta. Ej: `45 días` / "Duración" |
| **Fotografía** | Ver códigos P1 a P6 en la sección 2.4 |

Ejemplos de datos destacados que funcionan bien: toneladas movidas, días de
ejecución, metros de tubería manipulados, número de equipos desmontados,
accidentes registrados (si es cero, es un dato potentísimo), área intervenida en m².

**Si algún caso no tiene información suficiente**, se puede reducir la sección de 6
a 4 fichas sin que el diseño se vea afectado.

---

## 6. SERVICIOS — confirmación y ajuste

Definimos **6 líneas de servicio** a partir de la misión, la visión y los
procedimientos del Plan de Inducción. Hay que validarlas una por una.

| # | Servicio en el sitio | Qué confirmar |
|---|---|---|
| 1 | Compra de material ferroso | ¿El listado de 8 materiales es correcto? ¿Falta o sobra alguno? |
| 2 | Compra de material no ferroso | Ídem. ¿Compran plomo y zinc? ¿Manejan chatarra electrónica? |
| 3 | Alquiler de maquinaria amarilla | **Falta el inventario real de equipos** (ver abajo) |
| 4 | Desmonte y desmantelamiento industrial | ¿Se sigue prestando activamente o fue solo histórico? |
| 5 | Cargue, descargue y traslado de tubería | ¿Sigue vigente como línea comercial? |
| 6 | Gestión de excedentes industriales | El CIIU 4665 menciona papel, cartón y plástico: ¿los compran en la práctica o solo metales? |

### Inventario de maquinaria — dato faltante importante

La página de alquiler es la más floja porque no tenemos equipos concretos. Por cada
máquina disponible:

- Tipo (excavadora, cargador, montacarga, grúa, tractomula con pulpo, doble troque…)
- Marca y modelo
- Capacidad (toneladas, m³ de balde, alcance en metros)
- Cantidad de unidades
- Año o estado
- Una foto (entra en el bloque S3)

Con esos datos armamos una tabla o fichas de equipo, que es lo que un jefe de obra
busca antes de llamar.

### Preguntas adicionales

- ¿Prestan servicio de **transporte** de material como línea independiente?
- ¿Tienen **báscula certificada** en la sede? Es un argumento de venta fuerte y
  hoy solo lo mencionamos de pasada.
- ¿Compran a **personas naturales** en el patio, con horario de atención al público?
- ¿Manejan **residuos peligrosos** (RESPEL) o solo material limpio?
- ¿Tienen **cobertura fuera de Bolívar**? El sitio hoy dice "cobertura nacional".

---

## 7. MATERIAL DE MARCA

| Requerimiento | Detalle | Prioridad |
|---|---|---|
| **Logo vectorial** | Archivo `.ai`, `.eps`, `.svg` o `.cdr` del logotipo | 🟡 Alta calidad |
| Manual de marca | Si existe: colores oficiales, tipografías, usos permitidos | 🟡 |
| Colores corporativos exactos | En código hexadecimal o Pantone | 🟡 |

**Por qué importa:** el logo que está hoy en el sitio lo **reconstruimos a partir de
una fotografía del aviso físico**, que era el único archivo disponible. Quedó limpio
y funciona, pero en pantallas de alta densidad (celulares modernos, Mac) un vectorial
se ve perfectamente nítido y una reconstrucción no. Si el diseñador original o la
empresa que hizo la papelería conserva el archivo, vale la pena pedirlo.

También sirven: papelería membretada, tarjetas de presentación o el arte de un aviso,
de donde a veces se puede extraer el vector.

---

## 8. DATOS DE CONTACTO Y REDES SOCIALES

### Confirmados (ya están en el sitio)

| Dato | Valor actual |
|---|---|
| Teléfono ventas / WhatsApp | +57 310 413 7057 |
| Teléfono coordinación de operaciones | +57 320 565 7439 |
| Dirección | Variante Mamonal – Turbaco, Cra 67 Bo. 3, Sector Policarpa |
| Ciudad | Cartagena de Indias, Bolívar |
| Correo de recursos humanos | recursoshumanos@excedentesymetales.com |

### Pendientes

| Dato | Estado | Nota |
|---|---|---|
| **Correo de ventas** | 🔴 Asumido | Pusimos `ventas@excedentesymetales.com` deduciéndolo del dominio. **Hay que confirmar que existe** |
| **Correo general** | 🔴 Asumido | `info@excedentesymetales.com`. Ídem |
| **Correo que recibe el formulario** | 🔴 Falta | ¿A qué buzón deben llegar las solicitudes del sitio? ¿Con copia a alguien más? |
| **Teléfono fijo** | 🟡 Falta | Si existe, da formalidad |
| **Horario de atención real** | 🟠 Asumido | Hoy dice "L–V 7:00 a.m.–5:00 p.m. · Sáb 7:00 a.m.–12:00 m." Confirmar |
| **Facebook** | 🟠 Falta | URL completa |
| **Instagram** | 🟠 Falta | URL completa |
| **LinkedIn** | 🟠 Falta | URL completa |
| **YouTube / TikTok** | 🟡 Falta | Si existen |
| **Google Business Profile** | 🟡 Falta | El enlace de la ficha de Google, para el mapa exacto |
| **Coordenadas GPS de la sede** | 🟠 Falta | Hoy el mapa busca por dirección y cae en el sector correcto, pero no en el punto exacto. Solución rápida: abrir Google Maps en el celular **parado en la portería**, mantener presionado sobre el punto y copiar las coordenadas |
| **Otras sedes o patios** | 🟡 Falta | Si hay más de una ubicación |

> Las redes sin URL **se ocultan solas**: si la empresa no tiene Instagram, no queda
> un ícono roto. Pero un sitio corporativo sin ninguna red se ve incompleto, así que
> conviene tener al menos una activa.

---

## 9. DATOS CORPORATIVOS Y LEGALES

| Dato | Estado | Para qué se usa |
|---|---|---|
| **NIT** con dígito de verificación | 🔴 Falta | Pie de página, política de datos, futuras facturas |
| Matrícula mercantil | 🟡 Falta | Pie de página (opcional, da formalidad) |
| Representante legal | 🟠 Falta | Firma de la política de tratamiento de datos |
| Responsable de datos personales | 🟠 Falta | Nombre y correo de quien atiende peticiones (Ley 1581) |
| Certificaciones vigentes | 🟠 Falta | ISO 9001, 14001, 45001, RUC, licencias ambientales. Con los sellos en PNG las mostramos en una franja |
| ARL | 🟡 Confirmado | Colpatria (del Plan de Inducción). Confirmar si sigue vigente |
| Aprobación de la política de datos | 🔴 Falta | El archivo `politica-de-datos.html` es un **borrador nuestro**. Debe revisarlo el área jurídica o el contador antes de publicar |

---

## 10. CIFRAS DEL CONTADOR DE INDICADORES

En el Inicio hay una franja oscura con cuatro números animados:

| Posición | Valor actual | Estado |
|---|---|---|
| 1 | **30+** años de trayectoria | ✅ Correcto (1995–2026) |
| 2 | **1995** año de fundación | ✅ Confirmado |
| 3 | **500+** operaciones atendidas | 🔴 **Marcador de posición inventado. Hay que reemplazarlo** |
| 4 | **Nacional** cobertura | 🟠 Confirmar que es exacto |

Para la casilla 3 sirve cualquier cifra real y verificable. Opciones:

- Toneladas de material recuperado al año
- Número de clientes activos
- Número de empleados directos
- Proyectos de desmonte ejecutados
- Toneladas movidas en total desde 1995

**Debe ser un dato que la empresa pueda sustentar.** Un número inflado es un riesgo
reputacional; si no hay ninguno disponible, cambiamos esa casilla por un texto como
"Cartagena · Cobertura nacional".

---

## 11. RESEÑA HISTÓRICA — años a confirmar

La línea de tiempo de la página Nosotros se construyó con el material del Plan de
Inducción. Ese material registra **cuatro hitos distintos con el mismo año 1995**,
lo que parece un error de digitación en la presentación original:

| Hito en el sitio | Año actual | Estado |
|---|---|---|
| Nuestros orígenes — Depósito El Paisa y Depósito El Retorno | 1992 | 🟡 Confirmar |
| Unión de conocimientos y esfuerzos — constitución de la sociedad | 1995 | ✅ Coincide con la fecha de fundación |
| Primer proyecto — Álcalis de Colombia | 1995 | 🔴 Probablemente otro año |
| Expansión — Ecopetrol, Drummond, Cerro Matoso | 1995 | 🔴 Probablemente otro año |
| Nace el servicio de tubería — Tubos del Caribe | 1995 | 🔴 Probablemente otro año |
| Hoy — liderazgo nacional | Hoy | ✅ |

**Lo que necesitamos:** el año aproximado real de cada hito. No hace falta precisión
de fecha; con el año basta. Una línea de tiempo con cuatro veces "1995" seguidos le
resta credibilidad a los 30 años de trayectoria que el sitio quiere comunicar.

También vale la pena agregar hitos nuevos si los hay: compra de la primera máquina
propia, apertura de la sede actual, primera certificación, etc.

---

## 12. DOMINIO, HOSTING Y CORREO

### Lo que hay que definir

| Punto | Pregunta |
|---|---|
| **Dominio definitivo** | ¿Se usará `excedentesymetales.com`? ¿Ya está registrado y a nombre de quién? |
| **Dónde está registrado** | GoDaddy, Hostinger, Colombia Hosting, etc. |
| **Quién administra el DNS** | Puede ser distinto del registrador |
| **Correo corporativo** | ¿Dónde está hoy? (Google Workspace, Microsoft 365, hosting propio). **Este dato es crítico:** si movemos el DNS sin saberlo, se cae el correo de toda la empresa |
| **Hosting actual** | ¿Existe un sitio web anterior que haya que reemplazar o conservar? |
| **PHP disponible** | Define si el formulario usa un script propio o un servicio externo |

El código hoy asume `https://www.excedentesymetales.com/` en las etiquetas
`canonical`, el `sitemap.xml` y los datos estructurados. Si el dominio final es otro,
lo ajustamos en cinco minutos.

### Sobre las credenciales — cómo entregarlas de forma segura

> **No enviar usuarios ni contraseñas por WhatsApp, correo, chat ni documentos
> compartidos.** Quedan almacenados de forma permanente y fuera de control.

Opciones, de mejor a peor:

1. **Acceso delegado, sin compartir contraseña.** Casi todos los registradores y
   paneles permiten invitar a un usuario adicional con permisos limitados. Es la
   opción correcta: el cliente conserva el control y puede revocar el acceso en
   cualquier momento.
2. **Gestor de contraseñas con enlace de un solo uso** (Bitwarden Send, 1Password,
   o el enlace autodestructible de https://onetimesecret.com). El secreto se
   destruye tras la primera lectura.
3. **Que el cliente ejecute los cambios él mismo**, siguiendo nuestras instrucciones
   paso a paso. Nosotros no tocamos nada, solo indicamos qué configurar.

Si el cliente insiste en enviarlas por un canal inseguro, la contraseña debe
cambiarse inmediatamente después del despliegue.

---

## 13. FORMULARIO Y OPERACIÓN DEL SITIO

| Punto | Pregunta |
|---|---|
| Buzón de destino | ¿A qué correo llegan las solicitudes? |
| Copias | ¿Alguien más debe recibir copia? |
| Aviso por WhatsApp | ¿Quieren notificación al celular de ventas cuando entre una solicitud? |
| Tiempo de respuesta | El sitio promete "el mismo día hábil". ¿Es sostenible? |
| Autogestión de logos | La cotización menciona que el cliente actualizará la cuadrícula de clientes mediante formulario. Eso requiere backend con panel de administración. **¿Entra en esta fase o en una siguiente?** |
| Analítica | ¿Quieren Google Analytics? Requiere una cuenta de Google de la empresa |

---

## 14. AUTORIZACIONES A GESTIONAR

Resumen de los permisos que hay que tener firmados **antes** de publicar:

| # | Autorización | De quién | Para qué |
|---|---|---|---|
| 1 | Uso de imagen | Cada trabajador que aparezca en fotos | Fotos N2, S1–S6, P1–P6 |
| 2 | Uso de logo y nombre | Cada cliente de la cuadrícula | Sección 3 |
| 3 | Publicación del testimonio | Cada persona citada | Sección 4 |
| 4 | Mención en casos de éxito | Cada empresa nombrada | Sección 5 |
| 5 | Aprobación de la política de datos | Área jurídica de la empresa | `politica-de-datos.html` |

Un texto simple sirve para las tres primeras:

> *Yo, [nombre], identificado con cédula [número], autorizo de manera libre, previa
> y expresa a COMERCIALIZADORA EXCEDENTES Y METALES S.A. para usar mi imagen /
> testimonio / la marca de mi representada en su sitio web y sus medios digitales,
> con fines informativos y comerciales, conforme a la Ley 1581 de 2012.*

---

## 15. LISTA DE VERIFICACIÓN PARA EL CLIENTE

Para imprimir y marcar a medida que llega el material.

**Fotografías**
- [ ] B1 · Patio de operaciones (3 opciones)
- [ ] B2 · Maquinaria en maniobra (3 opciones)
- [ ] B3 · Cargue de tubería (3 opciones)
- [ ] N1 · Sede en Cartagena (3 opciones)
- [ ] N2 · Equipo de trabajo posando (3 opciones)
- [ ] N3 · Fundadores *(opcional)*
- [ ] S1 · Material ferroso (2 fotos: tarjeta + panorámica)
- [ ] S2 · Material no ferroso (2 fotos)
- [ ] S3 · Maquinaria (2 fotos)
- [ ] S4 · Desmonte (2 fotos)
- [ ] S5 · Tubería (2 fotos)
- [ ] S6 · Excedentes (2 fotos)
- [ ] P1–P6 · Registro fotográfico de los 6 proyectos
- [ ] C1 · Textura para la franja de llamado

**Datos**
- [ ] Listado de clientes para la cuadrícula de logos
- [ ] Logos en PNG transparente o SVG
- [ ] Autorización de uso de logo de cada cliente
- [ ] 3 testimonios con nombre, cargo, empresa y autorización
- [ ] Detalle de los 6 casos de éxito con sus dos cifras
- [ ] Confirmación de los 6 servicios
- [ ] Inventario de maquinaria para alquiler
- [ ] Correo de ventas y correo general
- [ ] Correo que recibe el formulario
- [ ] URL de Facebook, Instagram y LinkedIn
- [ ] Coordenadas GPS de la sede
- [ ] Horario de atención confirmado
- [ ] NIT y representante legal
- [ ] Cifra real para el indicador de "operaciones atendidas"
- [ ] Años reales de los hitos de la reseña histórica
- [ ] Certificaciones vigentes con sus sellos
- [ ] Logo en formato vectorial
- [ ] Dominio, DNS y hosting definidos
- [ ] Política de datos revisada por el área jurídica

---

## 16. QUÉ PASA SI ALGO NO LLEGA

El sitio **ya funciona** con marcadores de posición. Ninguna sección está rota. Pero:

| Si falta | Consecuencia |
|---|---|
| Las fotos reales | El sitio no se puede publicar. Los marcadores dicen literalmente "FOTO PENDIENTE" |
| Los logos de clientes | Se elimina la sección. El sitio funciona igual |
| Los testimonios | Se elimina la sección. Preferible a inventarlos |
| Las redes sociales | Los íconos se ocultan solos, sin dejar espacios vacíos |
| Las cifras del contador | Se reemplazan por texto descriptivo |
| El logo vectorial | Se queda la versión reconstruida. Funciona, pero pierde nitidez en pantallas de alta densidad |
| El inventario de maquinaria | La página de alquiler queda genérica y vende menos |

**El único bloqueante absoluto son las fotografías.** Todo lo demás tiene una salida
digna.
