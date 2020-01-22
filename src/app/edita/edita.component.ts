import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrincipalService } from '../principal/principal.service';
import { ModelPrincipal } from '../principal/model-principal';

@Component({
  selector: 'app-edita',
  templateUrl: './edita.component.html',
  styleUrls: ['./edita.component.css'],
  providers: [ModelPrincipal]
})
export class EditaComponent implements OnInit {
	public dataModel: ModelPrincipal[];

	id: any;

  constructor(public principalService: PrincipalService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
  	this.route.params.subscribe(params =>{
  		this.id = params['id'];
  		this.principalService.lerFiltro(this.id).subscribe(
  			response=>{
  				this.dataModel = response;
  			});
  		});
  }

  editar(){
  	this.principalService.editar(this.id);

  	setTimeout(() => {
  		this.router.navigate(['Principal']);
  	}, 3000);
  }

}
