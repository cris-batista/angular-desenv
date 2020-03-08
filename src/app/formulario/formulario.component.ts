import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-formulario',
	templateUrl: './formulario.component.html',
	styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

	infosForm: FormGroup;
	submitted = false;
	public naoAutorizado: boolean;
	codigo: any = [
		{monitor: 'teste 1'},
		{monitor: 'teste 2'}
	];

	constructor(private formBuilder: FormBuilder, public router: Router) { }

	ngOnInit() {
		this.infosForm = this.formBuilder.group({
			password: ['', [Validators.required]],
			codigoName: ['', [Validators.required]]
		});
	}

	get f(){
		return this.infosForm.controls;
	}

	changeCodigo(e: any){
		console.log(e.target.value)
		this.codigoName.setValue(e.target.value, {
			onlySelf: true
		})
	}

	get codigoName(){
		return this.infosForm.get('codigoName');
	}

	onSubmit(){
		this.submitted = true;

		if(this.infosForm.invalid){
			return
		}

		if(this.infosForm.value.password === 'teste'){
			this.naoAutorizado = false;

			setTimeout(() => {
				this.router.navigate(['Principal']);
			}, 10);

		}else{
			this.naoAutorizado = true;
		}

			
	}

}
