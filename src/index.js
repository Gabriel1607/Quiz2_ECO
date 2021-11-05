
import{initializeApp} from "firebase/app";
import{getDatabase, ref, set, onValue, push} from "firebase/database";

import {getFirebaseConfig} from "./firebase-config";
import{studCard} from "./studcard";

//Inicializar el firebase
const firebaseAppConfig = getFirebaseConfig();
const firebaseApp = initializeApp(firebaseAppConfig);



//Metodo registrar Estudiantes
function studRegister (student){
    //Obtener base de datos
    const db = getDatabase();
    const newPostRef = push(ref(db, 'Students'));
    //Inyectar el id
    student["id"] = newPostRef.key
    set(newPostRef, student);
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
        studList.innerHTML = "";
        //For each 
        Object.keys(info).forEach((k,index)=>{
            console.log(k, index);
            //Crear objeto de la clase postCard
            const card = new studCard(info[k]);

            studList.appendChild(card.render());
        });
            
    }else{
            studList.innerHTML = "No hay estudiantes registrados";
    }
    
}


//Instancias de los objetos
const nombre = document.getElementById("nombre");
const codigo = document.getElementById("codigo");
const curso = document.getElementById("curso");
const matriBtn = document.getElementById("MatriBtn");
const studList = document.getElementById("studList");


//Metodo llamado desde el botón para crear posts
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



