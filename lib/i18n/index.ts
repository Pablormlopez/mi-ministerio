import es from './es.json';
export type Locale='es';
const catalogues:Record<Locale,Record<string,string>>={es};
export function t(key:keyof typeof es,locale:Locale='es'){return catalogues[locale][key]||catalogues.es[key];}
