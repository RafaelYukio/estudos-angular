import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/game';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() game!: Game;
  public platform!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    switch (this.game.platform) {
      case 'PC (Windows)':
        this.platform = 'assets/images/platforms/pc.svg';
        break;
      case 'Web Browser':
        this.platform = 'assets/images/platforms/web.svg';
        break;
    }
  }

  openGameDetails(gameId: string): void {
    this.router.navigate(['details', gameId]);
  }
}
