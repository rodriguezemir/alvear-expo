"""
Despeckle dirigido para public/hero.png.

La foto original trae ~350 motas oscuras aisladas (ruido del sensor / hot
pixels) que al escalarse a pantalla completa se ven como cuadritos sueltos
contra el cielo. Este script:

  1. Detecta componentes conexos pequenos (2-40 px) de pixeles que no son
     azul de cielo (baja saturacion y brillo bajo).
  2. Reemplaza cada componente por la mediana de su anillo circundante de
     5 px, que es el color real del cielo en ese punto.

Los cables, ramas, ventanas y el edificio quedan intactos: son componentes
grandes, asi que nunca entran en el criterio.
"""

from collections import deque
from pathlib import Path

from PIL import Image

RUTA = Path("public/hero.png")
MAX_PX = 40  # motas mas grandes que esto son detalle real, no ruido
RING = 5  # radio del anillo del que se toma la mediana


def es_mota(r: int, g: int, b: int) -> bool:
    """Gris/marron oscuro: no es el azul del cielo ni el ladrillo saturado."""
    return max(r, g, b) - min(r, g, b) < 45 and r + g + b < 400


def componentes_aislados(mask, w, h):
    """Componentes conexas de 4 vecinos, entre 2 y MAX_PX pixeles."""
    vistos = set()
    for y in range(h):
        for x in range(w):
            if not mask[y][x] or (x, y) in vistos:
                continue

            cola = deque([(x, y)])
            vistos.add((x, y))
            puntos = []

            while cola:
                cx, cy = cola.popleft()
                puntos.append((cx, cy))
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = cx + dx, cy + dy
                    if (
                        0 <= nx < w
                        and 0 <= ny < h
                        and mask[ny][nx]
                        and (nx, ny) not in vistos
                    ):
                        vistos.add((nx, ny))
                        cola.append((nx, ny))

            if 2 <= len(puntos) <= MAX_PX:
                yield puntos


def main() -> None:
    im = Image.open(RUTA).convert("RGB")
    px = im.load()
    w, h = im.size

    mask = [[es_mota(*px[x, y]) for x in range(w)] for y in range(h)]

    motas = list(componentes_aislados(mask, w, h))

    for puntos in motas:
        # Anillo: pixeles vecinos que NO son parte de la mota.
        anillo = []
        for cx, cy in puntos:
            for dx in range(-RING, RING + 1):
                for dy in range(-RING, RING + 1):
                    if max(abs(dx), abs(dy)) != RING:
                        continue
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < w and 0 <= ny < h and not mask[ny][nx]:
                        anillo.append(px[nx, ny])

        if len(anillo) < 8:
            continue

        medianas = [sorted(p[c] for p in anillo)[len(anillo) // 2] for c in range(3)]
        for cx, cy in puntos:
            px[cx, cy] = tuple(medianas)

    im.save(RUTA, optimize=True)
    print(f"motas limpiadas: {len(motas)} -> {RUTA}")


if __name__ == "__main__":
    main()
