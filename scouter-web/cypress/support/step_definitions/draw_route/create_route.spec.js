import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('user lands on scouter-web', ()=>{
  cy.visit('http://192.168.49.2:30000/scouter/');
  cy.get('scouter-web').shadow().find('.scouter-bound').contains('map');
})

When('user clicks on draw route button', ()=>{
  cy.get('scouter-web').shadow().find('.scouter-tools-main-button').click()
  cy.get('scouter-web').shadow().contains('draw route').click()
})

Then('user can draw a route on map', ()=>{
  cy.get('scouter-web').shadow().get('scouter-web').shadow().find('#map')
  .click(400, 400)
  .click(400, 600)
  .click(500, 600)
  cy.get('scouter-web').shadow().find('.leaflet-marker-icon.leaflet-div-icon').should((e)=>{
    expect(e).to.have.length(3);
  });
})
