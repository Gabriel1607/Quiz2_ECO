//Clase que representa una tarjeta

import { getDatabase, ref, push } from 'firebase/database';

export class studCard {

    constructor(stud){
        this.stud = stud;   //Variables globales siempre con this
    }

    //metodo para que me devuelva HTML y generar tarjeta
    render(){
        let card = document.createElement("div");
        card.className = "stud-card";
        
        let curso = document.createElement("p");
        curso.className = "student-course"
        curso.innerHTML = this.stud.curso;

        let nombre = document.createElement("p");
        nombre.className = "student-name"
        nombre.innerHTML = this.stud.nombre;

        let codigo = document.createElement("p");
        codigo.className = "student-code";
        codigo.innerHTML = this.stud.codigo;

        let partic = document.createElement("p");
        partic.className = "student-particip";
        partic.innerHTML = this.stud.participaciones;
        
        let partiBtn = document.createElement("button");
        partiBtn.className = "part-button";
        partiBtn.innerHTML = "+";

        let elimBtn = document.createElement("button");
        elimBtn.className = "elim-button";
        elimBtn.innerHTML = "x";
        
       
        card.appendChild(curso);
        card.appendChild(nombre);
        card.appendChild(codigo);
        card.appendChild(partic);
        card.appendChild(partiBtn);
        card.appendChild(elimBtn);
        return card;
    }
}
