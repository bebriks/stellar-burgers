const fixturesArr = ['user', 'order', 'ingredients', 'feeds'];
const interceptsArr = [
  {
    method: 'GET',
    url: '/api/ingredients',
    fixture: 'ingredients',
    alias: 'ingredients'
  },
  {
    method: 'GET',
    url: '/api/auth/user',
    fixture: 'user',
    alias: 'user'
  },
  {
    method: 'GET',
    url: '/api/orders/all',
    fixture: 'user-orders',
    alias: 'user-orders'
  },
  {
    method: 'GET',
    url: '/api/feeds',
    fixture: 'feeds',
    alias: 'feeds'
  },
  {
    method: 'POST',
    url: '/api/orders',
    fixture: 'order',
    alias: 'order'
  }
];

describe('Application', () => {
  beforeEach(() => {
    fixturesArr.forEach((fixture) => cy.fixture(`${fixture}.json`));

    interceptsArr.forEach(({ method, url, fixture, alias }) =>
      cy.intercept({ method, url }, { fixture }).as(alias)
    );

    cy.setCookie('accessToken', 'mockTokenLayvu');
    localStorage.setItem('refreshToken', 'mockTokenLayvu');

    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Load page', () => {
    cy.visit('/');
  });

  it('Test API', () => {
    cy.wait('@ingredients');
    cy.wait('@user');
  });

  it('Open modal ingredient card', () => {
    cy.get('[data-cy="ingredient"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain.text', 'Детали ингредиента');
  });

  it('Close modal ingredient card by overlay', () => {
    cy.get('[data-cy="ingredient"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Close modal ingredient card by button', () => {
    cy.get('[data-cy="ingredient"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Add bun to constructor', () => {
    cy.get('[data-cy="ingredient"]').first().children().last().click();
    cy.get('[data-cy="constructor-bun-top"]').should('be.visible');
    cy.get('[data-cy="constructor-bun-bottom"]').should('be.visible');
  });

  it('Add ingredient to constructor', () => {
    cy.get('[data-cy="ingredient"]').last().children().last().click();
    cy.get('[data-cy="constructor-ingredient"]').should('be.visible');
  });

  it('Constructing burger', () => {
    cy.get('[data-cy="ingredient"]').first().children().last().click();
    cy.get('[data-cy="constructor-bun-top"]').should('be.visible');
    cy.get('[data-cy="constructor-bun-bottom"]').should('be.visible');

    cy.get('[data-cy="ingredient"]').last().children().last().click();
    cy.get('[data-cy="constructor-ingredient"]').should('be.visible');
    cy.get('[data-cy="constructor-order-button"]').click();

    cy.wait('@order').then((res) => {
      const orderNumber = res.response?.body?.order?.number;

      cy.get(`[data-cy='modal']`).should('be.visible');

      cy.get('[data-cy="order-number"]').should('contain.text', orderNumber);

      cy.get(`[data-cy='modal']`).find('button').click();

      cy.get(`[data-cy='modal']`).should('not.exist');

      cy.get('[data-cy="constructor-bun-top"]').should('not.exist');

      cy.get('[data-cy="constructor-ingredient"]').should('not.exist');

      cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
    });
  });
});
