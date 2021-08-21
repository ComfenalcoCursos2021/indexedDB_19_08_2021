// import {DB} from './DB/main.js';

const DBrequest = window.indexedDB;

const db = DBrequest.open("DB_Usuarios",4);

const CrearPaquete = ({...arg}) =>{
    let dbPaquetes = db.result;
    for(let [id, value] of Object.entries(arg)){
        dbPaquetes.createObjectStore(
                ...value.opcione
                    ? [value.nombre,value.opcione]
                    : [value.nombre,{autoIncrement: true}]
                );
        // if(value.opcione){
        //     dbPaquetes.createObjectStore(value.nombre,value.opcione);
        // }else{
        //     dbPaquetes.createObjectStore(value.nombre,{
        //         autoIncrement: true
        //     });
        // }
        console.log(`Paquete ${value.nombre} Creado exitosamente`);
    }

}
db.addEventListener('upgradeneeded', ()=>{
    console.log(`Creando la base de datos Nombre: ${db.result.name} Version: ${db.result.version}`);
    let paquetes  = [
        {nombre: 'TB_informacion_vivienda'},
        {nombre: 'TB_informacion_personal'},
        {nombre: 'TB_informacion_curso',
        opcione : {
            keyPath : 'token'
        }},
    ];
    // opcione : {
    //     keyPath : 'token'
    // }
    CrearPaquete(paquetes);
})

db.addEventListener('success', ()=>{
    console.log(`
    Ocurrio un alteracion
    Base de datos: ${db.result.name},
    Version: ${db.result.version}, 
    Cantidad de paquetes ${db.result.objectStoreNames.length}`
    ,db.result.objectStoreNames);

})

db.addEventListener('error', error=>{
    console.log(`Ocurrio un error ${error}`);
})


const guardarDatosPaquetes = ({...arg})=>{
    const dbGuardar = db.result;
    const dbTran = dbGuardar.transaction(...Object.values(arg.configuracion));
    const dbStora = dbTran.objectStore(arg.configuracion.tabla);
    // Validar si no se envia la keyPath si el paquete lo requiere
    const respuesta = (dbStora.keyPath)
    ?( 
        (arg.informacion[dbStora.keyPath])
            ? arg.informacion
            : `No estas enviando la keyPath del paquete ${arg.configuracion.tabla}`
    ): arg.informacion;
    // Ubicar la respuesta de la validacion y ejecutar la transaction
    // o el mensaje
    (respuesta instanceof Object)
        ?(
            dbStora.add(arg.informacion),
            dbTran.addEventListener('complete', (e)=>{
                console.warn("Datos Guardados", e);
            })
        )
        :(console.log(respuesta));
    
    // if(dbStora.keyPath){
    //     if(arg.informacion[dbStora.keyPath]){
    //         dbStora.add(arg.informacion);
    //         dbTran.addEventListener('complete', (e)=>{
    //             console.warn("Datos Guardados", e);
    //         })
    //     }else{
    //         console.log(`No estas enviando la keyPath del paquete ${arg.configuracion.tabla}`);
    //         return
    //     }
    // }else{
    //     dbStora.add(arg.informacion);
    //     dbTran.addEventListener('complete', (e)=>{
    //         console.warn("Datos Guardados", e);
    //     })
    // }
    
    
}

let data = {
    informacion : {
        token: "1452j87gf-miguel-5",
        cursos: ["Diplomado Nivel 1 Javascript",
        "Diplomado Nivel 2 Javascript"]
    },
    configuracion:{
        tabla: 'TB_informacion_personal',
        opcion: 'readwrite'
    }   
}


setTimeout(() => {
    guardarDatosPaquetes(data);
}, 1000);

