import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CharacterService } from './character.service';
import { Character } from './character.model';

describe('CharacterService', () => {
    let service: CharacterService;
    let httpMock: HttpTestingController;
    const mockCharactersPage1: Character[] = [
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
    const mockCharactersPage2: Character[] = [
        {
            "url": "https://www.anapioficeandfire.com/api/characters/3",
            "name": "Character 3",
            "gender": "Male",
            "culture": "Westerosi",
            "born": "In 283 AC",
            "died": "",
            "titles": ["Ser"],
            "aliases": ["The Bold"],
            "father": "",
            "mother": "",
            "spouse": "",
            "allegiances": ["https://www.anapioficeandfire.com/api/houses/229"],
            "books": [
                "https://www.anapioficeandfire.com/api/books/1",
                "https://www.anapioficeandfire.com/api/books/2",
                "https://www.anapioficeandfire.com/api/books/3"
            ],
            "povBooks": [],
            "tvSeries": ["Season 1"],
            "playedBy": ["John Doe"]
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CharacterService]
        });
        service = TestBed.inject(CharacterService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should fetch characters for page 1 by default', () => {
        // service.getCharacters(1).subscribe((characters) => {
        service.getCharacters().subscribe((characters) => {
            expect(characters.length).toBe(mockCharactersPage1.length);
            expect(characters).toEqual(mockCharactersPage1);
        });

        const req = httpMock.expectOne(`https://www.anapioficeandfire.com/api/characters?page=1&pageSize=10`);
        expect(req.request.method).toBe('GET');
        req.flush(mockCharactersPage1);
    });

    // it('should fetch characters for specified page number', () => {
    //     service.getCharacters(2).subscribe((characters) => {
    //         expect(characters.length).toBe(mockCharactersPage2.length);
    //         expect(characters).toEqual(mockCharactersPage2);
    //     });

    //     const req = httpMock.expectOne(`https://www.anapioficeandfire.com/api/characters?page=2&pageSize=10`);
    //     expect(req.request.method).toBe('GET');
    //     req.flush(mockCharactersPage2);
    // });

});
