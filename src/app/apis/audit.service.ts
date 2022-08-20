import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  public  baseUrl = "https://letstalk-be.herokuapp.com" || "http://localhost:3000"

  public headers:HttpHeaders= new HttpHeaders({
    'Content-Type':'application/json',
    'Accept':"application/json",
    'Access-Control-Allow-Methods':'GET,POST,PUT,DELETE',
    'Authorization':''
  });
  
  constructor(private http:HttpClient) { }

  public getAudits(pageIndex,pageSize,filter?){
    let params= new HttpParams();
    if(filter && !filter.searchText){
      if(filter.statusCode){
        params = params.append('statusCode',filter.statusCode);
      }
      if(filter.statusMessage){
        params = params.append('statusMessage',filter.statusMessage);
      }
      if(filter.email){
        params = params.append('email',filter.email);
      }
    }

    if(filter.searchText){
      if(filter.searchText && filter.searchText.length > 0){
        params = params.append('searchText',filter.searchText);
      }
    }
    return this.http.get(`${this.baseUrl}/public/audits/${pageIndex}/${pageSize}`,{headers :this.headers,params})
  }

  public getAuditFilterValues(){
    return this.http.get(`${this.baseUrl}/public/audits/filter-values`,{headers :this.headers})
  }

}
