$(document).ready( function() {

    var count = 0;
    var p1Win = 0;
    var p2Win = 0;
    var tie = 0;

    $("#btn1").click( function() {
        $("#board").css("display", "flex");
        $("#btn2").css("display", "inline-block");
        $(".wincount").each( function() {
            $(this).css("display", "block");
        })
        if ($(this).text() == "Click To Play") {
            $(this).text("Player 1's Turn");
        }
        else if ($(this).text() == "Reset Board") {
            $(".square").each( function() {
                $(this).text("");
                $(this).css("background-image", "none")
                $(this).css("pointer-events","initial");
            });
            $(this).text("Player 1's Turn");
            count = 0;
        }
    });

    $("#btn2").click( function() {
        p1Win = 0;
        p2Win = 0;
        tie = 0;
        $("#win1").text("Player 1 Score: 0");
        $("#win2").text("Player 2 Score: 0");
        $("#tie").text("Ties: 0");
    })

    $(".square").click( function() {
        if ($("#btn1").text() == "Player 1's Turn") {
            $(this).css("background-image", "url('x.png')");
            $(this).text("x");
            $(this).css("pointer-events","none");
            $("#btn1").text("Player 2's Turn");
        }
        else {
            $(this).css("background-image", "url('o.png')");
            $(this).text("o");
            $(this).css("pointer-events","none");
            $("#btn1").text("Player 1's Turn");
        }
        count++;
        var classList = document.getElementById(this.id).className.split(/\s+/);
        if (checkWin(classList[1], classList[2])) {
            if (count % 2 == 0) {
                p2Win++;
                $("#win2").text("Player 2 Score: " + p2Win);
                alert("Player 2 Wins!");
            }
            else {
                p1Win++;
                $("#win1").text("Player 1 Score: " + p1Win);
                alert("Player 1 Wins!");
            }
            $(".square").each( function() {
                $(this).css("pointer-events", "none");
            });
            $("#btn1").text("Reset Board");
        }
        else if (count == 9) {
            tie++;
            $("#tie").text("Ties: " + tie);
            alert("It's A Tie!");
            $("#btn1").text("Reset Board");
        }
    });

    function checkWin(c1, c2) {
        let row = document.getElementsByClassName(c1);
        let col = document.getElementsByClassName(c2);
        if (row[0].innerHTML == row[1].innerHTML && row[0].innerHTML == row[2].innerHTML && row[0] != "") {
            return true;
        }
        else if (col[0].innerHTML == col[1].innerHTML && col[0].innerHTML == col[2].innerHTML && col[0] != "") {
            return true;
        }
        else if ((c1 == "r0" && c2 == "s0") || (c1 == "r0" && c2 == "s2") || (c1 == "r1" && c2 == "s1") || (c1 == "r2" && c2 == "s0") || (c1 == "r2" && c2 == "s2")) {
            if (($("#r0s0").text() == $("#r1s1").text() && $("#r0s0").text() == $("#r2s2").text() && $("#r0s0").text() != "") || $("#r0s2").text() == $("#r1s1").text() && $("#r0s2").text() == $("#r2s0").text() && $("#r0s2").text() != "") {
                return true;
            }
        }
        else {
            return false;
        }
    }

});