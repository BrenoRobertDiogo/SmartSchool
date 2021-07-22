import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from '../models/Aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public alunoForm!: FormGroup;
  
  
  public titulo: string = '';
  public alunoSelecionado!: Aluno | undefined;
  public textSimple!: string | undefined;
  public modalRef!: BsModalRef;

  public alunos!: Array<Aluno>; 
  
  /* [
    { id: 1, nome: "Marta", sobrenome: "Kent",    telefone: 332255, }, // 1
    { id: 2, nome: "Paula", sobrenome: "Isabela", telefone: 332255, }, // 2
    { id: 3, nome: "Laura", sobrenome: "Antonia", telefone: 332255, }, // 3
    { id: 4, nome: "Luiza", sobrenome: "Maria",   telefone: 332255, }, // 4
    { id: 5, nome: "Lucas", sobrenome: "Machado", telefone: 332255, }, // 5
    { id: 6, nome: "Pedro", sobrenome: "Alvares", telefone: 332255, }, // 6
    { id: 7, nome: "Paulo", sobrenome: "José",    telefone: 332255, }  // 7
  ] */


   openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
   }

  constructor(
    private fb: FormBuilder, 
    private modalService: BsModalService,
    private alunoService: AlunoService) {
    this.criarForm()
  }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  carregarAlunos() {
    this.alunoService.getAll().subscribe(
      (aluno: Aluno[]) => { // sucesso
        this.alunos = aluno
      },
      (error: any) => { // erro
        console.log(error);
        
      }
    )
  }

  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno
    this.alunoForm.patchValue(aluno)
  }

  criarForm(){
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]

    })
  }

  alunoSubmit(){
    this.salvarAluno(this.alunoForm.value)
    
  }

  public salvarAluno(aluno: Aluno){
    this.alunoService.put(aluno.id, aluno).subscribe(
      (retorno: Aluno): void => {
        console.log(retorno);
        this.carregarAlunos();


      },
      (error: any): void => {
        console.log(error);
        
      }
    );
  }

  public voltar() {
    this.alunoSelecionado = undefined
  }

}
