var choices = ['rock', 'paper', 'scissors'];
playerScore = 0;
cpuScore = 0;
ties = 0;

function checkWin(p,c) {
    if (p == "rock") {
        if (c == "paper") {
            return "cpu";
        }
        else if (c == "scissors") {
            return "player";
        }
        else {
            return "tie";
        }
    }
    else if (p == "paper") {
        if (c == "paper") {
            return "tie";
        }
        else if (c == "scissors") {
            return "cpu";
        }
        else {
            return "player";
        }
    }
    else if (p == "scissors") {
        if (c == "paper") {
            return "player";
        }
        else if (c == "scissors") {
            return "tie";
        }
        else {
            return "cpu";
        }
    }
}

function animation(p,c) {

    $("#options").fadeOut(500);

    let pUrl = "url(imgs/" + p + ".png)";
    let cUrl = "url(imgs/" + c + ".png)";
    $("#animated-player").css("background-image", pUrl);
    $("#animation").delay(500).fadeIn(500);

    $(".empty").delay(250).slideDown(500);
    $("#rock-text").delay(250).fadeIn(500);
    $(".empty").slideUp(500);

    $(".empty").delay(250).slideDown(500);
    $("#paper-text").delay(1750).fadeIn(500);
    $(".empty").slideUp(500);

    $(".empty").delay(250).slideDown(500);
    $("#scissors-text").delay(2750).fadeIn(500);
    $(".empty").slideUp(500);

    $(".empty").delay(250).slideDown(500);
    $("#animated-cpu").delay(4250).queue(function () {
        $(this).css("background-image", cUrl);
        $(this).dequeue();
    });
    $("#shoot-text").delay(4000).fadeIn(500);


}

function game(player) {

    let cpu = choices[Math.floor(Math.random()*3)];
    console.log(player + " v " + cpu);

    animation(player, cpu);

    let winner = checkWin(player, cpu);

    if (winner == "tie") {
        ties++;
    }
    else if (winner == "player") {
        playerScore++;
    }
    else if (winner == "cpu") {
        cpuScore++;
    }

    let total = playerScore + cpuScore + ties;
    let p1Width = Math.round((playerScore/total)*10000) / 100;
    let p2Width = Math.round((cpuScore/total)*10000) / 100;
    let tieWidth = 100 - (p1Width + p2Width);

    $(document).delay(4250).queue(function () {
        $('#s1').css("width", p1Width + "%");
        $('#s2').css("width", p2Width + "%");
        $('#s3').css("width", tieWidth + "%");
        $('#playerScore').text(playerScore);
        $('#cpuScore').text(cpuScore);
        $('#ties').text(ties);

        resetGame();

        $(this).dequeue();

    });
}

function resetGame() {
    $("#animation").delay(1500).fadeOut();
    $("#rock-text").delay(1500).fadeOut();
    $("#paper-text").delay(1500).fadeOut();
    $("#scissors-text").delay(1500).fadeOut();
    $("#shoot-text").delay(1500).fadeOut();
    $("#animated-cpu").delay(1500).queue(function () {
        $(this).css("background-image", "url(imgs/question_mark.png)");
        $(this).dequeue();
    });
    $(".empty").delay(1500).slideUp();
    $("#options").delay(1500).fadeIn();
}