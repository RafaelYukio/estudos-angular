import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailCard } from 'src/app/models/detail-card';
import { GameDetails } from 'src/app/models/game-details';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public gameDetails!: GameDetails;
  private gameDetailsSub!: Subscription;

  public gameRating = 70;
  public detailReleaseDate!: DetailCard;
  public detailGenre!: DetailCard;
  public detailStatus!: DetailCard;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.gameDetailsSub = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.httpService.getGameById(params['gameId']).subscribe((response) => {
          this.gameDetails = JSON.parse(response.contents);
          console.log(JSON.parse(response.contents));
          this.setDetailCards(this.gameDetails);
        });
      }
    );
  }

  setDetailCards(gameDetails: GameDetails): void {
    this.detailReleaseDate = {
      value: gameDetails.release_date.toString(),
      label: 'Release Date',
    };

    this.detailGenre = {
      value: gameDetails.genre,
      label: 'Genre',
    };

    this.detailStatus = {
      value: gameDetails.status,
      label: 'Status',
    };
  }

  getColor(value: number): string {
    if (value > 75) return '#5ee432';
    else if (value > 50) return '#fffa50';
    else if (value > 30) return '#f7aa38';
    else return '#ef4655';
  }

  ngOnDestroy(): void {
    this.gameDetailsSub.unsubscribe();
  }
}
