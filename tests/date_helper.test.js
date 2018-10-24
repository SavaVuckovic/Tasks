import formatDueDate from '../src/js/date_helper';

test('correct output', () => {
  expect(formatDueDate('2018-10-18')).toBe('18. 10. 2018.');
});