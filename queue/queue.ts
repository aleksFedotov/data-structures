class QueueNode {
  value: number | string;
  next: null | QueueNode;
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export default class Queue {
  first: null | QueueNode;
  last: null | QueueNode;
  length: number;
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  peek() {
    return this.first ? this.first.value : null;
  }

  enqueue(value) {
    const newNode = new QueueNode(value);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    this.length++;
  }

  dequeue() {
    if (!this.first) {
      return null;
    }

    if (this.last === this.first) {
      this.last = null;
    }
    const holdingPointer = this.first;
    this.first = this.first.next;
    this.length--;
    return holdingPointer;
  }

  isEmpty() {
    return this.length === 0;
  }

  printQueue() {
    const arr: any[] = [];
    if (!this.first) return arr;
    let currentNode = this.first;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return arr;
  }
}
