/**
 * HuertoHogar - Script Principal
 * Caso Semestral DSY1104 - Desarrollo Full Stack II
 * Baseline Fundacional (HH-FOUNDATION-01) + Módulo Carrito + Módulo Auth
 */

(function () {
  'use strict';

  // ==========================================
  // ESTADOS GLOBALES
  // ==========================================
  let carrito = [];
  let usuarioActual = null;

  /**
   * Módulo principal de la aplicación
   */
  const HuertoHogarApp = {
    init: function () {
      this.setCurrentYear();
      this.initNavbarCollapse();
      this.initSmoothScroll();
      this.initCart();
      this.initAuth(); // Inicializar Autenticación
      this.logBaselineInfo();
    },

    setCurrentYear: function () {
      const yearSpan = document.getElementById('current-year');
      if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    },

    initNavbarCollapse: function () {
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      const navbarCollapse = document.getElementById('navbarNav');

      if (navbarCollapse && window.bootstrap) {
        navLinks.forEach(function (link) {
          link.addEventListener('click', function () {
            if (navbarCollapse.classList.contains('show')) {
              window.bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
            }
          });
        });
      }
    },

    initSmoothScroll: function () {
      document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              e.preventDefault();
              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    },

    initCart: function () {
      const botonesAgregar = document.querySelectorAll('.card-footer button');
      botonesAgregar.forEach((boton) => {
        boton.addEventListener('click', (evento) => {
          const card = evento.target.closest('.card');
          const nombre = card.querySelector('.card-title').innerText;
          const imagen = card.querySelector('img').src;
          const precioTexto = card.querySelector('.fw-bold').innerText; 
          const precioLimpio = parseInt(precioTexto.split('CLP')[0].replace(/[^0-9]/g, ''));

          agregarAlCarrito({ nombre, precio: precioLimpio, imagen, cantidad: 1 });
        });
      });
    },

    // SISTEMA DE AUTENTICACIÓN Y PERFILES
    
    initAuth: function() {
      // 1. Cargar usuario si ya hay sesión activa
      const sesionGuardada = localStorage.getItem('hh_usuarioActivo');
      if (sesionGuardada) {
        usuarioActual = JSON.parse(sesionGuardada);
        actualizarInterfazUsuario();
      }

      // 2. Evento: Registro de usuario
      const formRegister = document.getElementById('form-register');
      if (formRegister) {
        formRegister.addEventListener('submit', function(e) {
          e.preventDefault();
          const nombre = document.getElementById('reg-nombre').value;
          const email = document.getElementById('reg-email').value;
          const password = document.getElementById('reg-password').value;

          // Obtener "base de datos" local
          let usuarios = JSON.parse(localStorage.getItem('hh_usuarios')) || [];
          
          if (usuarios.find(u => u.email === email)) {
            alert("Este correo ya está registrado.");
            return;
          }

          // Crear y guardar nuevo usuario
          const nuevoUsuario = { nombre, email, password, telefono: "", direccion: "" };
          usuarios.push(nuevoUsuario);
          localStorage.setItem('hh_usuarios', JSON.stringify(usuarios));
          
          alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
          
          // Cambiar de modal (de Registro a Login)
          const modalRegistro = window.bootstrap.Modal.getInstance(document.getElementById('registerModal'));
          modalRegistro.hide();
          const modalLogin = new window.bootstrap.Modal(document.getElementById('loginModal'));
          modalLogin.show();
          formRegister.reset();
        });
      }

      // 3. Evento: Iniciar Sesión
      const formLogin = document.getElementById('form-login');
      if (formLogin) {
        formLogin.addEventListener('submit', function(e) {
          e.preventDefault();
          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;

          let usuarios = JSON.parse(localStorage.getItem('hh_usuarios')) || [];
          const usuarioEncontrado = usuarios.find(u => u.email === email && u.password === password);

          if (usuarioEncontrado) {
            usuarioActual = usuarioEncontrado;
            localStorage.setItem('hh_usuarioActivo', JSON.stringify(usuarioActual));
            actualizarInterfazUsuario();
            
            const modalLogin = window.bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            modalLogin.hide();
            formLogin.reset();
            alert("¡Bienvenido de vuelta, " + usuarioActual.nombre + "!");
          } else {
            alert("Correo o contraseña incorrectos.");
          }
        });
      }

      // 4. Evento: Guardar Cambios en el Perfil
      const formPerfil = document.getElementById('form-perfil');
      if (formPerfil) {
        formPerfil.addEventListener('submit', function(e) {
          e.preventDefault();
          const telefono = document.getElementById('perfil-telefono').value;
          const direccion = document.getElementById('perfil-direccion').value;

          // Actualizar usuario actual
          usuarioActual.telefono = telefono;
          usuarioActual.direccion = direccion;
          localStorage.setItem('hh_usuarioActivo', JSON.stringify(usuarioActual));

          // Actualizar en la base de datos general
          let usuarios = JSON.parse(localStorage.getItem('hh_usuarios')) || [];
          const index = usuarios.findIndex(u => u.email === usuarioActual.email);
          if(index !== -1) {
            usuarios[index] = usuarioActual;
            localStorage.setItem('hh_usuarios', JSON.stringify(usuarios));
          }

          alert("Datos de entrega actualizados correctamente.");
          const modalPerfil = window.bootstrap.Modal.getInstance(document.getElementById('perfilModal'));
          modalPerfil.hide();
        });
      }

      // 5. Evento: Cerrar Sesión
      const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
      if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', function() {
          usuarioActual = null;
          localStorage.removeItem('hh_usuarioActivo');
          actualizarInterfazUsuario();
          const modalPerfil = window.bootstrap.Modal.getInstance(document.getElementById('perfilModal'));
          modalPerfil.hide();
        });
      }
    },

    logBaselineInfo: function () {
      console.info(
        '%c🌿 HuertoHogar — Módulos Activos\n' +
        '✔ Carrito de Compras\n✔ Autenticación (LocalStorage)',
        'color: #2E8B57; font-weight: bold; font-size: 1.1rem;'
      );
    }
  };


  // FUNCIONES

  
  // Cambia el botón del nav dependiendo de si el usuario está conectado
  function actualizarInterfazUsuario() {
    const btnNavCuenta = document.getElementById('btn-nav-cuenta');
    if (!btnNavCuenta) return;

    if (usuarioActual) {
      // Usuario logueado
      btnNavCuenta.innerHTML = `<i class="bi bi-person-check-fill"></i> Hola, ${usuarioActual.nombre.split(' ')[0]}`;
      btnNavCuenta.setAttribute('data-bs-target', '#perfilModal');
      
      // Llenar datos perfil
      document.getElementById('perfil-nombre').value = usuarioActual.nombre;
      document.getElementById('perfil-email').value = usuarioActual.email;
      document.getElementById('perfil-telefono').value = usuarioActual.telefono || "";
      document.getElementById('perfil-direccion').value = usuarioActual.direccion || "";
    } else {
      // Usuario no logueado
      btnNavCuenta.innerHTML = `<i class="bi bi-person-circle"></i> Iniciar Sesión`;
      btnNavCuenta.setAttribute('data-bs-target', '#loginModal');
    }
  }


  // FUNCIONES DEL CARRITO

  function agregarAlCarrito(productoNuevo) {
    const productoExistente = carrito.find(item => item.nombre === productoNuevo.nombre);
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push(productoNuevo);
    }
    actualizarCarritoHTML();
    
    const panelCarrito = document.getElementById('carritoOffcanvas');
    if(panelCarrito && window.bootstrap) {
      const offcanvasCarrito = window.bootstrap.Offcanvas.getOrCreateInstance(panelCarrito);
      offcanvasCarrito.show();
    }
  }

  function actualizarCarritoHTML() {
    const contenedorItems = document.getElementById('carrito-items');
    const totalElemento = document.getElementById('total-carrito');
    const contadorInsignia = document.getElementById('contador-carrito');
    const btnComprar = document.getElementById('btn-comprar');
    
    if(!contenedorItems) return;

    contenedorItems.innerHTML = '';
    let total = 0;
    let cantidadTotal = 0;

    if(carrito.length === 0) {
      contenedorItems.innerHTML = '<p class="text-center text-muted mt-5">Tu carrito está vacío.</p>';
      btnComprar.disabled = true;
    } else {
      btnComprar.disabled = false;
      carrito.forEach((producto, index) => {
        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;
        contenedorItems.innerHTML += `
          <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
            <div class="d-flex align-items-center" style="width: 60%;">
              <img src="${producto.imagen}" class="rounded me-2" style="width: 50px; height: 50px; object-fit: cover;">
              <div>
                <h6 class="mb-0 small fw-bold lh-sm">${producto.nombre}</h6>
                <small class="text-success">$${producto.precio.toLocaleString('es-CL')}</small>
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-end" style="width: 40%;">
              <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="cambiarCantidad(${index}, -1)">-</button>
              <span class="mx-2 small">${producto.cantidad}</span>
              <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="cambiarCantidad(${index}, 1)">+</button>
              <button class="btn btn-sm btn-danger py-0 px-2 ms-2" onclick="eliminarProducto(${index})">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        `;
      });
    }
    contadorInsignia.innerText = cantidadTotal;
    totalElemento.innerText = '$' + total.toLocaleString('es-CL') + ' CLP';
  }

  window.cambiarCantidad = function (index, cambio) {
    carrito[index].cantidad += cambio;
    if (carrito[index].cantidad <= 0) window.eliminarProducto(index);
    else actualizarCarritoHTML();
  };

  window.eliminarProducto = function (index) {
    carrito.splice(index, 1);
    actualizarCarritoHTML();
  };

  // ARRANQUE

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => HuertoHogarApp.init());
  } else {
    HuertoHogarApp.init();
  }
})();