import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class HttpClientService {
    private readonly _api_url = environment.api_url;
    private readonly _http = inject(HttpClient)

    public register_player_id=(user:any):Observable<any>=>this._http.post<any>(`${this._api_url}/register-player-id`,user)
}