# Estilos del Panel Administrativo

Esta carpeta contiene todos los estilos CSS del panel administrativo, organizados de forma modular para facilitar su edición.

## Estructura

```
styles/admin/
├── index.css              # Archivo principal que importa todos los estilos
├── variables.css          # Variables CSS (colores, espaciado, etc.)
├── components/
│   ├── header.css        # Estilos del header administrativo
│   └── dashboard.css     # Estilos del dashboard principal
└── README.md             # Este archivo
```

## Variables CSS

El archivo `variables.css` contiene todas las variables personalizables:

### Colores Principales
- `--admin-bg-primary`: Color de fondo principal (#0f172a)
- `--admin-bg-card`: Color de fondo de las tarjetas (#1e293b)
- `--admin-bg-hover`: Color de fondo al hacer hover (#334155)

### Colores de Texto
- `--admin-text-primary`: Color de texto principal (#ffffff)
- `--admin-text-secondary`: Color de texto secundario (#9ca3af)
- `--admin-text-muted`: Color de texto atenuado (#6b7280)

### Colores de Acento
- `--admin-accent-gold`: Dorado (#d4af37)
- `--admin-accent-blue`: Azul (#3b82f6)
- `--admin-accent-green`: Verde (#10b981)
- `--admin-accent-purple`: Morado (#8b5cf6)
- `--admin-accent-orange`: Naranja (#f59e0b)

### Colores de Estado
- `--admin-status-success`: Verde de éxito (#10b981)
- `--admin-status-active`: Azul activo (#3b82f6)
- `--admin-status-warning`: Amarillo de advertencia (#f59e0b)
- `--admin-status-error`: Rojo de error (#ef4444)

## Cómo Editar los Estilos

### Para cambiar colores:
1. Abre `variables.css`
2. Modifica las variables CSS correspondientes
3. Los cambios se aplicarán automáticamente a todos los componentes

### Para cambiar estilos de componentes específicos:
1. Abre el archivo CSS correspondiente en `components/`
2. Modifica las clases CSS según necesites

### Para agregar nuevos estilos:
1. Crea un nuevo archivo CSS en `components/` si es necesario
2. Importa el archivo en `index.css`
3. Usa las variables CSS definidas en `variables.css` para mantener consistencia

## Ejemplo de Uso

```css
/* En variables.css */
:root {
  --admin-accent-gold: #ffd700; /* Cambiar a un dorado más brillante */
}

/* Los cambios se aplicarán automáticamente a todos los elementos que usen esta variable */
```

