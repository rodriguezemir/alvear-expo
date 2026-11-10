# Fotos de las promociones

Las imágenes de este directorio se referencian por nombre de archivo desde
`src/data/promociones.json`, dentro del arreglo `galeria` de cada promoción.

## Agregar una foto

1. Copiá el archivo en esta carpeta (`.jpg`, `.jpeg`, `.png`, `.webp` o `.avif`).
2. Agregá una entrada en la galería de la promoción:

```json
{
  "imagen": "promocion-2026-nombre-del-archivo.jpg",
  "alt": "Descripción de la foto para accesibilidad",
  "epigrafe": "Texto que se muestra al ampliar la foto"
}
```

## Quitar una foto

Borrá su entrada de `galeria` en el JSON. El archivo puede quedarse en la
carpeta: si no está referenciado, no se muestra.

## Agregar una promoción o completar una vacía

Cada objeto del JSON necesita un `id` único (se usa el año) y, además,
`anio`, `color`, `actividades` y `galeria`. Una promoción sin `lema`,
`descripcion`, actividades ni fotos
aparece en el menú como «sin datos» y no genera página propia. Al agregarle
contenido, la ruta `/promociones/<anio>/` se genera automáticamente.

El campo `color` (hexadecimal de seis dígitos) define el acento visual de la
página de esa promoción.

Si una entrada de `galeria` apunta a un archivo que no existe, el build avisa
por consola y esa foto se omite.
