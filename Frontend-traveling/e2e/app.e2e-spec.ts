import { FrontendTravlingPage } from './app.po';

describe('frontend-travling App', () => {
  let page: FrontendTravlingPage;

  beforeEach(() => {
    page = new FrontendTravlingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
