# ESM · Control de Sellos (PWA v1)

App móvil instalable para inspectores: completa el certificado **F.01** (verificación de
volúmenes / control de sellos), captura fotos de sellos y placas como evidencia (anexo del PDF),
**firma con el dedo** a pantalla completa y **descarga el PDF** (con anexo de fotos en la 2.ª página).
Funciona **online y offline**, en **Android e iOS**.

## Archivos
- `index.html` — la app completa (formulario, fotos de evidencia, firma, generación de PDF)
- `manifest.webmanifest` — para instalarla como app
- `sw.js` — service worker (offline)
- `icon-192.png`, `icon-512.png` — íconos

## Probarla rápido (local)
No basta con abrir el archivo: el service worker y la cámara requieren `https` o `localhost`.
```
cd esm-control-sellos
python3 -m http.server 8080
```
Abre `http://localhost:8080` en el teléfono (misma red) o en el navegador.

## Publicarla por link (gratis)
**Cloudflare Pages o GitHub Pages** (cualquiera sirve, ambos dan HTTPS, requisito de PWA):
- **GitHub Pages:** crea un repo, sube estos 5 archivos a la raíz, activa Pages (rama `main`, carpeta `/root`). Queda en `https://usuario.github.io/repo/`.
- **Cloudflare Pages:** "Create project" → conecta el repo o sube la carpeta. Build command: vacío. Output dir: `/`.

Con el link en el teléfono: en Android (Chrome) "Agregar a pantalla de inicio"; en iOS (Safari) "Compartir → Agregar a inicio".

## Notas de la v1
- **Fotos por campo:** el botón 📷 junto a cada campo de sello/placa toma una foto y la guarda etiquetada en el anexo del PDF. El valor del campo se escribe a mano (el OCR se retiró en sep-2026 por baja fiabilidad con sellos grabados en metal).
- **Orientación:** corrige la orientación EXIF al cargar la foto.
- **Porcentaje:** se autocalcula como `(Lectura Medidor / Lectura Patrón) × 100`. (Confirmar fórmula).
- **Sin compartir ni historial:** la app solo genera y descarga el PDF.
