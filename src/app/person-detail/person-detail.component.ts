import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IPersonDto } from '../interfaces/IPersonDto';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})

export class PersonDetailComponent {
  @Input() closeDetail!: () => void;

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

  close() {
    this.closeDetail();
  }
}
