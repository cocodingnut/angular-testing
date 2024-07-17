# angular-testing

Requirements and setup:
1. Clone this project (Angular v14): https://github.com/lukeyzhong/angular-testing.git
2. Read readme file
3. Read the tasks below and finish those tasks
4. Once you finish the assignment, please submit your repo link and assignment in a word document.
Tasks:
First test suite will test html rendering. Second test will test the getCharacter method in the service by using HttpClientTestingModule.
After these four tests, what is the code coverage?  How to improve higher code coverage for this Angular application?
What are TDD and BDD and what are the differences between them?
In the app.component.ts, test:
describe(“AppComponent’’, () => {
 test(’shows fields for “name” and “culture”, ()=>{});
 test(’shows how many books this characters made an appearance in”,  () => {});
 test (“shows alias if no name is present”, () => {});
})
In the character.service.ts, test:
   describe (“CharacterService”, () => {
    test(‘get Characters”’,  () => {});
}); (edited) 
