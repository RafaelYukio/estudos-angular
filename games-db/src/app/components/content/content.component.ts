import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform } from 'src/app/enums/platform';
import { SortBy } from 'src/app/enums/sort-by';
import { Tag } from 'src/app/enums/tag';
import { Game } from 'src/app/models/game';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  public sortBy!: SortBy;
  public sortByOptions = SortBy;
  public games: Array<Game> = new Array<Game>();

  // É bom declarar as Subscriptions e para depois dar unsubscribe ao sair da pág. (onDestroy), prevenindo memory leak
  private routeSub!: Subscription;
  private gameSub!: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('to aqui');
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames(SortBy.Popularity, params['game-search']);
      } else {
        this.searchGames(SortBy.Popularity);
      }
      // Caso não consiga acessar a API por causa do CORS
      // if (this.games.length == 0)
      //   this.games = games.slice(0, 20) as Array<Game>;
    });
  }

  searchGames(sortBy: SortBy, platform?: Platform, tags?: Array<Tag>): void {
    this.gameSub = this.httpService
      .getGameList(sortBy, platform, tags)
      .subscribe((response) => {
        this.games = JSON.parse(response.contents).slice(0, 30);
      });
  }

  ngOnDestroy(): void {
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.gameSub) this.gameSub.unsubscribe();
  }
}
