import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/Professor';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  public titulo: string = 'Professores';
  public professorSelecionado!: Professor | undefined
  public modalRef!: BsModalRef;

  public professores: Array<any> = [
    { id: 1,nome: "Lauro",     disciplina: "Matemática"  },
    { id: 2,nome: "Roberto",   disciplina: "Física"      },
    { id: 3,nome: "Ronaldo",   disciplina: "Português"   },
    { id: 4,nome: "Rodrigo",   disciplina: "Inglês"      },
    { id: 5,nome: "Alexandre", disciplina: "Programação" },
  ]

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
 }

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }
  
  public voltar(): void{
    this.professorSelecionado = undefined
  }

  public professorSelected(professor: Professor): void{
    this.professorSelecionado = professor
  }

}
