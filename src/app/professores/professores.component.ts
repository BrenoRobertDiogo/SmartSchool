import { Component, OnInit } from '@angular/core';
import { Professor } from '../models/professor';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  public titulo: string = 'Professores';
  public professorSelecionado!: Professor | undefined

  public professores: Array<any> = [
    { id: 1,nome: "Lauro",     disciplina: "Matemática"  },
    { id: 2,nome: "Roberto",   disciplina: "Física"      },
    { id: 3,nome: "Ronaldo",   disciplina: "Português"   },
    { id: 4,nome: "Rodrigo",   disciplina: "Inglês"      },
    { id: 5,nome: "Alexandre", disciplina: "Programação" },
  ]

  constructor() { }

  ngOnInit() {
  }
  
  public voltar(): void{
    this.professorSelecionado = undefined
  }

  public professorSelected(professor: Professor): void{
    this.professorSelecionado = professor
  }

}
