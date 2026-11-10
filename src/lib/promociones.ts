import type { ImageMetadata } from 'astro';

/**
 * Utilidades del archivo de promociones.
 *
 * Las fotos viven en src/assets/promociones y se referencian por nombre de
 * archivo desde src/data/promociones.json. El glob importa todo en build, así
 * que Astro las optimiza con sharp y no hay rutas que puedan romperse en
 * runtime.
 */
const modulos = import.meta.glob<{ default: ImageMetadata }>(
	'../assets/promociones/*.{jpeg,jpg,png,webp,avif}',
	{ eager: true },
);

const porNombre = new Map<string, ImageMetadata>();

for (const [ruta, modulo] of Object.entries(modulos)) {
	porNombre.set(ruta.split('/').pop()!, modulo.default);
}

/** Devuelve la foto de una promoción, o undefined si el archivo no existe. */
export function fotoPromocion(nombre: string): ImageMetadata | undefined {
	return porNombre.get(nombre);
}

type PromocionData = {
	lema?: string | null;
	descripcion?: string | null;
	actividades: readonly unknown[];
	galeria: readonly unknown[];
};

/**
 * Una promoción está publicada cuando tiene al menos un dato para mostrar.
 * Las que no lo están aparecen en el menú como "sin datos" y no generan ruta.
 */
export function tieneDatos(data: PromocionData): boolean {
	const texto = [data.lema, data.descripcion].some(
		(valor) => typeof valor === 'string' && valor.trim().length > 0,
	);

	return texto || data.actividades.length > 0 || data.galeria.length > 0;
}
