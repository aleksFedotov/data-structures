class StackNode {
  value: number | string;
  next: null | StackNode;
  constructor(value: number) {
    this.value = value;
    this.next = null;
  }
}

export default class Stack {
  top: null | StackNode;
  bottom: null | StackNode;
  length: number;
  constructor() {
    this.top = null;
    this.bottom = null;
    this.length = 0;
  }

  peek() {
    return this.top ? this.top.value : null;
  }

  push(value: number) {
    const newNode = new StackNode(value);
    if (this.length === 0) {
      this.top = newNode;
      this.bottom = newNode;
    } else {
      newNode.next = this.top;
      this.top = newNode;
    }
    this.length++;
    return;
  }

  pop() {
    if (!this.top) return null;
    if (this.top == this.bottom) {
      this.bottom = null;
    }
    const holdingPointer = this.top;
    this.top = this.top.next;
    this.length--;
    return holdingPointer;
  }

  isEmpty() {
    return this.length === 0;
  }

  printStack() {
    const arr: any[] = [];
    if (!this.top) return arr;
    let currentNode: null | StackNode = this.top;
    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return arr.reverse();
  }
}
