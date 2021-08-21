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
        {
            nombre: 'TB_formulario_index',
            opcione : {
                keyPath : 'token'
            }
        },
        {
            nombre: 'TB_formulario_tabla',
        }
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


