import Queue from '../queue';

const queue = new Queue();

test('should  add to stack', () => {
  queue.enqueue(4);
  queue.enqueue(1);
  queue.enqueue(78);
  expect(queue.printQueue()).toStrictEqual([4, 1, 78]);
});

test(' should peek at top', () => {
  expect(queue.peek()).toEqual(4);
});

test('should pop top element', () => {
  queue.dequeue();
  expect(queue.printQueue()).toStrictEqual([1, 78]);
});
