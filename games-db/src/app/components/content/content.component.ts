import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Platform } from 'src/app/enums/platform';
import { SortBy } from 'src/app/enums/sort-by';
import { Tag } from 'src/app/enums/tag';
import { APIResponse } from 'src/app/models/apiresponse';
import { Game } from 'src/app/models/game';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  public sort: string = '';
  public games: Array<Game> = new Array<Game>();

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames(SortBy.Popularity, params['game-search']);
      } else {
        this.searchGames(SortBy.Popularity);
      }
    });
  }

  searchGames(sortBy: SortBy, platform?: Platform, tags?: Array<Tag>): void {
    this.httpService
      .getGameList(sortBy, platform, tags)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(this.games);
      });
  }
}
