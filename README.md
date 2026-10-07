# Mi Ministerio — beta abierta para revisión

Código original bajo licencia MIT. Herramienta independiente, no oficial.

## Probar localmente

Requiere Node.js 22.13 o posterior y npm.

```
npm install
npm run dev
```

Abre la dirección de Vite y pulsa **Probar sin registrarme**.
Los datos ficticios y cambios de prueba permanecen en memoria; se borran al recargar.

```
npm test
npm run build
```

## Alcance

Incluye interfaz, reglas de informes, cronómetro, cifrado, IndexedDB, service worker,
API, esquema y migraciones D1 y pruebas. Vite permite revisar la interfaz sin cuentas.
El backend de `app/api/vault` y `db` requiere un adaptador Cloudflare Workers/Vinext,
un enlace D1 `DB` y una pasarela de autenticación confiable. Vite no implementa ese
backend: cuentas y copias en línea no están habilitadas en el lanzador local.
La pasarela debe reemplazar las cabeceras de identidad después de autenticar.
Nunca confíes en cabeceras enviadas directamente por clientes.

No se incluyen credenciales, identificadores del proyecto, datos de usuarios ni
componentes internos del proveedor de hosting. El código puede copiarse, revisarse,
modificarse y redistribuirse con las condiciones de LICENSE.

## Revisión sugerida

Adaptación móvil, accesibilidad, actividad informable, conteo único de estudios,
perfil histórico de informes, revisitas, seguridad, aislamiento por cuenta,
conflictos y funcionamiento sin conexión en teléfonos reales.

## Límites

Es una beta web, no un APK. No incluye biometría, notificaciones nativas en segundo
plano ni fusión automática multidispositivo. La lectura usa referencias, no copia
texto bíblico. JW Library enlaza a la página oficial. Los horarios usan la zona
del navegador. No se puede recuperar la contraseña. El modo demo no guarda datos.
Las dependencias y los componentes derivados conservan sus propias licencias.

## Automatización preparada

`.github/workflows/verify.yml` ejecuta las pruebas, compila y conserva un artefacto
al subir cambios a `main` o abrir una propuesta. Se activará cuando estos archivos
estén en un repositorio GitHub con Actions habilitado. No publica automáticamente
el sitio ni necesita secretos de producción. Incluye una plantilla de errores e
instrucciones de contribución y seguridad.
