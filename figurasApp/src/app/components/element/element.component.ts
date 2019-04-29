import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {
  isElementRoute: boolean;
  elemento:string;
  elementoSelect$:Observable<any>;
  nombre:string;
  constructor(private router: Router,
              private activatedRoute:ActivatedRoute,
              private dataService:DataService ) {
   this.elemento = this.activatedRoute.snapshot.params['elementName'];
   this.elementoSelect$ = this.dataService.getElementosByName(this.elemento);
   console.log(this.elementoSelect$);
  } 
  ngOnInit() {
  }
  goTo(route:string){
    this.router.navigateByUrl(route);
  }
}
