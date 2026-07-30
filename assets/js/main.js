/* ==========================================================================
   COMERCIALIZADORA EXCEDENTES Y METALES S.A. — Comportamiento del sitio
   Sin dependencias externas.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.EYM || {};
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------------------------------------------- 1. Menú móvil y submenús */
  function menu() {
    var boton = $('.boton-menu');
    var nav   = $('.nav-principal');
    if (!boton || !nav) return;

    boton.addEventListener('click', function () {
      var abierto = nav.classList.toggle('esta-abierto');
      boton.setAttribute('aria-expanded', String(abierto));
    });

    // En móvil, el primer toque sobre "Servicios" despliega el submenú.
    $$('.tiene-submenu > a').forEach(function (enlace) {
      enlace.addEventListener('click', function (e) {
        if (window.innerWidth > 1100) return;
        var sub = enlace.parentElement.querySelector('.submenu');
        if (!sub) return;
        e.preventDefault();
        sub.classList.toggle('esta-abierto');
      });
    });

    document.addEventListener('click', function (e) {
      if (window.innerWidth > 1100) return;
      if (nav.contains(e.target) || boton.contains(e.target)) return;
      nav.classList.remove('esta-abierto');
      boton.setAttribute('aria-expanded', 'false');
    });
  }

  /* --------------------------------------------- 2. Cabecera fija + subir */
  function scrollUI() {
    var cabecera = $('.cabecera');
    var subir    = $('.ir-arriba');

    function alDesplazar() {
      var y = window.scrollY;
      if (cabecera) cabecera.classList.toggle('esta-fija', y > 12);
      if (subir)    subir.classList.toggle('es-visible', y > 620);
    }
    window.addEventListener('scroll', alDesplazar, { passive: true });
    alDesplazar();

    if (subir) {
      subir.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ------------------------------------------ 3. Banner en movimiento (hero) */
  function carrusel() {
    var hero = $('.hero[data-carrusel]');
    if (!hero) return;

    var slides = $$('.hero__slide', hero);
    var puntos = $$('.hero__puntos button', hero);
    if (slides.length < 2) return;

    var actual = 0;
    var pausa  = false;
    var lapso  = parseInt(hero.getAttribute('data-intervalo'), 10) || 6500;
    var reloj;

    function mostrar(i) {
      actual = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) { s.classList.toggle('esta-activo', n === actual); });
      puntos.forEach(function (p, n) {
        p.classList.toggle('esta-activo', n === actual);
        p.setAttribute('aria-selected', String(n === actual));
      });
    }
    function avanzar() { mostrar(actual + 1); }
    function arrancar() {
      detener();
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      reloj = setInterval(function () { if (!pausa) avanzar(); }, lapso);
    }
    function detener() { if (reloj) clearInterval(reloj); }

    var sig = $('[data-carrusel-siguiente]', hero);
    var ant = $('[data-carrusel-anterior]', hero);
    if (sig) sig.addEventListener('click', function () { avanzar(); arrancar(); });
    if (ant) ant.addEventListener('click', function () { mostrar(actual - 1); arrancar(); });
    puntos.forEach(function (p, n) {
      p.addEventListener('click', function () { mostrar(n); arrancar(); });
    });

    hero.addEventListener('mouseenter', function () { pausa = true; });
    hero.addEventListener('mouseleave', function () { pausa = false; });
    document.addEventListener('visibilitychange', function () { pausa = document.hidden; });

    mostrar(0);
    arrancar();
  }

  /* ----------------------------------------------- 4. Aparición al hacer scroll */
  function aparecer() {
    var items = $$('.aparece');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('es-visible'); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var retraso = parseInt(e.target.getAttribute('data-retraso'), 10) || 0;
        setTimeout(function () { e.target.classList.add('es-visible'); }, retraso);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

    items.forEach(function (el) { obs.observe(el); });
  }

  /* ------------------------------------------------- 5. Contadores de cifras */
  function contadores() {
    var nums = $$('[data-contador]');
    if (!nums.length || !('IntersectionObserver' in window)) {
      nums.forEach(function (n) { n.textContent = n.getAttribute('data-contador'); });
      return;
    }
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var fin = parseFloat(el.getAttribute('data-contador'));
        var dur = 1400, ini = performance.now();
        (function paso(t) {
          var p = Math.min((t - ini) / dur, 1);
          el.textContent = Math.round(fin * (1 - Math.pow(1 - p, 3))).toLocaleString('es-CO');
          if (p < 1) requestAnimationFrame(paso);
        })(ini);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { obs.observe(n); });
  }

  /* --------------------------------------------------------- 6. Acordeones */
  function acordeon() {
    $$('.acordeon__boton').forEach(function (boton) {
      boton.addEventListener('click', function () {
        var abierto = boton.getAttribute('aria-expanded') === 'true';
        var panel   = document.getElementById(boton.getAttribute('aria-controls'));
        boton.setAttribute('aria-expanded', String(!abierto));
        if (panel) panel.classList.toggle('es-visible', !abierto);
      });
    });
  }

  /* ----------------------------------------- 7. Cuadrícula / cinta de clientes */
  function clientes() {
    var lista = (CFG.clientes || []);
    if (!lista.length) return;
    var base = document.body.getAttribute('data-base') || '';

    $$('[data-clientes="rejilla"]').forEach(function (cont) {
      var tope = parseInt(cont.getAttribute('data-limite'), 10) || lista.length;
      cont.innerHTML = lista.slice(0, tope).map(function (c) {
        return '<div class="rejilla-clientes__item"><img src="' + base + c.logo +
               '" alt="' + c.nombre + '" loading="lazy" width="260" height="120"></div>';
      }).join('');
    });

    $$('[data-clientes="cinta"]').forEach(function (cont) {
      var uno = lista.map(function (c) {
        return '<img src="' + base + c.logo + '" alt="' + c.nombre +
               '" loading="lazy" width="260" height="120">';
      }).join('');
      cont.innerHTML = uno + uno; // duplicado para el bucle continuo
    });
  }

  /* ------------------------------------------------- 8. Enlaces de WhatsApp */
  function whatsapp() {
    var w = CFG.whatsapp || {};
    if (!w.numero) return;
    var url = 'https://wa.me/' + w.numero + '?text=' + encodeURIComponent(w.mensaje || '');
    $$('[data-whatsapp]').forEach(function (a) {
      var propio = a.getAttribute('data-whatsapp');
      a.href = propio
        ? 'https://wa.me/' + w.numero + '?text=' + encodeURIComponent(propio)
        : url;
    });
  }

  /* ------------------------------------------------------- 9. Formularios */
  function formularios() {
    $$('form[data-formulario]').forEach(function (form) {
      var aviso  = $('.aviso-formulario', form);
      var boton  = $('button[type="submit"]', form);
      var origen = form.getAttribute('data-formulario') || 'Sitio web';

      function decir(tipo, texto) {
        if (!aviso) return;
        aviso.className = 'aviso-formulario es-visible aviso-formulario--' + tipo;
        aviso.textContent = texto;
        aviso.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Trampa anti-spam: si viene lleno, es un bot.
        var miel = $('.miel input', form);
        if (miel && miel.value) return;

        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var datos = new FormData(form);
        var cfg   = CFG.formulario || {};
        var texto = '';
        datos.forEach(function (v, k) {
          if (k === 'sitio_web' || !String(v).trim()) return;
          texto += k.replace(/_/g, ' ').toUpperCase() + ': ' + v + '\n';
        });

        if (boton) { boton.disabled = true; boton.dataset.txt = boton.textContent; boton.textContent = 'Enviando…'; }

        function liberar() {
          if (boton) { boton.disabled = false; boton.textContent = boton.dataset.txt || 'Enviar'; }
        }

        if (cfg.endpoint) {
          fetch(cfg.endpoint, { method: 'POST', body: datos, headers: { 'Accept': 'application/json' } })
            .then(function (r) {
              if (!r.ok) throw new Error('HTTP ' + r.status);
              form.reset();
              decir('ok', '¡Gracias! Recibimos su solicitud. Un asesor lo contactará en el menor tiempo posible.');
            })
            .catch(function () {
              decir('error', 'No pudimos enviar el mensaje. Escríbanos por WhatsApp al ' +
                             (CFG.contacto ? CFG.contacto.ventasTel : '') + ' o inténtelo de nuevo.');
            })
            .finally(liberar);
        } else {
          // Modo provisional sin backend: abre el gestor de correo.
          var destino = (CFG.contacto && CFG.contacto.correoVentas) || '';
          var asunto  = 'Solicitud desde el sitio web — ' + origen;
          window.location.href = 'mailto:' + destino +
            '?subject=' + encodeURIComponent(asunto) +
            '&body='    + encodeURIComponent(texto);
          decir('ok', 'Se abrió su gestor de correo con la solicitud lista para enviar. ' +
                      'Si prefiere, también puede escribirnos por WhatsApp.');
          liberar();
        }
      });
    });
  }

  /* -------------------------------------------- 10. Datos dinámicos del sitio */
  function datosSitio() {
    var c = CFG.contacto || {};
    var mapa = {
      'tel-ventas':       c.ventasTel,
      'tel-operaciones':  c.operacionesTel,
      'correo-ventas':    c.correoVentas,
      'correo-general':   c.correoGeneral,
      'horario':          c.horario,
      'direccion':        (CFG.empresa || {}).direccion,
      'ciudad':           (CFG.empresa || {}).ciudad,
      'anio':             new Date().getFullYear()
    };
    Object.keys(mapa).forEach(function (clave) {
      $$('[data-dato="' + clave + '"]').forEach(function (el) {
        if (mapa[clave] == null) return;
        el.textContent = mapa[clave];
        if (el.tagName === 'A') {
          if (clave.indexOf('tel-') === 0)    el.href = 'tel:+' + String(mapa[clave]).replace(/\D/g, '');
          if (clave.indexOf('correo-') === 0) el.href = 'mailto:' + mapa[clave];
        }
      });
    });

    // Redes sociales: oculta las que no tengan URL configurada.
    var r = CFG.redes || {};
    $$('[data-red]').forEach(function (a) {
      var url = r[a.getAttribute('data-red')];
      if (!url) { a.style.display = 'none'; return; }
      a.href = url;
    });

    // Mapa de Google (sin API key).
    $$('[data-mapa]').forEach(function (cont) {
      if ($('iframe', cont)) return;
      var q = encodeURIComponent(CFG.mapaConsulta || '');
      cont.innerHTML = '<iframe title="Ubicación de Excedentes y Metales S.A. en Cartagena" ' +
        'src="https://www.google.com/maps?q=' + q + '&hl=es&z=15&output=embed" ' +
        'loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>';
    });
  }

  /* ------------------------------------------------------------- Arranque */
  function iniciar() {
    menu();
    scrollUI();
    carrusel();
    aparecer();
    contadores();
    acordeon();
    clientes();
    whatsapp();
    formularios();
    datosSitio();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
