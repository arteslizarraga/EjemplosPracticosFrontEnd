
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
// Llamadas por post

getDetalle() : Observable < ReporteAdministrativo >   // Con FormData
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

getPeriodo() : Promise<number>
{
    return new Promise((resolve, reject) => 
    {
        this.http.post<RespuestaBackend<number>>(`${this.urlBackend}/Formulario/GetPeriodo`, null).subscribe(
          (res) => 
          {
            if (res.status == 200)
              resolve(res.objeto);
          },
          (error) => reject(0)
        );
    });
}

ngAfterViewInit()
{
  getPeriodo()
  .then(periodo => 
  {
    console.log(periodo);
  })
  .catch(error => { console.log("Se encontró un error al obtener el período") })
  .finally(() => console.log("Fin proceso")); 
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
