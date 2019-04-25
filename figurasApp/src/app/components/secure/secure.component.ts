import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css']
})
export class SecureComponent implements OnInit {
  
  elementos$:Observable<any>;
  constructor(private router:Router,
              private dataService:DataService) {
           
          this.elementos$ = dataService.getAllElementos();
          console.log(this.elementos$);
   }

  ngOnInit() {
    
  }


  goTo(route:string){
    this.router.navigateByUrl(route);

  }
}
