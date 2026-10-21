import type { ImageMetadata } from 'astro';

/**
 * Resolucion de las fotos de la Especialidad Tecnica.
 *
 * Mismo criterio que src/lib/empresas.ts: import estatico de todas las
 * imagenes para que Astro las procese con sharp y sirva webp/avif con
 * srcset, en vez de los JPEG originales.
 */
const modulos = import.meta.glob<{ default: ImageMetadata }>('../assets/tecnica/*.{jpg,jpeg,png}', {
	eager: true,
});

const porNombre = new Map<string, ImageMetadata>();

for (const [ruta, modulo] of Object.entries(modulos)) {
	const nombre = ruta.split('/').pop()!;
	porNombre.set(nombre, modulo.default);
}

/** Devuelve la foto de la Tecnica por nombre de archivo, o undefined si falta. */
export function fotoTecnica(nombre: string): ImageMetadata | undefined {
	return porNombre.get(nombre);
}
