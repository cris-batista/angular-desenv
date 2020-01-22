import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrincipalService } from './principal.service';
import { ModelPrincipal } from './model-principal';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  providers: [ModelPrincipal]
})
export class PrincipalComponent implements OnInit {
  @ViewChild('nameTitulo',{static:false}) nameTitulo: ElementRef;
  @ViewChild('nameDescricao',{static:false}) nameDescricao: ElementRef;
  
  public dataModel: ModelPrincipal[];
  private idClicked: string;
  public campoObrig: boolean;

  constructor(private principalService:PrincipalService, public route: ActivatedRoute) { }

  ngOnInit() {
  	this.getInfos();
  }

  getInfos(){
  	this.principalService.ler().subscribe(
  		response=>{
  			this.dataModel = response;
  		});
  }

  enviar(){
  	const valueTitulo = this.nameTitulo.nativeElement.value;
  	const valueDescricao = this.nameDescricao.nativeElement.value;

  	if(valueTitulo === '' || valueDescricao === ''){
  		this.campoObrig = true;
  	}else{
  		this.principalService.salvar();
  		this.campoObrig = false;
  	}

  	setTimeout(() =>{
  		this.getInfos();
  		this.nameTitulo.nativeElement.value = '';
  		this.nameDescricao.nativeElement.value = '';
  	}, 2000);
  }

  excluir(event:any){
  	this.idClicked = event.target.id;
  	this.principalService.deletar(this.idClicked);

  	setTimeout(() =>{
  		this.getInfos();
  	}, 2000);
  }

}
