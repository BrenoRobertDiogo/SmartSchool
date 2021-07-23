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
  public modo: string = 'post';


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

  criarForm() {
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]

    })
  }

  alunoSubmit() {
    this.salvarAluno(this.alunoForm.value)

  }

  public salvarAluno(aluno: Aluno) {
    this.modo = aluno.id===0 ? 'post' : 'put';
    this.alunoService[aluno.id===0 ? 'post' : 'put'](aluno).subscribe(
      (retorno: Aluno): void => {
        console.log(retorno);
        this.carregarAlunos();


      },
      (error: any): void => {
        console.log(error);

      }
    );
  }

  alunoNovo() {
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

  public voltar() {
    this.alunoSelecionado = undefined
  }

}
