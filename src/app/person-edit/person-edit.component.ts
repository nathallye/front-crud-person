import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IPersonDto } from '../interfaces/IPersonDto';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent {
  person!: IPersonDto;
  idReceived!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.idReceived = Number(params.get('id'));
    });
  }

  ngOnInit(): void {
    if (this.idReceived) {
      this.http
        .get(`https://localhost:7153/api/People/GetOne/${this.idReceived}`)
        .subscribe((data) => {
          this.person = data as IPersonDto;
          
          this.person = {
            id: this.idReceived,
            name: this.person.name,
            lastName: this.person.lastName,
            cpf: this.person.cpf,
            email: this.person.email,
            address: this.person.address
          }
        });
    }
  }

  save() {

    if (this.validateInformation()) {
      console.log(`Objeto para salvar: ${JSON.stringify(this.person)}`);

      if (this.person.id != 0) {

        this.http.put(`https://localhost:7153/api/People/Update/${this.idReceived}`, this.person)
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
