import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IPersonDto } from '../interfaces/IPersonDto';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent {
  person!: IPersonDto;
  idReceived!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.idReceived = Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    this.person = {
      id: this.idReceived ?? 0,
      name: '',
      lastName: '',
      cpf: '',
      email: '',
      address: ''
    }
  }

  save() {

    if (this.validateInformation()) {
      console.log(`Objeto para salvar: ${JSON.stringify(this.person)}`);

      if (this.person.id == 0) {

        this.http.post('https://localhost:7153/api/People/Create', this.person)
          .subscribe((data) => {
            this.router.navigate(['list']);
          });
      } else {
        console.log('Erro na validação');
        // TRATAMENTO DE ERRO
        // ALERTA
        // BORDA VERMELHA
      }
    }
  }

  validateInformation(): boolean {
    if (this.person.name == '') {
      return false;
    }

    // VALIDAR COM REGEX

    return true;
  }

  close() {
    this.router.navigate([`list`]);
  }
}
