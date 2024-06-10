import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CharacterService } from './character.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Character } from './character.model';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let characterServiceStub: Partial<CharacterService>;
    // let pageNumber = 1;

    const mockCharacters: Character[] = [
        {
            "url": "https://www.anapioficeandfire.com/api/characters/1",
            "name": "",
            "gender": "Female",
            "culture": "Braavosi",
            "born": "",
            "died": "",
            "titles": [],
            "aliases": [
                "The Daughter of the Dusk"
            ],
            "father": "",
            "mother": "",
            "spouse": "",
            "allegiances": [],
            "books": [
                "https://www.anapioficeandfire.com/api/books/5"
            ],
            "povBooks": [],
            "tvSeries": [],
            "playedBy": []
        },
        {
            "url": "https://www.anapioficeandfire.com/api/characters/2",
            "name": "Walder",
            "gender": "Male",
            "culture": "",
            "born": "",
            "died": "",
            "titles": [],
            "aliases": [
                "Hodor"
            ],
            "father": "",
            "mother": "",
            "spouse": "",
            "allegiances": [
                "https://www.anapioficeandfire.com/api/houses/362"
            ],
            "books": [
                "https://www.anapioficeandfire.com/api/books/1",
                "https://www.anapioficeandfire.com/api/books/2",
                "https://www.anapioficeandfire.com/api/books/3",
                "https://www.anapioficeandfire.com/api/books/5",
                "https://www.anapioficeandfire.com/api/books/8"
            ],
            "povBooks": [],
            "tvSeries": [
                "Season 1",
                "Season 2",
                "Season 3",
                "Season 4",
                "Season 6"
            ],
            "playedBy": [
                "Kristian Nairn"
            ]
        }
    ];

    beforeEach(async () => {
        characterServiceStub = {
            getCharacters: (pageNumber: number) => of(mockCharacters)
        };

        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [{ provide: CharacterService, useValue: characterServiceStub }]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should display character name and culture', () => {

        const characterNameElements = fixture.debugElement.queryAll(By.css('.charname'));
        const cultureElements = fixture.debugElement.queryAll(By.css('.culture'));

        characterNameElements.forEach((el, index) => {
            expect(el.nativeElement.textContent).toContain(mockCharacters[index].name || mockCharacters[index].aliases[0]);
        });
        cultureElements.forEach((el, index) => {
            expect(el.nativeElement.textContent).toContain(mockCharacters[index].culture);
        });
    });

    it('should display the number of books the character appeared in', () => {
        const booksNoElements = fixture.debugElement.queryAll(By.css('.booksno'));
        booksNoElements.forEach((el, index) => {
            const actualText = el.nativeElement.textContent.trim();
            const expectedText = `Number of Books:  ${mockCharacters[index].books.length}`;
            expect(actualText).toContain(expectedText);
        });
    });

    it('should display alias if no name is present', () => {
        const characterElements = fixture.debugElement.queryAll(By.css('.charname'));
        characterElements.forEach((el, index) => {
            const character = mockCharacters[index];
            if (!character.name) {
                expect(el.nativeElement.textContent).toContain(character.aliases[0]);
            }
        });
    });

    it('should handle error when fetching characters', () => {
        const error = 'Test Error';
        spyOn(console, 'error');
        spyOn(characterServiceStub as any, 'getCharacters').and.returnValue(throwError(error) as Observable<any>);
        component.fetchCharacters();
        expect(console.error).toHaveBeenCalledWith('Error fetching characters:', error);
    });

    it('should handle page number increase', () => {
        const initialPageNumber = component.pageNumber;
        spyOn(component, 'fetchCharacters');
        component.handleClick();
        expect(component.pageNumber).toEqual(initialPageNumber + 1);
        expect(component.fetchCharacters).toHaveBeenCalled();
    });

});
