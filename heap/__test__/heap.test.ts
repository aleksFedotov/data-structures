import { MaxHeap, MinHeap } from '../heap';

const maxHeap = new MaxHeap();
const minHeap = new MinHeap();

describe('max heap testing', () => {
  test('adding new nodes', () => {
    maxHeap.add(23);
    maxHeap.add(65);
    maxHeap.add(12);
    maxHeap.add(7);
    maxHeap.add(56);
    maxHeap.add(18);
    maxHeap.add(77);
    expect(maxHeap.printArray()).toStrictEqual([77, 56, 65, 7, 23, 12, 18]);
  });

  test('should get max value', () => {
    const max = maxHeap.poll();
    expect(max).toEqual({ priority: 77 });
    expect(maxHeap.printArray()).toStrictEqual([65, 56, 18, 7, 23, 12]);
  });

  test('should show max value', () => {
    expect(maxHeap.peek()).toEqual({ priority: 65 });
  });

  test('should bea able to remove by index of node', () => {
    maxHeap.removeByIndex(3);
    expect(maxHeap.printArray()).toStrictEqual([65, 56, 18, 12, 23]);
  });

  test('should be empty after polling all nodes', () => {
    maxHeap.poll();
    maxHeap.poll();
    maxHeap.poll();
    maxHeap.poll();
    maxHeap.poll();
    expect(maxHeap.isEmpty()).toBeTruthy();
  });
});

describe('min heap testing', () => {
  test('adding new nodes', () => {
    minHeap.add(11);
    minHeap.add(4);
    minHeap.add(67);
    minHeap.add(34);
    minHeap.add(21);
    minHeap.add(14);
    minHeap.add(3);
    expect(minHeap.printArray()).toStrictEqual([3, 11, 4, 34, 21, 67, 14]);
  });

  test('should get min value', () => {
    const max = minHeap.poll();
    expect(max).toEqual({ priority: 3 });
    expect(minHeap.printArray()).toStrictEqual([4, 11, 14, 34, 21, 67]);
  });

  test('should show min value', () => {
    expect(minHeap.peek()).toEqual({ priority: 4 });
  });

  test('should be able to remove by index of node', () => {
    minHeap.removeByIndex(3);
    expect(minHeap.printArray()).toStrictEqual([4, 11, 14, 67, 21]);
  });

  test('should be empty after polling all nodes', () => {
    minHeap.poll();
    minHeap.poll();
    minHeap.poll();
    minHeap.poll();
    minHeap.poll();
    expect(minHeap.isEmpty()).toBeTruthy();
  });
});
