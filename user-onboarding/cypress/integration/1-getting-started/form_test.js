describe('Form App',()=>{
    beforeEach(() =>{
        cy.visit('http://localhost:3000')
    })

    const nameInput = () => cy.get('input[name=name]')
    const emailInput = () => cy.get('input[name=email]')
    const passInput = () => cy.get('input[name=password]')
    const tosInput = () => cy.get('input[name=tos]')
    const submitBtn = () => cy.get('button[id="submit"]')


    it('Sanity check to make sure that tests work', () => {
        // "it" is a test
        // "expect" is an assertion
        expect(1 + 2).to.equal(3)
        expect(2 + 2).not.to.equal(5)
        expect({}).not.to.equal({}) // equal ie ===
        expect({}).to.eql({}) // eql ie ==
    })


    it('The proper elements are showing', () => {
        nameInput().should('exist')
        passInput().should('exist')
        tosInput().should('exist')
        emailInput().should('exist')
        submitBtn().should('exist')

    })

    describe('Filling out the form and submitting', ()=>{
        it('entering the name, email, and password, then checking the box and submitting while checking for an enabled submitBtn',() =>{
            nameInput().type('Billy Myers')
            emailInput().type('billymyers223@gmail.com')
            passInput().type('123456')
            tosInput().check()
            submitBtn().should('be.enabled')
            submitBtn().click();
        })


    })

    describe('Checking for an empty form', () => {
        it('Checking for an empty form ', () => {
            nameInput().should('have.value', '')
            emailInput().should('have.value', '')
            passInput().should('have.value', '')
            tosInput().should('not.be.checked')
        })
    })
    

})