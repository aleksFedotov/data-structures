import Queue from '../queue/queue';
import Stack from '../stack/stack';

export default class Graph {
  adjacencyList: {};
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.addVertex[vertex] = [];
    }
  }

  addEdge(source, destination) {
    if (!this.adjacencyList[source]) this.adjacencyList[source] = [];
    if (!this.adjacencyList[destination]) this.adjacencyList[destination] = [];

    this.adjacencyList[source].push(destination);
    this.adjacencyList[destination].push(source);
  }

  removeEdge(source, destination) {
    if (!this.adjacencyList[source] || !this.adjacencyList[destination]) return;
    this.adjacencyList[source] = this.adjacencyList[source].filter(
      (item) => item !== destination
    );
    this.adjacencyList[destination] = this.adjacencyList[destination].filter(
      (item) => item !== source
    );
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex]) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }

    delete this.adjacencyList[vertex];
  }

  printGraph() {
    const vertices = Object.keys(this.adjacencyList);
    for (let i = 0; i < vertices.length; i++) {
      const destinations = this.adjacencyList[vertices[i]];
      let conc = '';
      for (let conection of destinations) {
        conc += ' ' + conection;
      }
      console.log(vertices[i] + ' --> ' + conc);
    }
  }

  bfs(start) {
    const queue = new Queue();
    const result = [];
    const visited = {};
    queue.enqueue(start);
    visited[start] = true;

    while (!queue.isEmpty()) {
      const currentVertex = queue.dequeue();
      result.push(currentVertex.value);
      this.adjacencyList[currentVertex.value].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.enqueue(neighbor);
        }
      });
    }
    return result;
  }

  dfsIterative(start) {
    const stack = new Stack();
    const result = [];
    const visited = {};
    stack.push(start);
    visited[start] = true;

    while (!stack.isEmpty()) {
      const currentVertex = stack.pop();
      result.push(currentVertex.value);
      this.adjacencyList[currentVertex.value].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  dfsRecursive(start) {
    const visited = {};
    const result = [];

    const dfs = (vertex) => {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      this.adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    };
    dfs(start);
    return result;
  }
}
