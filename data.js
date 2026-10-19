/* ============================================================
   ESM · Control de Sellos v2 — DATOS DE EJEMPLO (prototipo)
   ------------------------------------------------------------
   Puntos de control de Minera Centinela y sus sellos.
   Los números vienen de la planilla "Control puntos vulnerables"
   (PV), de los certificados del 20-07-2026 y de las fotos de
   terreno del 10-10-2026. Se cargan como REFERENCIA: el primer
   control hecho en la app pasa a ser la base real.
   Para editar la lista de puntos, modifica este archivo.
   ============================================================ */
(function () {
  const PV = { label: 'Planilla puntos vulnerables', date: null };
  const CERT = { label: 'Certificado Enex 20-07-2026', date: '2026-07-20' };
  const FOTO = { label: 'Fotos de terreno 10-10-2026', date: '2026-10-10' };
  const CALIB = { label: 'Certificado de calibración 26-09-2026', date: '2026-09-26' };

  // Sellos de un meter mecánico
  const SEALS_CAMION = [
    { id: 'pulser', name: 'Pulser' },
    { id: 'clp', name: 'Cuenta litros / Plato', hint: 'Un solo sello: afianza el cabezal al meter' },
    { id: 'micro', name: 'Micrómetro', hint: 'En el certificado Enex se llama "Sello ajuste"' },
    { id: 'cuerpo', name: 'Cuerpo medidor', tentative: true, hint: '"Sellos cabezal cuerpo medidor" en el certificado Enex' }
  ];
  const SEALS_PETRO = [
    { id: 'pulser', name: 'Pulser' },
    { id: 'clp', name: 'Cuenta litros / Cabezal', hint: 'Un solo sello: afianza el cabezal al meter' },
    { id: 'micro', name: 'Ajuste', hint: 'Equivale al micrómetro' },
    { id: 'cuerpo', name: 'Cuerpo medidor', tentative: true }
  ];
  const SEAL_DIGITAL = [{ id: 'digital', name: 'Contador digital (Liquid Controls)' }];
  const SEAL_EDS = [{ id: 'tapa', name: 'Tapa de acceso al micrómetro', tentative: true }];

  // v = [pulser, cuenta litros/plato, micrómetro, cuerpo]; null = sin dato; 'NA' = no aplica (p. ej. pulser análogo)
  function ref(arr, src) {
    const ids = ['pulser', 'clp', 'micro', 'cuerpo'];
    const out = {};
    arr.forEach((v, i) => {
      if (v === null || v === undefined) return;
      if (v === 'NA') out[ids[i]] = { na: true, naReason: 'Pulser análogo (sin sello)', label: src.label, date: src.date };
      else out[ids[i]] = { num: String(v), label: src.label, date: src.date };
    });
    return out;
  }
  function meterComp(id, name, seals, base, meter) {
    return { id, name, kind: 'meter', seals, base: base || {}, meter: meter || null };
  }
  function truck(ppu, vr150, vr300, opts) {
    opts = opts || {};
    const comps = [];
    comps.push(meterComp('m150', 'Meter VR150 / OPW 7H', SEALS_CAMION, vr150 ? ref(vr150, opts.src150 || PV) : {}, opts.meter150));
    if (opts.noVR300 !== true) comps.push(meterComp('m300', 'Meter VR300', SEALS_CAMION, vr300 ? ref(vr300, opts.src300 || PV) : {}, opts.meter300));
    comps[0].sub = 'Surtidores 1 (7H) y 2 (VR150)';
    if (comps[1]) comps[1].sub = 'Surtidor 3';
    return { id: 'cam-' + ppu, type: 'camion', name: ppu, note: opts.note || '', comps };
  }

  const camiones = [
    truck('RKSV46', null, null, { note: 'Sin números en la planilla (estaba en taller Calama)' }),
    truck('RKSV49', [2186, 1093, 5938], [2153, 2173, 2131]),
    truck('SKPJ31', [2132, 1073, 1154], [2176, 1168, 1131], { note: 'VR300: cambio de meter el 04-07-2026' }),
    truck('SKPJ32', [null, 2084, null, 2077], [null, 6364, null, 6368], {
      src150: CERT, src300: CERT,
      meter150: { serial: '116500307', model: 'M-10-1', label: CERT.label, date: CERT.date },
      meter300: { serial: '116942604', model: 'M-25-1', label: CERT.label, date: CERT.date }
    }),
    truck('SKPL78', [2191, 2702, 2167], [2931, 2950, 2139]),
    truck('SKPL79', [2130, 2160, 2429], [2151, 1002, 2122]),
    truck('SKPL80', [2187, 2181, 557], [2294, 2129, 490]),
    truck('SXCF76', [1532, 2811, 1517], [1335, 1309, 1531]),
    truck('SXCF77', [2152, 2243, 2107], [2169, 2165, 2124]),
    truck('SXGG83', [2194, 2177, 14457], null, { noVR300: true, note: 'Solo inyector VR150 / 7H según planilla' }),
    truck('SXGH41', [1527, 1072, 2026], null, { note: 'VR300 sin números en la planilla' }),
    truck('SXGH43', [15676, 157, 14359], null, { noVR300: true, note: 'Solo inyector VR150 / 7H según planilla' }),
    truck('TBGJ67', [1369, 1316, 1335], [2198, 2193, 2111]),
    truck('TBGJ68', [1028, 2220, 437], [1080, 2019, 1030]),
    truck('TBGJ69', [1373, 2249, 14423], [1392, 1331, 1301]),
    truck('TBGJ70', [2123, 2742, 16463], [2171, 2753, 2146]),
    truck('TBGJ71', [1061, 412, 439], [1085, 189, 1070]),
    truck('TBGJ72', [2180, 2309, 14353], [2689, 1059, 2393]),
    truck('TBGJ73', [1026, 2893, 2879], [1042, 2076, 2196]),
    truck('VFZK21', ['NA', 2148, 2482, 558], ['NA', 1328, 1388, 41019], {
      meter150: { serial: '859792', model: '700-25SPA4AL', label: CERT.label, date: CERT.date },
      meter300: { serial: '860375', model: '700-35SPA4AL', label: CERT.label, date: CERT.date },
      note: 'Pulser análogo en ambos meters. El certificado de julio tiene el ajuste y el cabezal del VR300 al revés que la planilla.'
    }),
    truck('VFZK22', [null, 2872, 2182, 551], [null, 514, 6216, 41024], {
      src150: CERT, src300: CERT,
      meter150: { serial: '864582', model: '700-25SPA4AL', label: CERT.label, date: CERT.date },
      meter300: { serial: '865109', model: '700-35SPA4AL', label: CERT.label, date: CERT.date }
    }),
    truck('VZRX97', null, null, { note: 'Nuevo en el dashboard de flota (DES); falta en la planilla PV' }),
    truck('VZRX98', [null, null, 1855], null, {
      src150: CALIB,
      meter150: { serial: '', model: 'M25', label: CALIB.label, date: CALIB.date },
      note: 'VR150 calibrado el 26-09-2026; falta en la planilla PV'
    })
  ];
  function petroMec(id, name, base, meter, note) {
    return { id, type: 'petrolera', name, sub: 'Medidor mecánico', note: note || '',
      comps: [meterComp('m1', 'Meter VR150 / VR300', SEALS_PETRO, base, meter)] };
  }
  function petroDig(id, name, nums, src, note) {
    nums = nums || {};
    const r = (n) => n ? { digital: { num: String(n), label: src.label, date: src.date } } : {};
    return { id, type: 'petrolera', name, sub: 'Registrador electrónico (Losa 1 y Losa 2)', note: note || '',
      comps: [
        { id: 'l1', name: 'Losa 1 · Registrador de despacho', sub: 'Despacho a equipos (150 y 300 GPM)', kind: 'registrador', seals: SEAL_DIGITAL, base: r(nums.l1) },
        { id: 'l2d', name: 'Losa 2 · Registrador descarga camión tanque', kind: 'registrador', seals: SEAL_DIGITAL, base: r(nums.l2d) },
        { id: 'l2c', name: 'Losa 2 · Registrador carga camión tanque', kind: 'registrador', seals: SEAL_DIGITAL, base: r(nums.l2c) }
      ] };
  }

  const petroleras = [
    petroMec('pet-OXI', 'Petrolera Óxidos', ref([6245, 185, 2528], PV), null),
    petroMec('pet-SM1', 'Petrolera SM1', { clp: { num: '429', label: FOTO.label, date: FOTO.date }, micro: { num: '1018', label: FOTO.label, date: FOTO.date } },
      { serial: '116500405', model: 'M-25-1 (Liquid Controls)', label: FOTO.label, date: FOTO.date },
      'Calibrada por Pillado el 08-10-2026. El pulser tiene sello, pero su número no está registrado.'),
    petroMec('pet-SM2', 'Petrolera SM2', ref([null, 2440, 16185], PV), null, 'Calibrada por Pillado el 06-10-2026'),
    petroDig('pet-SM3', 'Petrolera SM3', { l1: 338, l2d: 433, l2c: 436 }, FOTO),
    petroDig('pet-ESS', 'Petrolera Esperanza Sur (ESS)', { l1: 1391, l2c: 227 }, PV, 'Asignación de números a cada losa por confirmar'),
    petroDig('pet-DES', 'Petrolera DES', {}, PV, 'Sin números en la planilla')
  ];

  function eds(id, name, surtidores, note) {
    return { id, type: 'eds', name, note: note || '',
      comps: surtidores.map((s, i) => ({ id: 's' + (i + 1), name: 'Surtidor ' + (i + 1) + ' · ' + s, kind: 'surtidor', seals: SEAL_EDS, base: {} })) };
  }
  const estaciones = [
    eds('eds-OXI', 'EDS Óxidos', ['Diésel', 'Diésel', 'Diésel', 'Bencina'], 'Único surtidor de bencina en Minera Centinela'),
    eds('eds-SUL', 'EDS Súlfuros (Esperanza)', ['Diésel']),
    eds('eds-ENC', 'EDS Encuentro (DES)', ['Diésel']),
    eds('eds-MUE', 'EDS Muelle Centinela', ['Diésel'])
  ];

  const tanques = [
    { id: 'tk-OXI', type: 'tanque', name: 'Tanque vertical Petrolera Óxidos', sub: 'Diésel', note: 'Confirmar en terreno si las válvulas tienen sello',
      comps: [{ id: 'v', name: 'Válvulas de drenaje', kind: 'valvulas', seals: [
        { id: 'agua', name: 'Válvula de drenaje de agua', tentative: true },
        { id: 'prod', name: 'Válvula de drenaje de producto', tentative: true }
      ], base: {} }] }
  ];

  window.SELLOS_DATA = {
    version: '2026-10-19',
    types: [
      { id: 'camion', name: 'Camión de combustible', plural: 'Camiones de combustible', img: 'img/camion.jpg' },
      { id: 'petrolera', name: 'Petrolera', plural: 'Petroleras', img: 'img/petrolera.jpg' },
      { id: 'eds', name: 'Estación de servicio', plural: 'Estaciones de servicio', img: 'img/eds.jpg' },
      { id: 'tanque', name: 'Tanque vertical', plural: 'Tanques verticales', img: 'img/tanque.jpg' }
    ],
    points: [].concat(camiones, petroleras, estaciones, tanques),
    motivos: ['Calibración Pillado', 'Calibración ESM', 'Cambio o mantención de meter', 'Sello dañado y reemplazado', 'Desconocido, en investigación'],
    causasCierre: ['Calibración Pillado', 'Calibración ESM', 'Cambio o mantención de meter', 'Sello dañado y reemplazado', 'Error de registro', 'Manipulación (escalar)', 'Otra'],
    supuestos: [
      'Cuarto sello "Cuerpo medidor" en cada meter (aparece en los certificados Enex como "sellos cabezal cuerpo medidor").',
      'Estaciones de servicio: 1 sello por surtidor, en la tapa de acceso al micrómetro.',
      'Tanque vertical de Óxidos: 2 sellos, en las válvulas de drenaje de agua y de producto.',
      'Petroleras electrónicas (SM3, ESS, DES): Losa 1 con 1 registrador y Losa 2 con 2 registradores, 1 sello cada uno.',
      'En ESS, la asignación de los números de la planilla a cada losa.',
      'Código del registro: PN.OM.DM.MN.F.04, versión 1 (por validar con el AdC).',
      'Los números cargados vienen de la planilla PV, los certificados de julio y las fotos de octubre: son referencia, no base oficial.'
    ]
  };
})();
