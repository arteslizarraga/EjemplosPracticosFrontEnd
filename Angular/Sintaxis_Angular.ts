// Habilitar/Deshabilitar botón

public habilitadoCrearAsignatura: boolean = true;

<button (click)="abrirModalCrearAsignatura()" 
[disabled]="!habilitadoCrearAsignatura"
[ngClass]="habilitadoCrearAsignatura ? 'btn btn-default waves-effect waves-light' : 'btn'">
	<span>Crear Asignatura</span>
</button>
							
//=================================================================================================================>>>>>>							
// Varias condiciones con [ngClass]

<ng-container *ngFor="let x of lista">

	<span [ngClass]="{'danger-text': (x.estado == 'No Migrado'), 'success-text': (x.estado == 'Migrado')}">
		{{x.estado}}
	</span>

</ng-container>
												
//=================================================================================================================>>>>>>
	
public botonVolver = {
	texto: "Volver a Editar Asignatura",
	click: () => this.returnPrincipal()
};

<button (click)="botonVolver.click()" class="btn btn-outline waves-effect waves-light">
	{{botonVolver.texto}}
</button>

//=================================================================================================================>>>>>>
// Loops
/*
<ng-container *ngFor="let numero of [0,1,2,3,4,5,6]">
  <p>
    {{numero}} <ng-container *ngIf="numero != 0 && numero % 2 == 0"> (Es un número par) </ng-container>
  </p>
</ng-container>


// Variables en el html

<ng-container *ngIf="{ nombre: 'jose', ciudad: 'Santiago', edad: 33} as variable">
  <p>{{variable.nombre}}</p>
  <p>{{variable.ciudad}}</p>
  <p>{{variable.edad}}</p>
</ng-container>
*/
//=================================================================================================================>>>>>>
// Switch case para el manejo de condiciones en la Vista
/*
<div [ngSwitch]="objeto.etapa">

	<div *ngSwitchCase="'Observado'">
		Solicitud de Curso con Observaciones
	</div>
	<ng-container *ngSwitchDefault>

		<div [ngSwitch]="objeto.estado">
			<div *ngSwitchCase="'Pendiente'"> Solicitud de Curso Pendiente de Aprobación </div>
			<div *ngSwitchCase="'Rechazado'"> Solicitud de Curso Rechazada </div>
			<div *ngSwitchCase="'Aprobado'"> Solicitud de Curso Aprobada </div>
		</div>

	</ng-container>
	
</div>
*/
//=================================================================================================================>>>>>>
// Llamadas por post

getDetalle() : Observable <ReporteAdministrativo>   // Con FormData
{
  const formData = new FormData();
  formData.append('param1', 12);
  formData.append('param2', 13);
  return this.http.post<ReporteAdministrativo>(`${this.urlBackend}/ReporteAdministrativo/GetDetalle`, formData);
}

getCboProgramaEstudios()   // Con x-www-form-urlencoded
{
  let httpOptionsForm = { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') };
  return this.http.post<any>(`${this.urlBackend}/combobox/getCboProgramaEstudios`, `param1=aaaa&param2=bbbb`, httpOptionsForm);
}

//=================================================================================================================>>>>>>
// Promesas

async ngAfterViewInit()
{
  let validarNumero = (cadena: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
      if (/^-?\d+$/.test(cadena)) {
        setTimeout(() => {
          resolve({ valido: true, numero: parseInt(cadena) });
        }, 2000);
      }
      else {
        reject({ valido: false, numero: 0, mensaje: `El parámetro ${cadena} no es un número` });
      }
    });
  };

  await validarNumero("12")
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error.mensaje);
    });

  console.log("Esto se ejecuta después de la promesa");
}

//=====================================>>>>>

getPeriodo() : Promise<RespuestaBackend<number>>
{
  return new Promise((resolve) => 
  {
	  this.http.post<RespuestaBackend<number>>(`${this.urlBackend}/Formulario/GetPeriodo`, null).subscribe(
		res => resolve(res)
	  );
  });
}

ngAfterViewInit()
{
	let res = await this.service.getPeriodo();
    
	if (res.status != 200)
	  return this.excepciones.mostrarErroresRespuestaBackend(res);

	alert(res.objeto);
}

//=================================================================================================================>>>>>>
// Async

export class CrearDescriptorCursoComponent implements OnInit {
  public perfilesDocentes$: Observable<PerfilDocente[]>;

  ngOnInit(): void {
    this.perfilesDocentes$ = this.probando();
  }

  probando(): Observable<PerfilDocente[]> {
    return new Observable(observer => {
      return this.service.getDetalleEditar("CF22413").subscribe(res => {
        observer.next(res.objeto.descriptor.perfilesDocentes);
        observer.complete();
      });
    });

    // return of([ {codigo: "111"},{codigo: "222"} ]);
  }

  llamarAlBackend(codigo: string) {
    this.service.getDetalleEditar(codigo).subscribe(
      (res) => {
        if (res.status == 200) {
          this.perfilesDocentes$ = new Observable(observer => {
            observer.next(res.objeto.descriptor.perfilesDocentes);
            observer.complete();
          });
        }
      },
      (error) => { alert("Se encontró un error") }
    );
  }
}

//==================================>>>>>
/*
<table class="table table-bordered table-striped">
    <thead >
        <tr>
            <th>Codigo</th>
        </tr>
    </thead>
    <tbody>
        <ng-container *ngFor="let perfil of perfilesDocentes$ | async">
            <tr>
                <td>{{perfil.codigo}}</td>
            </tr>
        </ng-container>
    </tbody>
</table>
*/

//=================================================================================================================>>>>>>
