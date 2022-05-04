import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/core/interfaces/cursos';
import { CursoService } from 'src/app/core/services/cursos.service';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {
  @ViewChild(MatTable) myTable!: MatTable<any>;
  listCurso!: Observable<Curso[]>
  cursoSubscription!: Subscription;
  displayedColumns: string[] = ['id','nombre', 'descripcion', 'duracion','acciones'];
  modalAddEdit: string = "closed"
  modalEliminar: string = "closed"
  typemodal: string = ""
  seleccionado: Curso = {
    id:0, nombre: "", descripcion: "", duracion:0
  }

  constructor(private _cursoService: CursoService) { }

  ngOnInit(): void {
    this.cargarCursos()
  }

  openModal(tipo:string,data:any) {
    if( tipo==="edit" ){
      this.seleccionado = data
    }else{
      this.seleccionado = {id:0, nombre: "", descripcion: "", duracion:0}
    }
    this.typemodal=tipo
    this.modalAddEdit= 'open'
  } 
  closeModal() {
    this.modalAddEdit= 'closed'
    this.cargarCursos()
  } 
  openModalEliminar(id:number) {
    this.seleccionado = {...this.seleccionado,id:id}
    this.modalEliminar= 'open'
  } 
  closeModalEliminar() {
    this.modalEliminar= 'closed'
    this.cargarCursos()
  } 
  cargarCursos(){
    this.listCurso = this._cursoService.getCurso();
    this.cursoSubscription = this._cursoService.cursoSubject.subscribe(
      () => {
        this.listCurso = this._cursoService.getCurso();
      }
    );
    
  }
  ngOnDestroy(): void {
    this.cursoSubscription.unsubscribe();
  }
}
