

addEventListener("DOMContentLoaded", (e)=>{
    let botones = [3];
    // Buscar Datos
    
    const fragmen = ((arg)=>{
        let f = new DocumentFragment();
        return ({...arg})=>{
            if(arg.tb){
                let tr = document.createElement('TR');
                switch (arg.tb) {
                    case 'TB_formulario_index':
                        let tb = document.createElement('TD');
                        tb.append(arg.data.token);
                        tr.appendChild(tb);
                        for (let data of arg.data.formularios) {
                            tb = document.createElement('TD');
                            tb.append(data.value);
                            tr.appendChild(tb);
                        }
                        f.appendChild(tr);
                        break;
                
                    default:
                        break;
                }
                
            }else{
                let data = f;
                f = new DocumentFragment();
                return data;
            }
            
        }
    })();
    setTimeout(() => {
        let buscarData = {
            informacion : {},
            configuracion:{
                tabla: 'TB_formulario_index',
                opcion: 'readonly'
            }  
        }
        buscarDatosPaquetes(buscarData);
    }, 1000);
    addEventListener("message", (e)=>{
        if(e.data){
            fragmen(e.data);
        }else{
            let id = document.querySelector("#tb_index");
            id.innerHTML = "";
            id.appendChild(fragmen({}));           
        }
    })


    
    const form = document.querySelector("#myForm");
    
    
    const guardar = document.querySelector("#guardar");
    const buscar = document.querySelector("#buscar");
    //Guardar Datos
    guardar.addEventListener("click", (e)=>{
        const data = Array.from(form);
        data.splice(...botones);
        data.map((input, indice)=>{
            data[indice] = {
                id:input.id,
                value: input.value

            };
        })
        let guardarData = {
            informacion : {
                token: `GEFS-ASDF-WFTA-${Math.trunc(Math.random()*1000)}`,
                formularios: data,
            },
            configuracion:{
                tabla: 'TB_formulario_index',
                opcion: 'readwrite'
            }   
        }
        let buscarData = {
            informacion : {},
            configuracion:{
                tabla: 'TB_formulario_index',
                opcion: 'readonly'
            }  
        }
        console.log(guardarData);
        guardarDatosPaquetes(guardarData);
        buscarDatosPaquetes(buscarData);
        e.preventDefault();
    })
    //Buscar Datos
    buscar.addEventListener("click", (e)=>{
        const data = Array.from(form);
        data.splice(...botones);
        let buscarData = {
            informacion : {
                token: document.querySelector("#inputToken").value,
            },
            configuracion:{
                tabla: 'TB_formulario_index',
                opcion: 'readonly'
            }  
        }
        buscarDatosPaquetes(buscarData);
        e.preventDefault();
    })
    //Listar Datos
    listar.addEventListener("click", (e)=>{
        let buscarData = {
            informacion : {},
            configuracion:{
                tabla: 'TB_formulario_index',
                opcion: 'readonly'
            }  
        }
        buscarDatosPaquetes(buscarData);
        e.preventDefault();
    })
})




// let guardarData = {
//     informacion : {
//         token: `GEFS-ASDF-WFTA-${Math.trunc(Math.random()*100)}`,
//         cursos: ["Diplomado Nivel 1 Javascript",
//         "Diplomado Nivel 2 Javascript"]
//     },
//     configuracion:{
//         tabla: 'TB_informacion_index',
//         opcion: 'readwrite'
//     }   
// }
// let buscarData = {
//     informacion : {
//         token: "GEFS-ASDF-WFTA-83",
//     },
//     configuracion:{
//         tabla: 'TB_informacion_index',
//         opcion: 'readonly'
//     }  
// }
// setTimeout(() => {
//     guardarDatosPaquetes(guardarData);
//     console.log(buscarDatosPaquetes(buscarData));
// }, 1000);

