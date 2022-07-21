class QueueNode {
  value: number;
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

  printQueue() {
    const arr: number[] = [];
    if (!this.first) return arr;
    let currentNode = this.first;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return arr;
  }
}

const queue = new Queue();

queue.enqueue(4);
queue.enqueue(1);
queue.enqueue(78);
console.log(queue.printQueue());
queue.dequeue();

console.log(queue.printQueue());
