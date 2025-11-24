# 🎮 Ta-Te-Ti (Tic Tac Toe)

Proyecto web del clásico **Ta-Te-Ti**, desarrollado con **HTML, CSS y JavaScript puro**.  
Pensado como práctica de **lógica de programación**, **maquetado moderno** y **enfoque QA**.

---

## ✨ Características principales

- ✅ Interfaz moderna tipo **card** con efecto glass/neo brutalism.
- ✅ Tablero de 3x3 totalmente interactivo.
- ✅ Marcador persistente:
  - Victorias de **Jugador X**
  - Victorias de **Jugador O**
  - **Empates**
- ✅ Controles:
  - **Reiniciar ronda** (mantiene el marcador).
  - **Reiniciar todo** (resetea tablero + marcador).
- ✅ Diseño **responsive**, centrado en pantallas desktop y adaptable a resoluciones menores.
- ✅ Enfoque en **accesibilidad**:
  - Celdas del tablero como `<button>`.
  - `aria-label` por celda.
  - Texto de estado con `aria-live="polite"`.

---

## 🧱 Tecnologías utilizadas

- **HTML5** – estructura semántica del juego.
- **CSS3** – layout, temática oscura, efectos visuales y diseño responsivo.
- **JavaScript Vanilla** – lógica del juego, manejo de estado y DOM.

---

## 📂 Estructura del proyecto

```bash
TaTeTi/
├── index.html      # Estructura principal del juego
├── styles.css      # Estilos y diseño de la interfaz
└── script.js       # Lógica del Ta-Te-Ti (JS puro)
