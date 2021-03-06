
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
const buscarDatosPaquetes = ({...arg})=>{
    const dbBuscar = db.result;
    const dbTran = dbBuscar.transaction(...Object.values(arg.configuracion));
    const dbStora = dbTran.objectStore(arg.configuracion.tabla);
    let data = [];
    const cursor = dbStora.openCursor(
                    (arg.informacion.token) 
                        ? arg.informacion.token
                        : undefined);
    // let cursor;
    // if(arg.informacion.token){
    //     cursor = dbStora.openCursor(arg.informacion.token);
    // }else{
    //     cursor = dbStora.openCursor();
    // }

    cursor.addEventListener('success', (e)=>{
        const dbCursor = e.target.result;
        if(dbCursor){
            postMessage({data: dbCursor.value, tb:arg.configuracion.tabla});
            dbCursor.continue();
        }else{
            postMessage(false);
        }
    })
    
}
const AcualizarDatosPaquetes = ({...arg})=>{
    const dbActualizar = db.result;
    const dbTran = dbActualizar.transaction(...Object.values(arg.configuracion));
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
            dbStora.put(arg.informacion),
            dbTran.addEventListener('complete', (e)=>{
                console.warn("Datos Actualizados", e);
            })
        )
        :(console.log(respuesta));
    
    
}
const EliminarDatosPaquetes = ({...arg})=>{
    const dbEliminar = db.result;
    const dbTran = dbEliminar.transaction(...Object.values(arg.configuracion));
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
            dbStora.delete(...Object.values(respuesta)),
            dbTran.addEventListener('complete', (e)=>{
                console.warn("Datos Eliminados", e);
            })
        )
        :(console.log(respuesta));
    
    
}