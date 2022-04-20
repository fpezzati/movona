describe('ScouterWeb map is ready', ()=>{
  it('map is ready', ()=>{
    cy.visit('http://192.168.49.2:30000/scouter/');
    cy.get('scouter-web').shadow().find('.scouter-bound').contains('map');
  })
});

describe('Draw geometries on map', ()=>{
  beforeEach(() => {
    cy.visit('http://192.168.49.2:30000/scouter/');
  })

  it('cannot draw on map until draw button is clicked', ()=>{
    cy.get('scouter-web').shadow().find('.scouter-bound').find('#map').click(300, 300).click(300,400)
  })

  it('can draw after clicking draw button', ()=>{
    cy.get('scouter-web').shadow().find('.scouter-tools-main-button').click()
    cy.get('scouter-web').shadow().find('draw route').click()
    console.log('new cy')
    cy.get('scouter-web').shadow().get('scouter-web').shadow().find('#map')
    .click(400, 400)
    .click(400, 600)
    .click(500, 600)
  })
});
