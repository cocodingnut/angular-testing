import { Component } from '@angular/core';
import { Character } from './character.model';
import { CharacterService } from './character.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  characters: Character[] = [];
  pageNumber: number = 1;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.fetchCharacters();
  }

  // 
  fetchCharacters(): void {
    from(this.characterService.getCharacters(this.pageNumber))
      .subscribe(
        (newCharacters: Character[]) => {
          this.characters = newCharacters;
        },
        (error: any) => {
          console.error('Error fetching characters:', error);
        }
      );
  }

  handleClick(): void {
    this.pageNumber++;
    this.fetchCharacters();
  }
}
