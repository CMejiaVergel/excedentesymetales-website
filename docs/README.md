# Documentos del proyecto

## Para enviar al cliente

| Archivo | Uso |
|---|---|
| **Solicitud de material - Excedentes y Metales.docx** | El que se envía. El cliente escribe sobre los campos y marca las casillas directamente en Word |
| **Solicitud de material - Excedentes y Metales.pdf** | Misma pieza en PDF, para leer en celular o imprimir. No es diligenciable |

21 páginas, tamaño carta, con la identidad visual de Voltac Systems (portada de
marca, marco de contenido, paleta y retícula de las propuestas comerciales).
Código documental: `VS-SM-EYM-26-001`.

## Fuente tipográfica

El documento usa **Lato**, la tipografía corporativa de Voltac. Microsoft 365 la
descarga automáticamente al abrir el archivo. Si en algún equipo se ve con otra
fuente, instalar los `.ttf` de Lato (doble clic sobre cada archivo → *Instalar*);
están en los `assets/fonts/` de la skill de propuestas comerciales.

## Regenerar el documento

`_generar-solicitud.js` es el script que produce el `.docx`. Se conserva para poder
rehacerlo si cambian los datos o hay que ajustar una sección, en lugar de editar el
Word a mano y perder la consistencia.

```bash
npm install docx && node _generar-solicitud.js "Solicitud de material - Excedentes y Metales.docx"
```

Requiere la carpeta `assets/` de la skill `voltac-oferta-comercial` (portada, marco
de contenido y logos); la ruta está en la constante `ASSETS` del script.

## Relación con los otros documentos

- [`../SOLICITUD-DE-MATERIAL.md`](../SOLICITUD-DE-MATERIAL.md) — la misma pieza en
  Markdown, para consultar o editar rápido. **El Word se genera a partir de este
  contenido: si se cambia uno, actualizar el otro.**
- [`../REQUERIMIENTOS-CLIENTE.md`](../REQUERIMIENTOS-CLIENTE.md) — la versión
  interna con rutas de archivo, dimensiones en píxeles y especificaciones técnicas.
