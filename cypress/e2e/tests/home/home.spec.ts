import { homePage } from 'e2e/pages/home-page';
import TestFilter from '../../../support/test-filter';

TestFilter(['home', 'regression', 'guest'], () => {
  describe('Home Page', () => {
    it('should load Home Page', () => {
      homePage.visit();
    });
  });
});
