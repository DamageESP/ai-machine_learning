const math = require('mathjs')

class Machine {
  constructor(type, learning_rate, weight0, weight1, dataset, x) {
    this.type = type
    this.rate = learning_rate
    this.weight0 = weight0
    this.weight1 = weight1
    this.dataset = dataset
    this.x = x
  }
  sigmoid(x) {
    return 1 / (1 + Math.exp(-x))
  }
  dsigmoid(x) {
    return this.sigmoid(x) * (1 - this.sigmoid(x))
  }
  slope(x) {
    return 2 * (x - 4)
  }


  hypothesis(x) {
    return this.weight0 + this.weight1 * x
  }
  diffs(type2) {
    let diffs = 0
    for (let i = 0; i < this.dataset.x.length; i++) {
      type2 ? diffs += (this.hypothesis(this.dataset.x[i]) - this.dataset.y[i]) * this.dataset.x[i] : diffs += (this.hypothesis(this.dataset.x[i]) - this.dataset.y[i])
      if (i == this.dataset.x.length - 1) return diffs
    }
  }
  cost(x) {
    return (1 / (2 * this.dataset.x.length) * Math.pow(this.diffs(), 2))
  }
  dcost_w0(x) {
    return (1 / this.dataset.x.length) * this.diffs()
  }
  dcost_w1(x) {
    return (1 / this.dataset.x.length) * this.diffs(true)
  }
  minimize() {
    this.weight0 = this.weight0 - this.rate * this.dcost_w0(this.weight0)
    this.weight1 = this.weight1 - this.rate * this.dcost_w1(this.weight1)
    return {w0: this.weight0, w1: this.weight1}
  }
}

module.exports = Machine
