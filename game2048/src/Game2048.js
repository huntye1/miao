class Game2048 {
  constructor(len = 4) {
    this.arr = Array(len).fill(0).map(it => Array(len).fill(0));
    this.gameOver = false;
  }

  compressBottom(col) {
    let r = this.arr.length - 1;
    for (let row = this.arr.length - 1; row >= 0; row--) {
      if (this.arr[row][col] !== 0) {
        let val = this.arr[row][col]
        this.arr[row][col] = 0;
        this.arr[r][col] = val;
        r--;
      }
    }
  }

  moveBottom() {
    for (let col = 0; col < this.arr.length; col++) {
      this.compressBottom(col);
      for (let row = this.arr.length - 1; row > 0; row--) {
        if (this.arr[row][col] !== 0 && this.arr[row][col] === this.arr[row - 1][col]) {
          this.arr[row][col] <<= 1;
          this.arr[row - 1][col] = 0;
        }
      }
      this.compressBottom(col);
    }
  }

  compressTop(col) {
    let r = 0;
    for (let row = 0; row < this.arr.length; row++) {
      if (this.arr[row][col] !== 0) {
        let val = this.arr[row][col];
        this.arr[row][col] = 0;
        this.arr[r][col] = val;
        r++;
      }
    }
  }

  moveTop() {
    for (let col = 0; col < this.arr.length; col++) {
      this.compressTop(col);
      for (let row = 0; row < this.arr.length - 1; row++) {
        if (this.arr[row][col] !== 0 && this.arr[row][col] === this.arr[row + 1][col]) {
          this.arr[row][col] <<= 1;
          this.arr[row + 1][col] = 0;
        }
      }
      this.compressTop(col);
    }
  }

  compressLeft(row) {
    let c = 0;
    for (let col = 0; col < this.arr.length; col++) {
      if (this.arr[row][col] !== 0) {
        let val = this.arr[row][col];
        this.arr[row][col] = 0;
        this.arr[row][c] = val;
        c++;
      }
    }
  }

  moveLeft() {
    for (let row = 0; row < this.arr.length; row++) {
      this.compressLeft(row);
      for (let col = 0; col < this.arr.length - 1; col++) {
        if (this.arr[row][col] !== 0 && this.arr[row][col] === this.arr[row][col + 1]) {
           this.arr[row][col] <<= 1;
          this.arr[row][col + 1] = 0;
        }
      }
      this.compressLeft(row);
    }
  }

  compressRight(row) {
    let c = this.arr.length - 1;
    for (let col = this.arr.length - 1; col >= 0; col--) {
      if (this.arr[row][col] !== 0) {
        let val = this.arr[row][col]
        this.arr[row][col] = 0;
        this.arr[row][c] = val;
        c--;
      }
    }
  }

  moveRight() {
    for (let row = 0; row < this.arr.length ; row++) {
      this.compressRight(row);
      for (let col = this.arr.length - 1; col >= 0; col--) {
        if (this.arr[row][col] !== 0 && this.arr[row][col] === this.arr[row][col - 1]) {
          this.arr[row][col] <<= 1;
          this.arr[row][col - 1] = 0;
        }
      }
      this.compressRight(row);
    }
  }

  randomBlock(seed = 0.3) {
    let spaces = [];
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length; j++) {
        if (this.arr[i][j] === 0) {
          spaces.push([i, j]);
        }
      }
    }
    if (spaces.length === 0) {
      this.gameOver = true;
      return false;
    }

    let idx = Math.floor(Math.random() * spaces.length);
    let [i, j] = spaces[idx];
    this.arr[i][j] = Math.random() > seed ? 2 : 4;
    return this.arr;
  }
  
  getBoard() {
    console.log(this.arr.join("\n"));
    return this.arr;
  }
}

export default Game2048;