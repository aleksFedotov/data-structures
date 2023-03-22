class UF {
  parent: number[];
  count: number[];
  constructor(N: number) {
    this.parent = Array.from({ length: N }, (_, i) => i);
    this.count = new Array(N).fill(1);
  }

  find(x: number) {
    if (this.parent[x] != x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }

  union(x: number, y: number) {
    const xp = this.find(x),
      yp = this.find(y);
    if (xp == yp) return;

    if (this.count[xp] < this.count[yp]) {
      this.parent[xp] = yp;
      this.count[yp] += this.count[xp];
    } else {
      this.parent[yp] = xp;
      this.count[xp] += this.count[yp];
    }
  }
}
