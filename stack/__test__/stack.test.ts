import Stack from '../stack';

const stack = new Stack();

test('should  add to stack', () => {
  stack.push(4);
  stack.push(1);
  stack.push(78);
  expect(stack.printStack()).toStrictEqual([4, 1, 78]);
});

test(' should peek at top', () => {
  expect(stack.peek()).toEqual(78);
});

test('should pop top element', () => {
  stack.pop();
  expect(stack.printStack()).toStrictEqual([4, 1]);
});
