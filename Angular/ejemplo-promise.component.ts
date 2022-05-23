import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class ObjetoApi {
  public results : any;
}

export class Ejemplar{
  public name : string;
}

@Component({
  selector: 'app-ejemplo-promise',
  templateUrl: './ejemplo-promise.component.html',
  styleUrls: ['./ejemplo-promise.component.css']
})
export class EjemploPromiseComponent implements OnInit {

  constructor(private http: HttpClient) { 

  }

  ngOnInit() : void { }

  async ngAfterViewInit()
  {
    let imprimirGeneraciones: boolean = await this.imprimirGeneraciones();

    if (!imprimirGeneraciones) 
      return alert("Error al cargar las generaciones");
    
    try {
      let razas: ObjetoApi = await this.obtenerRazas();
      console.log("razas", razas.results);
    } 
    catch (error) {
      console.log(error);
    }

    this.obtenerEjemplar().then(ejemplar => {
      console.log("Nombre", ejemplar.name);
    })
    .catch(error => console.log("Se encontró un error al obtener el ejemplar"));
  }
  
  async obtenerEjemplar() : Promise<Ejemplar>
  {
    return await this.http.get<Ejemplar>(`https://pokeapi.co/api/v2/pokemon/bulbasaur/`).toPromise();
  }

  async obtenerRazas() : Promise<ObjetoApi>
  {
    try 
    {
      let res: ObjetoApi = await this.http.get<ObjetoApi>(`https://pokeapi.co/api/v2/pokemon/?limit=5`).toPromise();
      return res;
    } 
    catch (error) {
      throw "Se encontró un error al obtener las razas";
    }
  }

  async imprimirGeneraciones() : Promise<boolean>  
  {
    try 
    {
      let res: ObjetoApi = await this.obtenerGeneraciones();
 
      if (res.results != null) 
      {
        console.log("Generaciones", res.results);
        return true;
      }
      else 
        return false;
    } 
    catch (error) {
      return false;
    }
  }

  obtenerGeneraciones() : Promise<ObjetoApi> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/generation/`).toPromise();
  }

}
