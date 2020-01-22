import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ModelPrincipal } from './model-principal';


@Injectable()
export class PrincipalService {
	form: any = {};
	formEdit: any = {};
	
	public mensagemSalvar: boolean;
	public mensagemExcluir: boolean;
	public mensagemEditar: boolean;

  constructor(private http: Http) {
  	this.form.titulo = '';
  	this.form.descricao = '';

  	this.formEdit.titulo = '';
  	this.formEdit.descricao = '';
  }

  ler(): Observable<ModelPrincipal[]>{
  	return this.http.get('http://localhost:3000/infos').pipe(map(res => <ModelPrincipal[]>res.json()));
  }

  lerFiltro(id): Observable<ModelPrincipal[]>{
  	return this.http.get('http://localhost:3000/infos/' + id).pipe(map(res => <ModelPrincipal[]>res.json()));
  }

  salvar(){
  	this.http.post('http://localhost:3000/infos',this.form).subscribe(
  		res =>{
  			this.mensagemSalvar = true;
  		},
  		err => {
  			console.error(err);
  		}
  	);
  }

  editar(id){
  	this.http.put('http://localhost:3000/infos/' + id, this.formEdit).subscribe(
  		res =>{
  			this.mensagemEditar = true;
  		},
  		err => {
  			console.error(err);
  		}
  	);
  }

  deletar(id){
  	this.http.delete('http://localhost:3000/infos/' + id).subscribe(
  		res =>{
  			this.mensagemExcluir = true;
  		},
  		err => {
  			console.error(err);
  		}
  	);
  }


}
