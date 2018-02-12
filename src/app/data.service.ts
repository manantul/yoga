import {Injectable} from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http: Http) {

  }
 programs() {

    return new  Promise(resolve => {

        this.http.get('https://api.myjson.com/bins/5bdb3').map((res:Response) => (res.json())).subscribe((data:Array<any>) => {resolve(data);
            console.log('Service' + typeof data);
          },
            error => {
              console.log(error);
            });

      });

  }

  pricingOptions() {

    return new
      Promise(resolve => {

        this.http.get('https://api.myjson.com/bins/47axv').map((res:Response) => (res.json())).subscribe((data) => {
              resolve(data);
          },
            error => {
              console.log(error);
            });

      });

  }

}
