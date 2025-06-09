describe ('Should test Privacy Policy', () => {
    beforeEach (() => {
        cy.visit('./src/privacy.html')
    })

    it ('Should verify title and content about Privacy Policy', () => {
        cy.get('#title')
            .should('contain', 'CAC TAT - Política de Privacidade')

        cy.get('#white-background') 
            .should('contain', 'tecnologias')
    })
})