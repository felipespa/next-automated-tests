describe("Cypress CoinList" , () => {
  it("Should filter correctly" , () => {
    cy.visit("http://localhost:3000")

    cy.get("li:contains(Metamask)")
    cy.get("li:contains(Bitcoin)")
    cy.get("li:contains(Ethereum)")

    cy.get("input").type("metamask")

    
    cy.get("li:contains(Metamask)").should("exist")
    cy.get("li:contains(Bitcoin)").should("not.exist")
    cy.get("li:contains(Ethereum)").should("not.exist")
  })
})