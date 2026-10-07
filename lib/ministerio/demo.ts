import {initial,record,today,State} from './model';
export function demoState():State{
 const state=initial();const day=today();
 state.profile={...state.profile,name:'Visitante de prueba',preferred:'visitante',role:'Precursor regular',hours:50,studies:5,visits:15};
 state.appointments=[record({role:'Precursor regular',date:day.slice(0,7)+'-01'})];
 const person=record({name:'Persona de ejemplo',status:'Estudio bíblico',address:'Dirección ficticia para revisión',notes:'Datos ficticios. Puedes editar esta ficha para probar la app.',first:day});
 state.people=[person];
 state.activities=[record({date:day,time:'09:00',kind:'Casa en casa',minutes:90,reportable:true,notes:'Actividad de demostración'}),record({date:day,time:'11:00',kind:'Estudio bíblico',person:person.id,minutes:30,reportable:true,notes:'Estudio ficticio para revisar el informe'})];
 state.events=[record({title:'Visita de ejemplo',date:day+'T16:00',kind:'Revisita',repeat:'Una vez',done:false,person:person.id})];
 return state;
}
