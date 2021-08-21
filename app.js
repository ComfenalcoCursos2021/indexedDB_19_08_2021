

addEventListener("DOMContentLoaded", (e)=>{
    let buscarData = {
        informacion : {
            // token: "GEFS-ASDF-WFTA-83",
        },
        configuracion:{
            tabla: 'TB_formulario_index',
            opcion: 'readonly'
        }  
    }
    setTimeout(() => {
        let fragmen = new DocumentFragment();
        let datos = buscarDatosPaquetes(buscarData);
        
        console.log({...datos});
    }, 1000);
    const form = document.querySelector("#myForm");
    form.addEventListener("submit", (e)=>{
        const data = Array.from(form);
        data.pop(); 
        data.map((input, indice)=>{
            data[indice] = {
                id:input.id,
                value: input.value

            };
        })
        let guardarData = {
            informacion : {
                token: `GEFS-ASDF-WFTA-${Math.trunc(Math.random()*100)}`,
                formularios: data,
            },
            configuracion:{
                tabla: 'TB_formulario_index',
                opcion: 'readwrite'
            }   
        }
        console.log(guardarData);
        guardarDatosPaquetes(guardarData);
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

