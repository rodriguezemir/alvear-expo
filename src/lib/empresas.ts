import type { ImageMetadata } from 'astro';

/**
 * Resolucion de las fotos de los emprendimientos.
 *
 * Las imagenes viven en src/assets/empresas y se referencian por nombre de
 * archivo desde el catalogo. Este glob las importa todas de una vez para que
 * Astro las procese con sharp: genera .webp/.avif optimizados y sus
 * srcset, en vez de servir los JPEG originales de 8 MB.
 *
 * Es un import estatico a proposito: Vite lo resuelve en build, asi que no
 * hay codigo dinamico en runtime ni rutas que 404.
 */
const modulos = import.meta.glob<{ default: ImageMetadata }>('../assets/empresas/*.jpeg', {
	eager: true,
});

const porNombre = new Map<string, ImageMetadata>();

for (const [ruta, modulo] of Object.entries(modulos)) {
	const nombre = ruta.split('/').pop()!;
	porNombre.set(nombre, modulo.default);
}

/** Devuelve la foto de portada de un emprendimiento, o undefined si falta. */
export function foto(nombre: string): ImageMetadata | undefined {
	return porNombre.get(nombre);
}

/** Todas las fotos de un emprendimiento, en el orden del catalogo. */
export function fotos(nombres: string[]): ImageMetadata[] {
	return nombres.map((n) => porNombre.get(n)).filter((f): f is ImageMetadata => Boolean(f));
}
