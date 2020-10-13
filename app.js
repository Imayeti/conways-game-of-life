





new Vue ({

  el: '#gameboard',

  data: {
    pointer: true,
    gotime: false,
    boxNum: 0,
    button: "START",
    speed: 300,
    stopit: false,
    first: true,
    ticks: 0,
    active: false,
    neighbors: 0,
    showByIndex: null,

    boardArray: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],

    theNextArray: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


  },

  methods: {

    clickHandler: function() {
      this.gotime = true;
      this.toggleButton();
      this.createBoard();
    },

    toggleButton: function() {
      this.button == "START" ? this.button = "STOP" : this.button = "START";
    },

    originalBoard: function() {
      for (let i = 1; i <= 10; i++ ){
        var node = document.createElement("div");
        node.classList.add("gridStylingLine", "inlineit", "flex-center", "p-0",  "m-0");
        document.getElementById("original").appendChild(node);
        for (let j = 1; j <= 10; j++ ){
          var square = document.createElement("div");
          square.classList.add("gridStyling", "border", "inlineit", "pointer");
          node.appendChild(square);

          square.setAttribute('data-column', j-1);
          square.setAttribute('data-row', i-1);
          let vue = this;
          square.onclick = function() {
            vue.pointer = false;

            if(vue.boardArray[this.getAttribute('data-row')][this.getAttribute('data-column')] === 0){
              this.classList.add("blackBackground");
              vue.boardArray[this.getAttribute('data-row')][this.getAttribute('data-column')] = 1;
            }else{
              this.classList.remove("blackBackground");
              vue.boardArray[this.getAttribute('data-row')][this.getAttribute('data-column')] = 0;
            }

          };
        }
      }
    },

    createBoard: function() {
      if (this.button == "START"){
        return;
      }

      this.ticks += 1

      let neighbors = 0;
      for (let i = 0; i < this.boardArray[0].length; i++){
        for (let j = 0; j < this.boardArray[0].length; j++){
          for (let t = j-1; t <= j+1; t++){
            if(this.boardArray[i-1]){
              if (this.boardArray[i-1][t] == 1){
                neighbors += 1
              }
            }
            if (this.boardArray[i][t] == 1){
              neighbors += 1
            }
            if(this.boardArray[i+1]){
              if (this.boardArray[i+1][t] == 1){
                neighbors += 1
              }
            }
          }
          if (this.boardArray[i][j] === 1){
            neighbors -= 1;

            if (neighbors < 2){
              this.theNextArray[i][j] = 0
            }
            if (neighbors === 2 || neighbors === 3){
              this.theNextArray[i][j] = 1
            }

            if (neighbors > 3){
              this.theNextArray[i][j] = 0
            }
          }else if (this.boardArray[i][j] === 0){
            if (neighbors === 3){
              this.theNextArray[i][j] = 1
            }else{
              this.theNextArray[i][j] = 0
            }
          }
           neighbors = 0

          }
        }

        this.boardArray = this.theNextArray;
        this.theNextArray = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

        let vue = this;
        setTimeout(function(){
          if (vue.stopit == false){
            vue.createBoard();
          }
        },this.speed)
  },


    stop: function(){
      this.stopit = !this.stopit;
    }
  },

  mounted: function(){
    this.originalBoard()
  },

  computed: {
    classObject: function () {
      this.boxNum++;
      return this.boxNum;
    }
  }

});
