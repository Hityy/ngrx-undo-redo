import { UndoPage } from './app.po';

describe('undo App', () => {
  let page: UndoPage;

  beforeEach(() => {
    page = new UndoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
