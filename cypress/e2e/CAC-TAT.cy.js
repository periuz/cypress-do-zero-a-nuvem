const { fileURLToPath } = require("url")

describe('Central de Atendimento a ocliente', () => {
    beforeEach(() => {
        cy.visit('src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    it('Preenche o formulario', () => {
        cy.get('#firstName')
            .as('nameField')
            .type('Thiago')
        cy.get('@nameField')
            .should('have.value', 'Thiago')

        cy.get('#lastName')
            .as('lastNameField')
            .type('da Silva')
        cy.get('@lastNameField')
            .should('have.value', 'da Silva')

        cy.get('#email')
            .as('emailField')
            .type('seila@gmail.com')

        cy.get('#open-text-area')
            .type('Qualquer coisa a ser escrita por mim mesmo')

        cy.get('.button').click()

    })

    it ('Exibe mensagem de erro ao preencher o email erroneamente', () => {
        cy.get('#email')
            .type('ola')
        
        cy.get('.button').click()

        cy.get('.error')
            .should('be.visible')
    })

    it ('Número não aceita letras', () => {
        cy.get('#phone')
            .as('phoneField')
            .type('qwertyuiopasdfghjklçzxcvbnm')
        cy.get('@phoneField')
            .should('be.empty')
    })

    it ('exibe mensagem de erro quando o telefone se torna obrigatório', () => {
        cy.get('#phone-checkbox').click()
        cy.get('.button').click()
        
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('da Silva')
        cy.get('#email').type('seila@gmail.com')
        cy.get('#open-text-area').type('Qualquer coisa a ser escrita por mim mesmo')

        cy.get('.button').click()

        cy.get('.error')
            .should('be.visible')
    })

    it ("preencher formulários (obrigatórios) com o comando personalizado", () => {
        // const data = {
        //     nameField: 'Thiago',
        //     lastNameField: 'Perius',
        //     emailField: 'thiago@gmail.com',
        //     openTextField: '****POSSO PERSONALIZAR MINHAS ENTRADAS DE DATA SEMPRE QUE QUISER DESSA MANEIRA*****'

        // }
        // cy.fillMandatoryFieldsAndSubmit()

        cy.fillMandatoryFieldsAndSubmit()
    })

    it ("Seleciona um item de um selector por índice", () => {
        cy.get('select').select(1)
            .as('productBlog')
        cy.get('@productBlog').should('contain', 'Blog')
    })

    it ("Selecina um item de um selector por nome", () => {
        cy.get('select').select('YouTube')
            .as('productYoutube')
        cy.get('@productYoutube').should('contain', 'YouTube')
    })

    it ('Marca cada tipo de atendimento utilizando EACH e WRAP (melhor opcao)', () => {
         cy.get('input[type="radio"]')
            .each(typeOfService => {
                cy.wrap(typeOfService)
                .check()
                .should('be.checked')
            })
    })

    it ('Marcar todos checks e desmarcar o último', () => {
         cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it ('Select some file to be attched', () => {
        cy.get('#file-upload')
            .as('fileAttched')
            .selectFile('cypress/fixtures/example.json')
        cy.get('@fileAttched')
            .should(input => {
                expect(input[0].files[0].name).to.be.equal('example.json')
            })
    })

    it ('Drag and drop some file into attachments', () => {
        cy.get('#file-upload')
            .as('fileAttched')
            .selectFile('cypress/fixtures/example.json', {action : 'drag-drop'})
        cy.get('@fileAttched')
            .should(input => {
                expect(input[0].files[0].name).to.be.equal('example.json')
            })
    })

    it ('Checar se o link abre em uma nova página', () => {
        cy.get('a').should('have.attr', 'target', '_blank')
    })

    it('Remover o target=blank do link e clicar nele', () => {
        cy.get('a')
            .as('link')
            .invoke('removeAttr', 'target')
            .get('@link').click()

        cy.get('#title')
            .should('be.visible')

    })


})