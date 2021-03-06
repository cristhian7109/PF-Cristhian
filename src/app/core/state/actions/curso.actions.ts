import {createAction, props} from "@ngrx/store";
import { Curso } from 'src/app/core/interfaces/cursos';

export const cargarCursos = createAction(
  '[Lista Cursos] Cargar Cursos'
);

export const cursosCargados = createAction(
  '[Lista Cursos] Cursos Cargados',
  props<{ cursos: Curso[] }>()
);
