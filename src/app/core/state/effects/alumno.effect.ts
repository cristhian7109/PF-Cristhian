import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';

import * as AlumnosActions from '../actions/alumno.actions';


@Injectable()
export class AlumnosEffects {


  cargarAlumnos$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(AlumnosActions.cargarAlumnos),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() => EMPTY as Observable<{ type: string }>)
    );
  });


  constructor(private actions$: Actions) {}

}
