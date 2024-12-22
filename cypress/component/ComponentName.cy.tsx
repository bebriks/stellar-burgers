/// <reference path="../support/component.ts" />
import React from 'react';
import { ConstructorPage } from '../../src/pages/constructor-page/constructor-page';
describe('ComponentName.cy.tsx', () => {
  it('playground', () => {
    cy.mount(<ConstructorPage />);
  });
});
