import LinkedList from '../linked-list/linkedList';

class HashTable {
  size: number;
  data: LinkedList[];
  constructor(size) {
    this.data = new Array<LinkedList>(size);
  }

  #hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i) * i) % this.data.length;
    }
    return hash;
  }

  set(key, value) {
    const address = this.#hash(key.toString());
    if (!this.data[address]) {
      this.data[address] = new LinkedList();
    }
    this.data[address].append([key, value]);
    return this.data;
  }

  get(key) {
    const address = this.#hash(key.toString());
    if (!this.data[address]) return;
    const data = this.data[address].findHashTable(key);
    return data;
  }
}
