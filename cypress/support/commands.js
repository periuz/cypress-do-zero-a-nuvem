Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    nameField: 'Thiago',
    lastNameField: 'Perius',
    emailField: 'thiago@gmail.com',
    openTextField: 'Qualquer coisa pq eu posso'
}) => {
    cy.get('#firstName').type(data.nameField)
    cy.get('#lastName').type(data.lastNameField)
    cy.get('#email').type(data.emailField)
    cy.get('#open-text-area').type(data.openTextField)
})
