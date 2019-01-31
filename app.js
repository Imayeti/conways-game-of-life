





new Vue ({

  el: '#gameboard',


  data: {
    gotime: false,
    k: 0,
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
    start: function () {
      console.log("hello im here")

    },

    mouseOver: function(){
           this.active = !this.active;
       },

    showByNumber: function(i){
      if (this.showByIndex == 1){
        return true;
      }
    },

    renderBoard: function() {

    },
    clickHandler: function() {
      this.gotime = true;
      this.toggleButton();
      this.createBoard();
    },

    toggleButton: function() {
      // if (button == "START"){
      //
      // }

      this.button == "START" ? this.button = "STOP" : this.button = "START";
    },

    originalBoard: function() {
    console.log('hi there');
      for (let i = 1; i <= 10; i++ ){
        var node = document.createElement("div");
        node.classList.add("gridStylingLine", "inlineit", "flex-center", "p-0",  "m-0");
        document.getElementById("original").appendChild(node);
        for (let j = 1; j <= 10; j++ ){
          var square = document.createElement("div");
          square.classList.add("gridStyling", "border", "inlineit");
          node.appendChild(square);
          square.id = this.k;

          // square.onclick = function(this.id) {console.log(id
          let vue = this;
            square.onclick = function() {
              // console.log("edit board");

              this.classList.add("blackBackground");
              let numTwo = 0;
              let numOne = 0;

              if(!this.id[1]){
                numOne = 0;
                numTwo = this.id;
              }else{
                numTwo = this.id[1];
                numOne = this.id[0]

              }
              console.log("num one", numOne, numTwo);



                // console.log("edit board");
                if(vue.boardArray[numOne][numTwo] == 0){
                  vue.boardArray[numOne][numTwo] = 1;
                }else{
                  vue.boardArray[numOne][numTwo] = 0;
                }

              console.log(vue.boardArray);





            };
          this.k++;
        }
      }
    },

    editBoard: function(square){
      console.log("edit board");
      if (square == 1){
        if(this.boardArray[0][0] == 0){
        this.boardArray[0][0] = 1;
      }else{
        this.boardArray[0][0] = 0;
      }
      }
      console.log(this.boardArray);
    },



    createBoard: function() {

      console.log(this.boardArray);

      if (this.button == "START"){
        return;
      }


      // console.log("this is before the loop")
      // console.log(this.boardArray)
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
        // console.log("at location" + i + "-" + j + "this location has" + neighbors + "neighbors")
        //
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
        // console.log('the board array', this.boardArray);


        // console.log(this.stopit);
        // if (this.stopit == false){
        //   this.stopit = true;
        //   this.createBoard();
        //
        // }else{
        //   console.log('stopped');
        // }
        let vue = this;
        setTimeout(function(){
          if (vue.stopit == false){
            vue.createBoard();
          }
        },this.speed)
  },

    showIt: function(i){
        // console.log("hello im here")
      if (i == 1){
        this.showByIndex = 1;
      }
    },

    stop: function(){
      this.stopit = !this.stopit;
    }
  },

  computed: {
  classObject: function () {
    this.boxNum++;
    return this.boxNum;

  }
}

});

function highlightSquare(id){
  console.log(id);

}




let k = 1;

// function originalBoard(){
// console.log('hi there');
//   for (let i = 1; i <= 10; i++ ){
//     var node = document.createElement("div");
//     node.classList.add("gridStylingLine", "inlineit", "flex-center", "p-0",  "m-0");
//     document.getElementById("original").appendChild(node);
//     for (let j = 1; j <= 10; j++ ){
//       var square = document.createElement("div");
//       square.classList.add("gridStyling", "border", "inlineit");
//       node.appendChild(square);
//       square.id = k;
//       // square.onclick = function(this.id) {console.log(id
//         square.onclick = function() {
//           this.classList.add("blackBackground");
//
//           console.log(this.id); };
//       k++;
//     }
//   }
// }
