describe('test scenario 1: normal user case ', () => {
  context('visit home', () => {
    it("hompage", ()=>{
      cy.visit('http://localhost:3000');
      cy.wait(500);
    })
    it("fill destination", ()=>{
      const destination = "hanbit church"
      cy.get('input[name="destination"]').type(destination);

    })
    it("search route", ()=>{
      cy.get("#search").click();
    })
    
  })
  context('using first route', ()=>{
    it("choose first route", ()=>{
      cy.wait(500);
      cy.get(".route_button#route0").click();
    })
    it("join ride", ()=>{
      cy.get("button#ride").click();
    })
    it("take qr code", ()=>{
      cy.get(".camera > div").first().get("div").get("#inner-circle").click({force: true});
    })
    it("start navigate",()=>{
      cy.get("button#start").click();
      cy.wait(3000);
    } )
    
  })
  context('get navigation', ()=>{
    it("end navigation", ()=>{
      cy.get("button#end").click();
    })
  })
  context('end navigation', ()=>{
    it('pay fee', ()=>{
      cy.get("button#payment").click();
    })
    it("finish payment", ()=>{
      cy.get("button#confirm").click();
    })
  })
})

describe('test scenario 2: free rider case ', () => {
  context('visit home', () => {
    it("hompage", ()=>{
      cy.visit('http://localhost:3000');
      cy.wait(500);
    })
    it("fill destination", ()=>{
      const destination = "hanbit church"
      cy.get('input[name="destination"]').type(destination);

    })
    it("search route", ()=>{
      cy.get("#search").click();
    })
    
  })
  context('using freerider route (last)', ()=>{
    it("choose last route", ()=>{
      cy.wait(500);
      cy.get(".route_button#route3").click();
    })
    it("join ride", ()=>{
      cy.get("button#ride").click();
    })
    it("take qr code", ()=>{
      cy.get(".camera > div").first().get("div").get("#inner-circle").click({force: true});
    })
    it("start navigate",()=>{
      cy.get("button#start").click();
      cy.wait(3000);
    } )
    
  })
  context('get navigation', ()=>{
    it("end navigation", ()=>{
      cy.get("button#end").click();
    })
  })
  context('end navigation', ()=>{
    it("finish riding", ()=>{
      cy.get("button#confirm").click();
    })
  })
})

describe('test scenario 3: connect fault kickboard', () => {
  context('visit home', () => {
    it("hompage", ()=>{
      cy.visit('http://localhost:3000');
      cy.wait(500);
    })
    it("fil destination", ()=>{
      const destination = "hanbit church"
      cy.get('input[name="destination"]').type(destination);

    })
    it("search route", ()=>{
      cy.get("#search").click();
    })
    
  })
  context('using first route', ()=>{
    it("choose first route", ()=>{
      cy.wait(500);
      cy.get(".route_button#route0").click();
    })
    it("join ride", ()=>{
      cy.get("button#ride").click();
    })
    it("take qr code", ()=>{
      cy.get(".camera > div").first().get("div").get("#inner-circle").click({force: true});
    })
    it("cancel connect",()=>{
      cy.get("button#back").click();
    } )
  })
})

describe('test scenario 4: stop riding during riding ', () => {
  context('visit home', () => {
    it("hompage", ()=>{
      cy.visit('http://localhost:3000');
      cy.wait(500);
    })
    it("fill destination", ()=>{
      const destination = "hanbit church"
      cy.get('input[name="destination"]').type(destination);

    })
    it("search route", ()=>{
      cy.get("#search").click();
    })
    
  })
  context('using first route', ()=>{
    it("choose first route", ()=>{
      cy.wait(500);
      cy.get(".route_button#route0").click();
    })
    it("join ride", ()=>{
      cy.get("button#ride").click();
    })
    it("take qr code", ()=>{
      cy.get(".camera > div").first().get("div").get("#inner-circle").click({force: true});
    })
    it("start navigate",()=>{
      cy.get("button#start").click();
      cy.wait(3000);
    } )
    
  })
  context('get navigation', ()=>{
    it("stop navigation", ()=>{
      cy.get("button#pause").click();
    })
  })
  context('stop navigation', ()=>{
    it("end riding", ()=>{
      cy.get("button#end").click();
    })
  })
  context('end navigation', ()=>{
    it('pay fee', ()=>{
      cy.get("button#payment").click();
    })
    it("finish payment", ()=>{
      cy.get("button#confirm").click();
    })
  })
})
