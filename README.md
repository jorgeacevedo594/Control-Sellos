# ESM · Control de Sellos v2 — PROTOTIPO

App borrador para **ver y mostrar** cómo funcionaría el nuevo control de sellos en Minera Centinela
(camiones de combustible, petroleras, estaciones de servicio y el tanque vertical de Óxidos).
Reemplaza a la app anterior (certificado F.01).

> **Es un prototipo.** No tiene servidor: lo que se registra queda guardado **solo en el teléfono
> que se usa**. No se comparte entre personas. Sirve para probar el flujo y recoger mejoras.

## Qué se puede probar
1. **Ingresar** eligiendo un perfil: Jefe de Turno (JT), Supervisor de Operaciones (SO),
   Supervisor de Mantenimiento (SM) o Administrador de Contrato (AdC). Se puede cambiar en *Ajustes*.
2. **Nuevo control** (JT o SO): elegir tipo de punto → punto → registrar cada sello con foto
   (solo cámara) → revisar → firmar con el dedo → descargar el PDF.
3. **Interruptor A/B** (en el control y en *Ajustes*):
   - **A:** la app muestra el último número y se confirma *Coincide / No coincide / Sin sello / No aplica*.
   - **B:** se escribe el número que se lee y la app compara sin mostrar el anterior.
4. **Alertas:** si un sello no coincide con el último registro hecho en la app, si falta el sello,
   o si cambió el N° de serie del meter. Si la diferencia es contra un número de *referencia*
   (planilla, certificado o fotos), queda marcado “revisar”, sin alerta.
5. **Bandeja de firmas** (SO y AdC): validar uno o varios controles con una sola firma.
6. **Cerrar alertas** (SM) indicando la causa.
7. **Calibración** (SM): registrar los sellos nuevos para que el próximo control no salte como alerta.
8. **Estado de los puntos:** quién está al día (semanal JT, mensual SO/AdC), con alerta o sin control.
9. **Equipo fuera de faena:** se registra sin controlar sellos.
10. **Reiniciar demo** (en *Ajustes*): borra lo registrado y vuelve a los 4 ejemplos iniciales.

## Archivos
| Archivo | Qué es |
|---|---|
| `index.html` | La app completa |
| `data.js` | Lista de puntos, sellos y números de referencia (aquí se editan los puntos) |
| `sw.js` | Permite abrir la app sin señal (versión de caché **v3**) |
| `manifest.webmanifest` | Para instalarla como app en el teléfono |
| `icon-192.png`, `icon-512.png` | Íconos |
| `img/` | Logo ESM e ilustraciones de los 4 tipos de punto |

## Subirla a GitHub reemplazando la app anterior
1. Entra a tu repositorio de la app anterior en github.com.
2. Pulsa **Add file → Upload files**.
3. Arrastra **todo el contenido** de esta carpeta (los archivos sueltos **y la carpeta `img`**).
   Los archivos con el mismo nombre (`index.html`, `sw.js`, `manifest.webmanifest`, íconos,
   `README.md`) se reemplazan; `data.js` y `img/` se agregan.
4. Abajo escribe un mensaje (ej.: “Prototipo Control de Sellos v2”) y pulsa **Commit changes**.
5. Espera 1 a 2 minutos y abre el mismo link de siempre. Si todavía aparece la app anterior,
   ciérrala y vuelve a abrirla (o recarga la página): la caché v3 borra la versión antigua.

GitHub guarda el historial: si alguna vez necesitas la app anterior, se puede recuperar.

## A tener en cuenta
- **PDF:** la librería que arma el PDF se descarga de internet la primera vez; después queda
  guardada y funciona sin señal.
- **Fotos:** se comprimen en el teléfono (~10 a 80 KB cada una) manteniendo el número legible.
- **Firma:** se abre a pantalla completa; conviene girar el teléfono.
- **Fecha y hora:** automática, editable.

## Supuestos por confirmar (también aparecen en *Ajustes*)
- Cuarto sello “Cuerpo medidor” en cada meter.
- Estaciones de servicio: 1 sello por surtidor, en la tapa de acceso al micrómetro
  (Óxidos con 4 surtidores: 3 diésel y 1 bencina; Súlfuros, Encuentro y Muelle con 1).
- Tanque vertical de Óxidos: 2 sellos (válvulas de drenaje de agua y de producto).
- Petroleras electrónicas (SM3, ESS, DES): Losa 1 con 1 registrador y Losa 2 con 2, 1 sello cada uno.
- Código del registro **PN.OM.DM.MN.F.04, versión 1** (por validar con el AdC).
- Los números cargados son **referencia**; el primer control en la app pasa a ser la base.

## Lo que falta para la app real (siguiente etapa)
- Servidor en Cloudflare (Workers + D1 + R2) para que todos vean los mismos datos, alertas y firmas.
- Ingreso con RUT y PIN por persona, y lista real de usuarios por cargo.
- Aviso de alertas al SO, SM y AdC (correo o notificación).
- Exportar los PDF de un mes completo.
- Decidir A o B, y confirmar los supuestos de arriba.
