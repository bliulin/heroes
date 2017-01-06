import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: 'heroes.component.html',
  styleUrls: ['heroes.component.css']  
})
export class HeroesComponent implements OnInit  { 

  constructor(private heroService: HeroService,
    private router: Router) { }

  title = 'Tour of Heroes';
  selectedHero: Hero;
  newHeroName: string;
  heroes: Hero[];

  ngOnInit(): void {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  addHero(): void {    
    this.newHeroName = this.newHeroName.trim();
    if (!this.newHeroName) {
      return;
    }
    this.heroService.addHero(this.newHeroName)
      .then(hero => {
        this.newHeroName = '';
        this.heroes.push(hero);
        this.selectedHero = hero;
      });
  }

  deleteHero(hero: Hero): void {
    this.heroService.deleteHero(hero.id)
      .then(heroId => {
        let index = this.heroes.indexOf(hero);
        this.heroes.splice(index, 1);
        if (this.selectedHero === hero) {
          this.selectedHero = null;
        }
      });
  }
}
