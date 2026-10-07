export const books:Record<string,number>={'Génesis':50,'Éxodo':40,'Levítico':27,'Números':36,'Deuteronomio':34,'Josué':24,'Jueces':21,'Rut':4,'1 Samuel':31,'2 Samuel':24,'1 Reyes':22,'2 Reyes':25,'1 Crónicas':29,'2 Crónicas':36,'Esdras':10,'Nehemías':13,'Ester':10,'Job':42,'Salmos':150,'Proverbios':31,'Eclesiastés':12,'El Cantar de los Cantares':8,'Isaías':66,'Jeremías':52,'Lamentaciones':5,'Ezequiel':48,'Daniel':12,'Oseas':14,'Joel':3,'Amós':9,'Abdías':1,'Jonás':4,'Miqueas':7,'Nahúm':3,'Habacuc':3,'Sofonías':3,'Ageo':2,'Zacarías':14,'Malaquías':4,'Mateo':28,'Marcos':16,'Lucas':24,'Juan':21,'Hechos':28,'Romanos':16,'1 Corintios':16,'2 Corintios':13,'Gálatas':6,'Efesios':6,'Filipenses':4,'Colosenses':4,'1 Tesalonicenses':5,'2 Tesalonicenses':3,'1 Timoteo':6,'2 Timoteo':4,'Tito':3,'Filemón':1,'Hebreos':13,'Santiago':5,'1 Pedro':5,'2 Pedro':3,'1 Juan':5,'2 Juan':1,'3 Juan':1,'Judas':1,'Apocalipsis':22};
export function readingEnd(book:string,chapter:number,daily:number){return Math.min(books[book]||150,Number(chapter)+Number(daily)-1);}
export function nextReading(book:string,chapter:number,daily:number){const end=readingEnd(book,chapter,daily);const names=Object.keys(books);return end>=(books[book]||150)?{book:names[(names.indexOf(book)+1)%names.length],chapter:1}:{book,chapter:end+1};}


/** Enlaces al capítulo actual; JW Library debe estar instalado en el dispositivo. */
export function bibleLinks(book: string, chapter: number) {
  const names = Object.keys(books);
  const index = names.indexOf(book);
  const bookNumber = index < 0 ? 1 : index + 1;
  const limit = books[names[bookNumber - 1]];
  const numericChapter = Number(chapter);
  const safeChapter = Number.isFinite(numericChapter)
    ? Math.max(1, Math.min(limit, Math.trunc(numericChapter))) : 1;
  const verse = String(bookNumber).padStart(2, '0')
    + String(safeChapter).padStart(3, '0') + '001';
  return {
    app: `jwlibrary:///finder?wtlocale=S&bible=${verse}`,
    web: `https://wol.jw.org/es/wol/b/r4/lp-s/nwtsty/${bookNumber}/${safeChapter}`,
  };
}
