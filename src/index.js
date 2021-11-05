
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue, push,get} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";
import{studCard} from "./studcard";

//Inicializar el firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);



//Metodo registrar Estudiantes
function studRegister (student){
    //Obtener base de datos
    const db = getDatabase();
    const newStudRef = push(ref(db, 'Students'));
   const dbRef = ref(db,'Students');
get(dbRef).then((snapshot) => {
    const data = snapshot.val();
    if(data){
        evalCourse(newStudRef,data,student);
        return;
    }else{
        console.log('se registra en studreg');
        student["id"] = newStudRef.key
        set(newStudRef, student);
    }
    

  

});
}
function evalCourse(ref,stData,stud){
Object.keys(stData).forEach((key, index)=>{
   // console.log(stud.curso);
    //console.log(stData[key].curso);
    if(stData[key].curso===stud.curso){
        console.log('cursosiwales');
        if(stData[key].codigo===stud.codigo){
            console.log('codigosiwales');
            dup = true;
            alert("El estudiante ya se encuentra registrado en esta clase");
            return;
        }
    } 
});
if(!dup){
    console.log('se registra en evalcourse');
    stud["id"] = ref.key
    set(ref, stud);
}else{
    dup = false;
}
}

//Metodo para obtener la lista de estudiantes
function getStudents(){
    const db = getDatabase();
    const dbRef = ref(db, 'Students');

    //Obtener la lista de datos cuando haya un cambio de valor
    onValue(dbRef, (snapshot)=>{
        const studData = snapshot.val();
        currentList(studData);
    });
}

function currentList(info){
    if(info){
        studList1.innerHTML = "";
        studList2.innerHTML = "";
        studList3.innerHTML = "";
        //For each 
        Object.keys(info).forEach((k,index)=>{
            //Crear objeto de la clase studCard
            const card = new studCard(info[k]);
            if(info[k].participaciones<=5){
                studList1.appendChild(card.render());
            }else if(info[k].participaciones>5 && info[k].participaciones<=10){
                studList2.appendChild(card.render());
            }else if(info[k].participaciones>10){
                studList3.appendChild(card.render());
            }
        });
            
    }else{
            studList1.innerHTML = "No hay estudiantes registrados";
            studList2.innerHTML = "No hay estudiantes registrados";
            studList3.innerHTML = "No hay estudiantes registrados";
    }
    
}


//Instancias de los objetos
const nombre = document.getElementById("nombre");
const codigo = document.getElementById("codigo");
const curso = document.getElementById("curso");
const matriBtn = document.getElementById("MatriBtn");
const studList1 = document.getElementById("studList1");
const studList2 = document.getElementById("studList2");
const studList3 = document.getElementById("studList3");
var dup = false;

//Metodo llamado desde el botón para crear Students
const eventStud = (e, event) =>{
    if(nombre.value!=""&&codigo.value!=""&&curso.value!=""){
    const stud = {
        nombre: nombre.value,
        codigo: codigo.value,
        curso: curso.value,
        participaciones: 0
    }
    studRegister(stud);
    curso.value = '';
    codigo.value = '';
    nombre.value = '';
}else{
    alert("Por favor introduce la información completa del estudiante");
}
}


//Clicks
matriBtn.addEventListener('click', eventStud);
getStudents();



