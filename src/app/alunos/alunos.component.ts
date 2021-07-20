import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  
  public titulo: string = 'Alunos';
  public alunoSelecionado: string = '';

  public alunos: Array<any> = [
    { id: 1, nome: "Marta", sobrenome: "Kent",    telefone: 332255, }, // 1
    { id: 2, nome: "Paula", sobrenome: "Isabela", telefone: 332255, }, // 2
    { id: 3, nome: "Laura", sobrenome: "Antonia", telefone: 332255, }, // 3
    { id: 4, nome: "Luiza", sobrenome: "Maria",   telefone: 332255, }, // 4
    { id: 5, nome: "Lucas", sobrenome: "Machado", telefone: 332255, }, // 5
    { id: 6, nome: "Pedro", sobrenome: "Alvares", telefone: 332255, }, // 6
    { id: 7, nome: "Paulo", sobrenome: "José",    telefone: 332255, }  // 7
  ]

  alunoSelect(aluno: any) {
    this.alunoSelecionado = aluno.nome
  }

  constructor() { }

  ngOnInit(): void {
  }

  public voltar() {
    this.alunoSelecionado = ''
  }

}
