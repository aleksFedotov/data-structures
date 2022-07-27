import Graph from '../graph';

const graph = new Graph();
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(5, 2);
graph.addEdge(6, 3);
graph.addEdge(7, 3);
graph.addEdge(8, 4);
graph.addEdge(9, 5);
graph.addEdge(10, 6);

test('Breadth-first search', () => {
  expect(graph.bfs(1)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('Depth-first search iterative', () => {
  expect(graph.dfsIterative(1)).toStrictEqual([1, 4, 8, 3, 7, 6, 10, 2, 5, 9]);
});
test('Depth-first search recursive', () => {
  expect(graph.dfsRecursive(1)).toStrictEqual([1, 2, 5, 9, 3, 6, 10, 7, 4, 8]);
});
