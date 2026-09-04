# HuertoHogar 🌿

> **Del campo a tu hogar** — Tienda online de productos frescos, naturales y de origen agrícola chileno.

---

## 1. Descripción y Contexto Académico

**HuertoHogar** es el proyecto de caso semestral desarrollado para la asignatura **DSY1104 — Desarrollo Full Stack II**.

La iniciativa busca conectar a pequeños y medianos agricultores locales con los hogares chilenos, ofreciendo una experiencia digital limpia, transparente y orientada a la alimentación consciente y saludable.

> **Nota de alcance:** Conforme a las directrices de la asignatura, los requerimientos finales y componentes transaccionales del proyecto deben ser validados progresivamente por el equipo docente.

---

## 2. Estado Actual — Baseline Fundacional (`HH-FOUNDATION-01`)

Esta entrega establece la **fundación técnica y visual** inicial del repositorio. Se enfoca en una arquitectura ligera, mantenible, responsive y documentada, evitando la implementación prematura de funcionalidades no aprobadas.

### ✅ Qué está implementado
* **Estructura base del proyecto:** Organización limpia de carpetas y archivos estáticos.
* **Shell semántico HTML5:** Maquetación con `<header>`, `<nav>`, `<main>`, `<section>`, y `<footer>`.
* **Identidad visual base:** Paleta de colores oficial (verde esmeralda, mostaza, marrón, fondos claros) y tipografías (`Playfair Display` y `Montserrat`).
* **Navegación responsive:** Barra de navegación adaptable (desktop/móvil) con integración de Bootstrap 5.
* **Superficie de catálogo preparada:** Sección semántica estructurada para recibir el catálogo de productos cuando corresponda.
* **JavaScript Vanilla modular:** Punto de entrada limpio para interacción básica (gestión del DOM, año dinámico, navegación fluida).

### ⏳ Fuera de alcance en esta fase (Deliberado)
* Autenticación y registro de usuarios.
* Base de datos y backend transaccional.
* Carrito de compras y pasarela de pagos / checkout.
* Catálogo dinámico y filtros de búsqueda avanzados.
* Seguimiento de envíos en tiempo real y mapas.
* Sistema de fidelización y puntos.
* Frameworks pesados o bundlers no autorizados en esta fase.

---

## 3. Stack Tecnológico

El stack actual se mantiene deliberadamente apegado al estándar académico inicial:

* **HTML5:** Semántica web estructurada y accesible.
* **CSS3:** Variables nativas (`custom properties`), diseño responsivo y layout moderno.
* **JavaScript (ES6+):** Vanilla JS moderno, modular y sin dependencias pesadas.
* **Bootstrap 5 (CDN):** Soporte de grilla, componentes base y responsive utility.
* **Bootstrap Icons (CDN):** Iconografía vectorial ligera y consistente.
* **Google Fonts:** Fuentes oficiales del caso (`Montserrat` y `Playfair Display`).

---

## 4. Estructura del Repositorio

```text
HuertoHogar/
├── index.html              # Shell principal de la aplicación
├── assets/
│   ├── css/
│   │   └── styles.css      # Variables de diseño y estilos personalizados
│   ├── js/
│   │   └── main.js         # Lógica JavaScript vanilla de la fundación
│   └── img/                # Recursos gráficos y multimedia
├── .gitignore              # Reglas de exclusión para Git
└── README.md               # Documentación general del baseline
```

---

## 5. Cómo Ejecutar el Proyecto Localmente

No se requiere ningún gestor de paquetes ni instalación de backend para este baseline.

### Opción 1: Abrir directamente en el navegador
Hacer doble clic sobre el archivo `index.html` o abrirlo directamente desde el navegador web de su preferencia.

### Opción 2: Usar un servidor local estático (Recomendado)

* **Con Python 3:**
  ```bash
  python -m http.server 8000
  ```
  Luego ingresar a `http://localhost:8000`.

* **Con Node.js (`serve` o `http-server`):**
  ```bash
  npx serve .
  ```

* **Con VS Code:**
  Utilizar la extensión **Live Server** haciendo clic en *"Go Live"* en la barra inferior.

---

## 6. Próximos Pasos

A medida que se reciban las especificaciones y validaciones docentes para DSY1104, se incorporarán modularmente las siguientes capacidades:
1. Modelado de datos para catálogo y categorías de productos.
2. Gestión de estado para carrito de compras.
3. Vistas y flujos de autenticación de clientes y productores.
4. Conexión con servicios backend y persistencia.
