/* ==========================================================================
   CONFIGURACIÓN GENERAL DEL SITIO
   Este es el único archivo que hay que tocar para cambiar teléfonos, correos,
   redes sociales, el destino del formulario y la cuadrícula de clientes.
   ========================================================================== */

window.EYM = {

  /* --- Datos de la empresa ------------------------------------------- */
  empresa: {
    razonSocial: 'COMERCIALIZADORA EXCEDENTES Y METALES S.A.',
    nombreCorto: 'Excedentes y Metales S.A.',
    direccion:   'Variante Mamonal – Turbaco, Cra 67 Bo. 3, Sector Policarpa',
    ciudad:      'Cartagena de Indias, Bolívar – Colombia',
    ciiu:        '4665 – Comercio al por mayor de desperdicios, desechos y chatarra',
    fundacion:   '15 de junio de 1995'
  },

  /* --- Contacto ------------------------------------------------------- */
  contacto: {
    ventasTel:        '+57 310 413 7057',
    ventasTelPlano:   '573104137057',
    operacionesTel:   '+57 320 565 7439',
    operacionesPlano: '573205657439',
    correoVentas:     'ventas@excedentesymetales.com',       // ← CONFIRMAR
    correoGeneral:    'info@excedentesymetales.com',          // ← CONFIRMAR
    correoRRHH:       'recursoshumanos@excedentesymetales.com',
    horario:          'Lunes a viernes 7:00 a.m. – 5:00 p.m. · Sábados 7:00 a.m. – 12:00 m.'
  },

  /* --- Redes sociales (dejar en '' para ocultar el ícono) ------------- */
  redes: {
    facebook:  '#',   // ← PENDIENTE: URL real
    instagram: '#',   // ← PENDIENTE: URL real
    linkedin:  '#',   // ← PENDIENTE: URL real
    youtube:   ''     // ← PENDIENTE (opcional)
  },

  /* --- WhatsApp ------------------------------------------------------- */
  whatsapp: {
    numero:  '573104137057',
    mensaje: 'Hola, estoy en su sitio web y quisiera recibir información sobre sus servicios.'
  },

  /* --- Formularios ----------------------------------------------------
     Mientras no exista backend, el formulario arma un correo (mailto).
     Cuando se defina el hosting, poner aquí la URL del script PHP
     (p. ej. '/enviar.php') o del servicio externo (Formspree, etc.).      */
  formulario: {
    endpoint: ''   // '' = modo mailto
  },

  /* --- Google Maps ---------------------------------------------------- */
  mapaConsulta: 'Variante Mamonal Turbaco Cra 67, Cartagena, Bolívar, Colombia',

  /* --- Cuadrícula de clientes / aliados -------------------------------
     Para actualizar: subir el logo a assets/img/clientes/ y agregar
     una línea aquí. Los archivos actuales son marcadores de posición.    */
  clientes: [
    { nombre: 'Cliente 01', logo: 'assets/img/clientes/cliente-01.svg' },
    { nombre: 'Cliente 02', logo: 'assets/img/clientes/cliente-02.svg' },
    { nombre: 'Cliente 03', logo: 'assets/img/clientes/cliente-03.svg' },
    { nombre: 'Cliente 04', logo: 'assets/img/clientes/cliente-04.svg' },
    { nombre: 'Cliente 05', logo: 'assets/img/clientes/cliente-05.svg' },
    { nombre: 'Cliente 06', logo: 'assets/img/clientes/cliente-06.svg' },
    { nombre: 'Cliente 07', logo: 'assets/img/clientes/cliente-07.svg' },
    { nombre: 'Cliente 08', logo: 'assets/img/clientes/cliente-08.svg' },
    { nombre: 'Cliente 09', logo: 'assets/img/clientes/cliente-09.svg' },
    { nombre: 'Cliente 10', logo: 'assets/img/clientes/cliente-10.svg' },
    { nombre: 'Cliente 11', logo: 'assets/img/clientes/cliente-11.svg' },
    { nombre: 'Cliente 12', logo: 'assets/img/clientes/cliente-12.svg' }
  ]
};
