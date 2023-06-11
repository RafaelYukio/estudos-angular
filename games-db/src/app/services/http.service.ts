import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SortBy } from '../enums/sort-by';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse } from '../models/apiresponse';
import { Game } from '../models/game';
import { Platform } from '../enums/platform';
import { Tag } from '../enums/tag';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getGameList(
    sortBy: SortBy,
    platform?: Platform,
    tags?: Array<Tag>
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('sort-by', sortBy);

    if (platform) params.set('platform', platform);
    else if (tags) {
      let tagsParam = '';
      tags.forEach((tag) => {
        tagsParam += `.${tag}`;
      });

      params.set('tag', tagsParam);
    }

    return tags
      ? this.http.get<APIResponse<Game>>(`${env.BASE_URL}/filter`, {
          params: params,
        })
      : this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
          params: params,
        });
  }
}
