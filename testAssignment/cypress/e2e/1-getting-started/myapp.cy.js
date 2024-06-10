describe('AppComponent E2E Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/');
    });

    it('should display characters with name or alias, culture, and number of books', () => {
        cy.get('.charname').each(($el, index, $list) => {
            cy.wrap($el).invoke('text').should('match', /name\s+\S+/)
        })
        cy.get('.culture').each(($el, index, $list) => {
            cy.wrap($el).invoke('text').should('contain', 'culture')
        })
        cy.get('.booksno').each(($el, index, $list) => {
            cy.wrap($el).invoke('text').should('match', /Number of Books:\s+\d+/)
        })
    })

    it('should load more characters when "Load More Characters" button is clicked', () => {
        cy.get('.charname').then($chars => {
            const initialLength = 10;
            cy.get('button').contains('Load More Characters').click()
            cy.get('.charname').should('have.length', initialLength)
        })
    })

    it('should display the correct next page number', () => {

        cy.get('button').contains('Load More Characters').click();

        cy.get('div').contains('Next page:').then($page => {
            const previousPageNumber = parseInt($page.text().match(/\d+/)[0]);
            const currentPageNumber = previousPageNumber + 1;
            cy.wrap(currentPageNumber).should('eq', previousPageNumber + 1);
        });

    })
});
