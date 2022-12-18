import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

import { IPersonDto } from '../interfaces/IPersonDto';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],

  animations: [trigger("moveInLeft", [transition("void=> *", [style({ transform: "translateX(300px)" }), animate(200, keyframes([style({ transform: "translateX(300px)" }), style({ transform: "translateX(0)" })]))]),
  transition("*=>void", [style({ transform: "translateX(0px)" }), animate(100, keyframes([style({ transform: "translateX(0px)" }), style({ transform: "translateX(300px)" })]))])])
  ]
})

export class PersonListComponent {
  listPeople: IPersonDto[] = [];
  personSelected!: IPersonDto;

  constructor(private http: HttpClient, private router: Router) {
    this.getAll();
  }

  getAll() {
    this.listPeople = [];

    this.http
      .get('https://localhost:7153/api/People/GetAll')
      .pipe(
        map((response: any) => {
          return Object.values(response);
        })
      )
      .subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          let contentJson: any = data[i];
          this.listPeople.push(contentJson as IPersonDto);
        }
      });
  }

  getOne(id: number) {
    this.router.navigate([`detail/${id}`]);
  }
  
  /*
  editPerson(id: number) {

  }

  removePerson(id: number) {

  }

  submitFormPerson(valueForm: any) {

  }
  */
}
