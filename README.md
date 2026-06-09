# CIPSA - Comparador de Precios y Simulador de Márgenes

> **G360 > Análisis Estratégico de Precios**
> Aplicación corporativa para el levantamiento competitivo y simulación de rentabilidad en la cadena de valor.

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat&logo=react)](https://es.react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![G360](https://img.shields.io/badge/Skill-corporativo--g360-00d084?style=flat)](https://github.com/carloscus/g360-cli)

---

## Descripción

Esta herramienta forma parte del ecosistema **G360** y está diseñada para transformar el levantamiento de precios en campo en una herramienta de decisión estratégica. Permite a la fuerza de ventas capturar datos en tiempo real y a la jefatura simular escenarios de rentabilidad interna mediante exportaciones dinámicas.

### Características Principales

| Módulo | Descripción |
|--------|-------------|
| **Comparador de Precios** | Compara precios entre tu marca y hasta 5 competidores con variaciones porcentuales automáticas |
| **Simulador de Márgenes** | Panel lateral (Portales) para simular propuestas comerciales con validación de "Ranking de Estante". |
| **Reporte para Jefatura** | Hoja secundaria en Excel que permite a la gerencia ingresar el **Costo de Fábrica** y configurar un **Margen de Protección** mínimo con alertas automáticas (Semáforo). |
| **Exportación XLSX Robusta** | Celdas editables protegidas mediante formato condicional para que no pierdan su estilo (amarillo) al realizar pegados masivos de datos. |
| **Persistencia** | Datos de costo y propuestas persisten en localStorage entre sesiones |
| **Carga Masiva** | Sistema de importación mediante plantilla Excel para poblar el comparador con cientos de registros en segundos. |
| **Identidad EAN13** | Integración total con códigos de barras de 13 dígitos para sincronización con ERPs corporativos. |

### Flujo de Trabajo

```
Comparador → Slide-over (simular márgenes) → Agregar al Informe → Exportar XLSX
```

Todo en una sola página: el vendedor levanta precios, simula propuestas en el slide-over, confirma, y exporta un XLSX unificado para jefatura.

---

## Autores

| Rol | Nombre | Contribución |
|-----|--------|--------------|
| **Desarrollador Principal** | [Carlos Cusi](mailto:ccusi@outlook.com) | Arquitectura, implementación, diseño UI/UX, lógica de negocio |
| **Asistente de IA** | Claude (Anthropic) / OpenCode | Código, documentación, refactorización, resolución de problemas |

---

## Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca de interfaz de usuario
- **TypeScript 5.9** - Tipado estático
- **Vite 7** - Build tool y servidor de desarrollo
- **Tailwind CSS 3.4** - Estilos utilitarios (CSS variables en `design-system.css`)
- **Zustand 5** - Gestión de estado (con persist localStorage)
- **React Router DOM 7** - Navegación
- **Recharts 3** - Gráficos interactivos
- **React Hook Form** - Formularios
- **Zod 4** - Validación de esquemas
- **ExcelJS** - Generación de archivos Excel con fórmulas nativas
- **Lucide React** - Iconos
- **html2canvas** - Captura de pantallas

---

## Estructura del Proyecto

```
g360-price-audit/
├── public/
│   └── data/
│       └── productos.json         # Catálogo de productos
├── src/
│   ├── components/
│   │   ├── comparador/            # ComparisonBar, PriceInput, ProductAnalysisCard, MiniPriceChart
│   │   ├── margen/                # MarginSlideOver (simulador de propuestas)
│   │   ├── ui/                    # Button, Modal, SearchInput, Toast, Tooltip, etc.
│   │   ├── DataTable.tsx          # Tabla principal de precios
│   │   ├── ExcelJSExportButton.tsx # Exportación XLSX unificada
│   │   ├── Layout.tsx             # Layout con navbar
│   │   └── DatosGeneralesForm.tsx # Formulario de datos del cliente
│   ├── hooks/
│   │   ├── useComparadorColumns.tsx  # Columnas de la tabla + indicador verde de margen
│   │   ├── useMarginSlideOver.ts     # Lógica del slide-over (draft, merge, refresh)
│   │   ├── useComparadorExport.tsx   # Exportación PNG/HTML
│   │   ├── useComparadorKPIs.ts      # KPIs del comparador
│   │   └── useSearch.ts              # Búsqueda de productos
│   ├── pages/
│   │   ├── ComparadorPage.tsx     # Página única (comparador + margen integrado)
│   │   └── LoginPage.tsx         # Autenticación
│   ├── store/
│   │   ├── useAppStore.ts         # Estado principal (productos, precios, marcas)
│   │   └── useMarginStore.ts      # Estado de márgenes (prop1/prop2/ranking, persist)
│   ├── utils/
│   │   ├── excelJsGenerator.ts    # Generador XLSX unificado con fórmulas
│   │   ├── comparisonUtils.ts     # Cálculos de variación porcentual
│   │   └── ...                    # colorScheme, normalize, downloadBlob, etc.
│   ├── styles/
│   │   └── design-system.css      # CSS variables, slide-over animations
│   └── interfaces.ts              # Esquemas Zod + tipos
├── schemas/
│   └── precios.types.ts           # Tipos generados del catálogo
└── package.json
```

---

## Instalación y Ejecución

### Requisitos Previos

- **Node.js** 24.x (verificado con v24.14.0)
- **npm** 9.x o superior

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repositorio>
cd g360-price-audit
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5174
```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila la aplicación para producción (`tsc -b && vite build`) |
| `npm run lint` | Ejecuta el linter |
| `npm run preview` | Previsualiza la build de producción |

---

## Guía de Uso

### Comparador de Precios

1. **Configurar datos generales** - Documento del cliente (RUC/DNI), nombre, código, sucursal, fecha
2. **Ingresar marcas competidoras** - Hasta 5 marcas en los campos superiores (Marca 1 = "Mi Marca")
3. **Buscar productos** - Buscador con catálogo o agregar manualmente
4. **Ingresar precios** - Cada celda de la tabla es editable; las variaciones porcentuales se calculan automáticamente
5. **Simular márgenes** - Click en el botón Calculadora de cada fila para abrir el slide-over

### Simulador de Márgenes (Slide-over)

1. **Sección Actual** - Muestra costo, precio tienda y margen actual; ranking vs competencia
2. **Propuesta 1** - Mismo costo, nuevo precio → calcula margen y ranking automático
3. **Propuesta 2** - Nuevo costo y nuevo precio → calcula margen, dif. costo, impacto % y ranking
4. **Refrescar competencia** - Botón para actualizar precios de competencia desde la tabla sin cerrar el slide-over
5. **Agregar/Actualizar Informe** - Guarda los datos en el store persistente (indicador verde en el botón Calculadora)

### Exportación XLSX Unificada

- Un solo archivo con Comparador + Margen en la misma hoja
- **Celdas editables** (fondo amarillo, borde punteado): precio tienda, precios competencia, costo, prop1 precio, prop2 costo, prop2 precio
- **Fórmulas vivas**: ranking, margen, dif. costo, impacto % — se recalculan automáticamente al editar celdas en Excel
- **Ranking**: fórmula `IF(AND(comp<>"",comp<miPrecio),1,0)` por competidor, no COUNTIF

### Tablero Estratégico (Hoja 2)

- **Costo Fábrica vs Mayorista**: Permite ver la utilidad real de la empresa separada de la utilidad del punto de venta.
- **Margen de Protección**: Casilla dinámica (C2) donde se define el umbral de rentabilidad.
- **Semáforo de Alerta**: Las celdas se iluminan en rojo automáticamente si la propuesta comercial sacrifica demasiado margen de la empresa.
- **Persistencia de Estilo**: Uso de "Escudo de Color" mediante formato condicional para soportar Ctrl+V masivo sin perder el diseño.

---

## Modelo de Negocio

```
Fabricante → Mayorista → Tienda
                ↑
          Vendedor (usuario)
```

- **Costo** = precio de venta del fabricante al mayorista
- **Precio Tienda** = precio que cobra la tienda al consumidor final
- **Margen %** = (Precio Tienda - Costo) / Precio Tienda × 100
- **Ranking** = 1 + cantidad de competidores con precio menor al mío (1 = más barato = mejor posición)
- **Impacto %** = (P2 Costo - Costo) / Costo (cuánto cambia el costo con Propuesta 2)

---

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_TITLE=CIPSA Análisis de Precios
```

### Catálogo de Productos

El catálogo se encuentra en `public/data/productos.json`. Formato esperado:

```json
[
  {
    "codigo": "PROD001",
    "cod_ean": "1234567890123",
    "nombre": "Producto de Ejemplo",
    "linea": "Línea A",
    "peso": 1.5,
    "stock_referencial": 100,
    "precio_referencial": 25.00,
    "cantidad_por_caja": 12,
    "keywords": ["producto", "ejemplo"]
  }
]
```

---

## Ecosistema G360

Este proyecto forma parte de la familia de microherramientas **G360** para apoyo CRM y gestión de datos en escritorio, enfocadas en áreas como ventas, finanzas y logística.

### Skill Activo: `corporativo-g360`

| Token | Color | Uso |
|-------|-------|-----|
| `--color-primary-500` | `#1a56db` | Azul Marino corporativo (primario) |
| `--color-primary-800` | `#0b225a` | Header login / dark navy |
| `--color-secondary-500` | `#627d98` | Gris corporativo (secundario) |
| `--color-secondary-900` | `#102a43` | Texto principal |
| `--color-accent-500` | `#ef4444` | Rojo corporativo (coherente con logo CIPSA #FF0000) |
| `--color-success-500` | `#22c55e` | Éxito/positivo |
| `--color-warning-500` | `#f59e0b` | Advertencia |
| `--color-error-500` | `#ef4444` | Error/peligro |
| `--color-info-500` | `#3b82f6` | Informativo |
| `--color-text-inverse` | `#ffffff` | Texto sobre fondos oscuros |
| `--radius-lg` | `0.5rem` | Border radius |
| Dark mode bg | `#0c1929` | Fondo principal dark mode |

- **Signature**: `powered by G360` (modo `powered`)
- **Effects**: Glassmorphism habilitado
- **Device**: PC desktop
- **Paleta Corporativa**: Azul Marino (`#1a56db`) como primario, Gris Corporativo (`#627d98`) como secundario, Rojo (`#ef4444`) alineado con el logo CIPSA (`#FF0000`). Todos los colores se exponen como CSS variables en `src/styles/design-system.css`
- **Accesibilidad**: Contraste WCAG AA/AAA verificado en todos los pares fuente-fondo. Light y dark mode soportados

### g360-cli

[g360-cli](https://www.npmjs.com/package/g360-cli) es el CLI de scaffolding del ecosistema. Comandos relevantes:

```bash
# Inicializar proyecto con skill corporativo-g360
g360 init mi-proyecto --template web-pwa --skill corporativo-g360

# Cambiar skill del proyecto
g360 set-skill corporativo-g360

# Traer assets de marca CIPSA
g360 bring brand/cipsa

# Auditar compliance G360
g360 audit

# Limpiar código muerto antes de deploy
g360 clean --all --dry-run
```

### Convenciones G360 Aplicadas

| Convención | Implementación |
|------------|----------------|
| **Colores desde CSS variables** | No hardcodear; usar `var(--color-primary)`, `var(--g360-accent)` |
| **Core sin UI** | Lógica de negocio en `utils/` y `store/` sin imports de React |
| **UI con Core** | Componentes importan desde `store/` y `utils/` |
| **Locale es-PE** | Moneda S/, separador de miles coma, decimal punto |
| **Naming** | PascalCase componentes, camelCase hooks/utils, kebab-case CSS |
| **Glassmorphism** | Backdrop blur + superficie semi-transparente en navbar y cards |
| **Signature** | Footer con "powered by G360" + isotipo |

### Familia G360

> **G360** > Microherramientas para apoyo CRM y datos en escritorio

- **Isotipo**: 3 puntos verticales paralelos (gris → verde → gris) + chevron `>` = **G360 >**
- **Colores marca**: `#00d084` verde G360, `#94a3b8` gris
- **Signature**: `powered by G360` (modo `powered`) para proyectos de cliente | `G360 by ccusi` (modo `own`) para herramientas propias

### Herramientas Relacionadas

- **[g360-cli](https://github.com/carloscus/g360-cli)** - CLI de scaffolding para proyectos G360
- **[g360-signature](https://github.com/carloscus/g360-signature)** - Web component de branding G360
- **[g360-order-xlsx](https://github.com/carloscus/g360-order-xlsx)** - Procesador de cotizaciones Excel
- **[g360-precios-movil](https://github.com/carloscus/g360-precios-movil)** - Variante móvil del comparador

---

## Licencia

Desarrollado por Carlos Cusi con asistencia de IA.
