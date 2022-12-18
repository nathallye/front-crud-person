import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPersonDto } from '../interfaces/IPersonDto';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.css']
})
export class PersonDeleteComponent {
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

  exclude() {
    if (this.person.id !== 0) {
      this.http.delete(`https://localhost:7153/api/People/Delete/${this.idReceived}`)
      .subscribe((data) => {
        console.log(`Linhas executadas no método de remover do banco ${JSON.stringify(data)}`);
        this.router.navigate([`list`]);
      });
  
    } else {
      console.log('Erro na validação');
      // TRATAMENTO DE ERRO
      // ALERTA
      // BORDA VERMELHA
    }
  }

  close() {
    this.router.navigate([`list`]);
  }
}
