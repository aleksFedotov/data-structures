class HeapNode {
  priority: number;
  value: any;
  constructor(priority, value) {
    this.priority = priority;
    this.value - value;
  }
}

export class MinHeap {
  data: HeapNode[] | null;
  size: number;
  constructor() {
    this.data = [];
    this.size = 0;
  }

  #getLeftChildIndex(parentInd: number): number {
    return 2 * parentInd + 1;
  }

  #getRightChildIndex(parentInd: number): number {
    return 2 * parentInd + 2;
  }

  #getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  #hasLeftChild(index: number): boolean {
    return this.#getLeftChildIndex(index) < this.size;
  }
  #hasRigthtChild(index: number): boolean {
    return this.#getRightChildIndex(index) < this.size;
  }

  #hasParent(index: number): boolean {
    return this, this.#getParentIndex(index) >= 0;
  }

  #leftChild(index: number): HeapNode {
    return this.data[this.#getLeftChildIndex(index)];
  }

  #rightChild(index: number): HeapNode {
    return this.data[this.#getRightChildIndex(index)];
  }

  #parent(index: number): HeapNode {
    return this.data[this.#getParentIndex(index)];
  }

  #swap(index1: number, index2: number): void {
    [this.data[index1], this.data[index2]] = [
      this.data[index2],
      this.data[index1],
    ];
  }

  peek(): HeapNode | null {
    if (this.size === 0) return null;

    return this.data[0];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  poll(): HeapNode {
    if (this.size === 0) return null;
    const item = this.data[0];
    this.data[0] = this.data.pop();
    this.size--;
    this.heapifyDown(0);
    return item;
  }

  add(priority, value = null): void {
    const newNode = new HeapNode(priority, value);
    this.data.push(newNode);
    this.size++;
    this.heapifyUp(this.size - 1);
  }

  removeByIndex(index: number) {
    const newSmallest: HeapNode = new HeapNode(this.peek().priority - 1, null);
    this.data[index] = newSmallest;
    this.heapifyUp(index);
    this.poll();
  }

  printArray() {
    const arr = [];
    for (let i = 0; i < this.size; i++) {
      arr.push(this.data[i].priority);
    }
    return arr;
  }

  heapifyUp(ind: number) {
    let index: number = ind;
    while (
      this.#hasParent(index) &&
      this.#parent(index).priority > this.data[index].priority
    ) {
      this.#swap(this.#getParentIndex(index), index);
      index = this.#getParentIndex(index);
    }
  }

  heapifyDown(ind: number) {
    let index: number = ind;
    while (this.#hasLeftChild(index)) {
      let smallerChildIndex: number = this.#getLeftChildIndex(index);
      if (
        this.#hasRigthtChild(index) &&
        this.#rightChild(index).priority < this.#leftChild(index).priority
      ) {
        smallerChildIndex = this.#getRightChildIndex(index);
      }

      if (this.data[index].priority < this.data[smallerChildIndex].priority) {
        break;
      } else {
        this.#swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}

export class MaxHeap {
  data: HeapNode[] | null;
  size: number;
  constructor() {
    this.data = [];
    this.size = 0;
  }

  #getLeftChildIndex(parentInd: number): number {
    return 2 * parentInd + 1;
  }

  #getRightChildIndex(parentInd: number): number {
    return 2 * parentInd + 2;
  }

  #getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  #hasLeftChild(index: number): boolean {
    return this.#getLeftChildIndex(index) < this.size;
  }
  #hasRigthtChild(index: number): boolean {
    return this.#getRightChildIndex(index) < this.size;
  }

  #hasParent(index: number): boolean {
    return this, this.#getParentIndex(index) >= 0;
  }

  #leftChild(index: number): HeapNode {
    return this.data[this.#getLeftChildIndex(index)];
  }

  #rightChild(index: number): HeapNode {
    return this.data[this.#getRightChildIndex(index)];
  }

  #parent(index: number): HeapNode {
    return this.data[this.#getParentIndex(index)];
  }

  #swap(index1: number, index2: number): void {
    [this.data[index1], this.data[index2]] = [
      this.data[index2],
      this.data[index1],
    ];
  }

  peek(): HeapNode | null {
    if (this.size === 0) return null;

    return this.data[0];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  poll(): HeapNode {
    if (this.size === 0) return null;
    const item = this.data[0];
    this.data[0] = this.data.pop();
    this.size--;
    this.heapifyDown(0);
    return item;
  }

  add(priority, value = null): void {
    const newNode = new HeapNode(priority, value);
    this.data.push(newNode);
    this.size++;
    this.heapifyUp(this.size - 1);
  }

  removeByIndex(index: number) {
    const newLargest: HeapNode = new HeapNode(this.peek().priority + 1, null);
    this.data[index] = newLargest;

    this.heapifyUp(index);

    this.poll();
  }

  printArray() {
    const arr = [];
    for (let i = 0; i < this.size; i++) {
      arr.push(this.data[i].priority);
    }
    return arr;
  }

  heapifyUp(ind: number) {
    let index: number = ind;

    while (
      this.#hasParent(index) &&
      this.#parent(index).priority < this.data[index].priority
    ) {
      this.#swap(this.#getParentIndex(index), index);
      index = this.#getParentIndex(index);
    }
  }

  heapifyDown(ind: number) {
    let index: number = ind;
    while (this.#hasLeftChild(index)) {
      let smallerChildIndex: number = this.#getLeftChildIndex(index);
      if (
        this.#hasRigthtChild(index) &&
        this.#rightChild(index).priority > this.#leftChild(index).priority
      ) {
        smallerChildIndex = this.#getRightChildIndex(index);
      }

      if (this.data[index].priority > this.data[smallerChildIndex].priority) {
        break;
      } else {
        this.#swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }
}

const maxHeap = new MinHeap();

maxHeap.add(11);

maxHeap.add(4);

maxHeap.add(67);

maxHeap.add(34);

maxHeap.add(21);
maxHeap.add(14);

maxHeap.add(3);

console.log(maxHeap.printArray());
maxHeap.poll();
console.log(maxHeap.printArray());

maxHeap.removeByIndex(3);
console.log(maxHeap.printArray());
