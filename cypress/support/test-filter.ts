const TestFilter = (definedTags: string[], runTest: () => void): void => {
  if (!Cypress.env('TEST_TAGS')) {
    runTest();
    return;
  }

  const tags = Cypress.env('TEST_TAGS').split(',');
  const isFound = definedTags.some(definedTag => tags.includes(definedTag));

  if (isFound) {
    runTest();
  }
};

export default TestFilter;
