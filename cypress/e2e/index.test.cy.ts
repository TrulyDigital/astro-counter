import { 
  createCounterObservable, 
  createSpanCounterObserver,
  createButtonMoreObserver,
} from "../../src/pages/Counter";

describe('Page - index.astro', () => {

  it('#idButtonMore - disable', () => {

    // get index
    cy.visit('/');
  
    // state
    const state = {
      counter: 10,
    };
  
    // get buttom from the dom
    cy.get('#idButtonMore').then($button => {
      if($button.length){
        
        const buttonMore = $button[0] as HTMLButtonElement;
  
        // Create observer
        const buttonMoreObserver = createButtonMoreObserver(buttonMore);
  
        // Fire update
        buttonMoreObserver.update(state);
  
        // Check component
        cy.wrap(buttonMore).should('have.class', '_button_disable');
      }
      else{
        throw new Error('Button with ID idButtonMore not found');
      }
    })
  });
})
