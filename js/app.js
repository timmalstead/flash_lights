const $level = $("#level")

const $round = $("#round")

const $lives = $("#lives")

const pattern = []

let patternCheck = []

let patternCheckCounter = 0

$("main").on("click", (e) => {

    const $arrayPosition = $(e.target).index()

    if (game.readyToClick === true) {
        game.checkInput($arrayPosition)
    }
})

const game = {

level : 1,

round : 1,

lives : 10,

openingModals : true,

readyToClick : false,

youLose : false,

setUpLevel() {

    $("main").empty()

    if (this.level === 1 && this.openingModals === true) {
        this.setTiles(4, "48", "46")
        setTimeout(() => {
            $(".animated").removeClass()
            this.openModal()
        }, 2000)
    }

    if (this.level === 1 && this.openingModals === false) {
        this.setTiles(4, "48", "46")
        setTimeout(() => {
            $(".animated").removeClass()
            this.displayRandomPattern()
        }, 2000)
    }

    else if (this.level === 2) {
        this.setTiles(8, "48", "23")
        setTimeout(() => {
            $(".animated").removeClass()
            this.openingModals = false
            this.displayRandomPattern()
        }, 3000)
    }

    else if (this.level === 3) {
        this.setTiles(16, "24", "23")
        setTimeout(() => {
            $(".animated").removeClass()
            this.openingModals = false
            this.displayRandomPattern()
        }, 5000)
    }

    $level.text(this.level)

    $round.text(this.round)

    $lives.text(this.lives)

    },

setTiles(numberOfTiles, width, height) { 
        
        let tileCounter = 0

        const boardInterval = setInterval(() => {
        if (tileCounter === numberOfTiles) {
            clearInterval(boardInterval)
        } else {

        const $tile = $(`<div/>`)

        const random = Math.floor(Math.random() * 4)

        if (random === 0) {
        $tile.css("backgroundColor", "#f5d84b")
        }

        else if (random === 1) {
            $tile.css("backgroundColor", "#e91a3c")
            }

        else if (random === 2) {
            $tile.css("backgroundColor", "#2b67c1")
            }

        else if (random === 3) {
            $tile.css("backgroundColor", "#31c462")
            }

        $tile.css("width", `${width}%`)

        $tile.css("height", `${height}%`)

        $tile.css("borderRadius", "15%")

        $tile.attr("class", "animated zoomIn")

        if (this.level === 3) {
            $tile.css("margin", "0 .4%")
        }

        else {
            $tile.css("margin", "0 1%")
        }

        $tile.hover(function(){
            $tile.css("opacity", ".5")
        }, function(){
            $tile.css("opacity", "1")
        })

        $("main").append($tile)

        tileCounter++
            }
        }, 250)
    },

displayRandomPattern() {
        let numberOfTiles = 0
        patternCheck = []
        if (this.level === 1) {
            numberOfTiles = 4
        }
        else if (this.level === 2){
            numberOfTiles = 8
        }
        else if (this.level === 3){
            numberOfTiles = 16
        }

        let flashNumber = Math.floor(Math.random() * numberOfTiles)

        for (let i = 0; i < flashNumber; i++){

            let random = Math.floor(Math.random() * numberOfTiles)

            pattern.push(random)
            patternCheck.push(random)
        }

        if (pattern.length === 0 && patternCheck.length === 0) {
            const backupRandom = Math.floor(Math.random() * numberOfTiles)
            pattern.push(backupRandom)
            patternCheck.push(backupRandom)
        }

        const patternInterval = setInterval(() => {
            if (pattern.length === 0 && this.openingModals === true) {
                clearInterval(patternInterval)
                this.openingModals = false
                this.secondModal()
                }

                else if (pattern.length === 0 && this.openingModals === false) 
                    {
                    clearInterval(patternInterval)
                    this.readyToClick = true
                }
                else {
                    if (pattern.length === 0) {
                        pattern[0] = 0
                    }
                $("div").eq(pattern[0]).attr("class", "animated zoomIn")
                setTimeout(() => $("div").removeClass(), 750)
                pattern.shift(0)
            }
        },  1000)
        console.log(patternCheck)
    },
openModal() {
        const $open = $("#openModal")
        setTimeout(() => {
            $open.attr("class", "animated bounceInDown")
            $open.css("display", "block")
        }, 1000)
        $open.removeClass()
        $open.on("click", () => {
            $open.attr("class", "animated bounceOutDown")
            setTimeout(() => $open.css("display", "none"), 1000)
            setTimeout(() => $open.removeClass(), 1000)
            setTimeout(() => $open.attr("class", "modal"), 1000)
            this.displayRandomPattern()
            })
    },
secondModal() {
        if (this.level === 1 && this.round === 1) {
        const $first = $("#firstTurn")
        setTimeout(() => {
            $first.attr("class", "animated bounceInUp")
            $first.css("display", "block")
        }, 1000)
        $first.removeClass()
        $first.on("click", () => {
            this.readyToClick = true
            $first.attr("class", "animated bounceOutUp")
            setTimeout(() => $first.css("display", "none"), 1000)
            setTimeout(() => $first.removeClass(), 1000)
            setTimeout(() => $first.attr("class", "modal"), 1000)
            this.firstRound = false
            setTimeout(() => $("div").attr("class", "readyToClick"), 1000)
            })
    }
},

finalModal() {
    if (this.youLose === true) {
    const $lose = $("#youLose")
    setTimeout(() => {
        $lose.attr("class", "animated bounceInRight")
        $lose.css("display", "block")
    }, 1000)
    $lose.removeClass()
    $lose.on("click", () => {
        $lose.attr("class", "animated bounceOutLeft")
        setTimeout(() => $lose.css("display", "none"), 1000)
        setTimeout(() => $lose.removeClass(), 1000)
        setTimeout(() => $lose.attr("class", "modal"), 1000)
        pattern.length = 0
        patternCheck = []
        patternCheckCounter = 0
        this.firstPlay = false
        this.level = 1
        this.round = 1
        this.lives = 10
        this.setUpLevel()
        })
    }
    if (this.youLose === false) {
        const $win = $("#youWin")
        setTimeout(() => {
            $win.attr("class", "animated bounceInLeft")
            $win.css("display", "block")
        }, 1000)
        $win.removeClass()
        $win.on("click", () => {
            $win.attr("class", "animated bounceOutRight")
            setTimeout(() => $win.css("display", "none"), 1000)
            setTimeout(() => $win.removeClass(), 1000)
            setTimeout(() => $win.attr("class", "modal"), 1000)
            pattern.length = 0
            patternCheck = []
            patternCheckCounter = 0
            this.firstPlay = false
            this.level = 1
            this.round = 1
            this.lives = 10
            this.setUpLevel()
            })
        }
},

checkInput(flashToCheck) {
    if (flashToCheck === patternCheck[patternCheckCounter]) {
        patternCheckCounter++
            if (patternCheckCounter === patternCheck.length) {
                this.round++
                $round.text(this.round)
                setTimeout(() => $("div").removeClass(), 1000)
                patternCheck = []
                patternCheckCounter = 0
                game.readyToClick = false
                if (this.round === 6){
                    this.level++
                    this.round = 1
                    pattern.length = 0
                    patternCheck = []
                    patternCheckCounter = 0
                    this.setUpLevel()
                }
                else if (this.level === 3 && this.round === 6) {
                    pattern.length = 0
                    patternCheck = []
                    patternCheckCounter = 0
                    this.finalModal()
                }
                else {
                    this.displayRandomPattern()
                }
            }
        }
    else {
        this.lives--
        $lives.text(this.lives)
        this.round++
        $round.text(this.round)
        game.readyToClick = false
        if (this.lives === 0){
            this.youLose = true
            game.readyToClick = false
            this.finalModal()
        } else {
            this.displayRandomPattern()
            }
        }
    }
}

game.setUpLevel()
   
$("main").on("click", (e) => {

    const $arrayPosition = $(e.target).index()

    if ($(e.target).hasClass("readyToClick")) {
        game.checkInput($arrayPosition)
    }
})

//add opening animation, see if you can't suss out shine effect from animate.css splash page
//add sounds?
//add backend for highscore?
//add social share?
//additional mechanics? I even wanna mess with that?
