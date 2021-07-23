import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Professor } from '../models/Professor';
import { ProfessorService } from './professor.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  public titulo: string = 'Professores';
  public professorSelecionado!: Professor | undefined
  public modalRef!: BsModalRef;
  public professorForm!: FormGroup;

  public professores!: Array<Professor>;

  public modo = 'post';

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(
    private modalService: BsModalService,
    private professorService: ProfessorService,
    private fb: FormBuilder,
  ) {
    this.criarForm();
  }

  professorSelected(professor: Professor) {
    this.professorSelecionado = professor
    this.professorForm.patchValue(professor)
  }

  ngOnInit() {
    this.carregarProfessor();
  }

  criarForm() {
    this.professorForm = this.fb.group({
      id: [''],
      nome: [this.professorSelecionado?.nome, Validators.required],


    })
  }

  professorSubmit() {

    this.salvarProfessor(this.professorForm.value)
  }

  professorNovo() {
    this.professorSelecionado = new Professor()
    this.professorForm.patchValue(this.professorSelecionado)
  }

  carregarProfessor() {
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores
      },
      (error: any) => {
        console.log(error);

      }
    )
  }

  public salvarProfessor(professor: Professor) {
    this.modo = professor.id === 0 ? 'post' : 'put';
    this.professorService[professor.id === 0 ? 'post' : 'put'](professor).subscribe(
      (retorno: Professor): void => {
        console.log(retorno);
        this.carregarProfessor();


      },
      (error: any): void => {
        console.log(error);

      }
    );
  }

  public voltar(): void {
    this.professorSelecionado = undefined
  }

  public deletar(id: number) {
    this.professorService.delete(id).subscribe(
      (result: any) => {
        console.log(result);
        
        this.carregarProfessor()
      },
      (error: any) => {console.log(error)}
    )
  }

}
