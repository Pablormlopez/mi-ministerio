import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Mi Ministerio · Tu organización personal',description:'Planifica, registra y da seguimiento a tu actividad de predicación.',manifest:'/manifest.webmanifest',icons:{icon:'/favicon.svg',apple:'/icon-192.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>;}
