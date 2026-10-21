import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Catalogo de emprendimientos escolares de la Expo Alvear 2026.
 *
 * El archivo JSON vive en src/data/empresas.json y se carga con el loader
 * `file()`: un unico documento, sin duplicar datos en un directorio de
 * entradas. El esquema valida los tipos en build, asi que un dato mal
 * formado rompe el build y no la pagina.
 */
const empresas = defineCollection({
	loader: file('./src/data/empresas.json'),
	schema: z.object({
		nombre: z.string(),
		slug: z.string(),
		curso: z.string(),
		producto: z.string(),
		actividad: z.string(),
		expediente: z.string(),
		integrantes: z.string(),
		/** Nombres de archivo dentro de src/assets/empresas. */
		imagenes: z.array(z.string()),
		portada: z.string(),
		productos: z.array(
			z.object({
				producto: z.string(),
				/** null cuando el precio todavia no fue cargado. */
				precio: z.number().nullable(),
				disponible: z.number().nullable(),
				estado: z.string(),
			}),
		),
	}),
});

export const collections = { empresas };
