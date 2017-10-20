class Machine {
  constructor(type, learning_rate, weight0, weight1, dataset) {
    this.type = type
    this.rate = learning_rate
    this.weight0 = weight0
    this.weight1 = weight1
    //this.dataset = {y: this.standardize(dataset.y),x: dataset.x}
    this.dataset = dataset
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

  standardize(dataset) {
    let standardMin = 0
    let standardMax = 1000
    let dataMin = Math.min.apply(null, dataset)
    let dataMax = Math.max.apply(null, dataset)
    console.log("dataset min and max: "+dataMin, dataMax);
    let standardized = []
    for (var i = 0; i < dataset.length; i++) {
      standardized.push(((standardMax - standardMin) * (dataset[i] - dataMin)) / (dataMax - dataMin) + standardMin)
      if (i == dataset.length - 1) return standardized
    }
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
  cost() {
    return (1 / (2 * this.dataset.x.length) * Math.pow(this.diffs(), 2))
  }
  dcost_w0() {
    return (1 / this.dataset.x.length) * this.diffs()
  }
  dcost_w1() {
    return (1 / this.dataset.x.length) * this.diffs(true)
  }
  minimize() {
    this.weight0 = this.weight0 - this.rate * this.dcost_w0()
    this.weight1 = this.weight1 - this.rate * this.dcost_w1()
    return {w0: this.weight0, w1: this.weight1}
  }
}

let plotData = [], vars = []
let div
let fetchData = type => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
        xhr.open("GET", `/api/${type}`)
  			xhr.responseType = "json"
        xhr.onload = () => {
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            if (typeof xhr.response.error != "undefined") reject(xhr.response)
            else resolve(xhr.response)
          }
        }
  			xhr.send()
  })
}

let addData = type => {
  if (vars.indexOf(type) > -1) return false
  fetchData(type).then(data => {
    plotData.push(data)
    vars.push(type)
    Plotly.newPlot(div, plotData)
  }).catch(err => {
    console.log(err)
  })
}


window.onload = () => {
  div = document.getElementById('plot')
  div.style.width = "100%"
  div.style.height = "100%"
  div.style.resize = "both"
  div.style.overflow = "auto"
/*
  let markers = {
    x: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,253,254,255,256,257,258,259,260,261,262,263,264,265,266,267,268,269,270,271,272,273,274,275,276,277,278,279,280,281,282,283,284,285,286,287,288,289,290,291,292,293,294,295,296,297,298,299,300,301,302,303,304,305,306,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,334,335,336,337,338,339,340,341,342,343,344,345,346,347,348,349,350,351,352,353,354,355,356,357,358,359,360,361,362,363,364,365,366,367,368,369,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,394,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,413,414,415,416,417,418,419,420,421,422,423,424,425,426,427,428,429,430,431,432,433,434,435,436,437,438,439,440,441,442,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,460,461,462,463,464,465,466,467,468,469,470,471,472,473,474,475,476,477],
    y: [180,160,150,150,190,260,230,30,30,160,70,70,20,-10,-60,-80,-10,-110,-80,-80,-30,0,-30,-70,-90,-40,10,10,-20,-60,-70,-110,-130,-10,-40,-10,-20,-50,-30,10,20,40,-10,0,20,30,20,-10,30,150,180,210,170,140,240,280,270,290,290,350,340,270,220,190,190,210,190,20,20,240,290,30,310,30,310,320,350,380,360,360,330,30,230,230,210,180,190,150,180,150,140,80,10,80,30,-70,-10,-80,-140,-10,-90,-20,-10,70,80,140,240,360,450,490,530,50,460,420,450,440,430,420,410,360,270,220,220,240,230,240,250,240,240,270,260,250,290,370,40,390,40,390,390,40,420,370,340,350,370,330,330,310,310,350,340,33,310,320,350,360,320,330,340,350,340,270,210,210,230,260,280,260,290,30,280,270,270,310,370,380,370,40,390,40,350,360,340,340,360,360,310,310,310,270,270,30,340,370,390,420,420,40,390,380,370,40,410,40,370,360,360,340,310,30,290,30,290,290,270,250,250,240,220,220,220,240,220,180,150,140,140,170,160,210,220,210,20,20,180,180,20,20,20,190,20,180,160,160,150,170,220,250,290,320,320,350,360,370,370,360,380,350,340,370,390,430,440,430,440,430,470,510,510,520,510,480,440,430,440,440,450,480,480,470,490,490,50,50,50,490,470,460,430,460,490,490,460,460,40,40,470,530,510,520,580,580,520,620,650,650,690,680,60,550,570,550,570,60,610,620,620,590,590,590,670,650,670,70,650,650,630,650,680,70,70,730,670,690,730,710,680,660,740,710,690,670,610,620,640,580,540,520,570,580,470,440,40,390,450,430,450,460,470,470,440,460,490,490,580,630,630,60,60,830,820,930,950,950,940,890,780,780,860,90,930,820,850,820,830,730,790,890,990,1020,950,970,940,90,100,1050,1140,120,1270,1140,1130,1120,1220,1190,1210,1220,130,1220,1180,110,1030,1130,1180,1290,1280,1330,1360,140,1320,1380,140,1470,1530,1610,1510,140,1360,1480,1450,1440,1430,1440,1410,1440,1430,1370,1540,1560,1560,140,1440,1520,1530,1440,150,1530,1510,1590,1520,1570,1630,1690,1680,1560,1550,1570,1520,1470,1550,1550,1570,1550,1620,1640,1670,1650,1590,1630,1710,1770,1950,2080,2290,2270,2240,2370,2440],
    type: "scatter",
    mode: "markers"
  }*/

  let markers = {
    x: [1, 2, 3, 4, 5, 6, 7],
    y: [32.5, 45.6, 66.5, 77, 90, 140, 170],
    type: "scatter",
    mode: "markers"
  }

  let draw = () => {
    let data = {
      x: [],
      y: [],
      type: "scatter",
      mode: "lines"
    }
    for (let i = 1; i <= markers.x.length; i++) {
      data.y.push(m1.hypothesis(i))
      data.x.push(i)
      if (i == markers.x.length) {
        Plotly.newPlot(div, [data, markers])
      }
    }
  }

  let m1 = new Machine("local", 0.1, 50, 30, markers)

  let trainButton = document.querySelector("#train")
  let hypothInput = document.querySelector("#calc")
  let hypothOutput = document.querySelector("#output")
  let addInput = document.querySelector('#add')
  let clear = document.querySelector('#clear')

  addInput.addEventListener('keypress', e => {
    if (e.which == 13) addData(addInput.value)
  })
  let int, training = false
  trainButton.addEventListener('click', () => {
    if (training) {
      training = false
      trainButton.innerHTML = "Train"
      clearInterval(int)
    } else {
      training = true
      trainButton.innerHTML = "stop"
      int = setInterval(() => {
        m1.minimize()
        draw()
        hypothOutput.innerHTML = `
         <br>w0 slope: ${m1.dcost_w0()}, w0 value: ${m1.weight0} <br>
        w1 slope: ${m1.dcost_w1()}, w1 value: ${m1.weight1} <br>
        total cost: ${m1.cost()}
        `
      }, 10)
    }
  })

  hypothInput.addEventListener('keypress', e => {
    if (e.which == 13) hypothOutput.innerHTML = m1.hypothesis(hypothInput.value)
  })

  clear.addEventListener('click', () => {
    plotData.splice(0, plotData.length)
    vars.splice(0, vars.length)
    Plotly.newPlot(div, plotData)
  })
}
