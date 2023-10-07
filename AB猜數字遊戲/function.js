$(() => {

    var digits, answer;

    function newGame() {
        digits = $("select").val();
        $("#value").html(digits);
        $("textarea").html("");
        $("#player-guess").prop("disabled", false);
        answer = randomAns(digits);
    }

    function randomAns(digits) {
        // 不能重複
        let answer = [];
        while (answer.length != digits) {
            let random = Math.floor(Math.random()*10);  // 產生個位數
            if (!answer.includes(random)) answer.push(random);
        }
        console.log("randomAns: ", answer);
        return answer.join("");
    }

    function check() {
        if ($("#player-guess").prop("disabled")) {
            alert("請先點選「新局」");
            return;
        }

        let input = $("#player-guess").val();
        if (input.length != digits) {
            $("#disallow").html("數字個數不一致").css("color", "red");
        } else if (isNaN(parseInt(input)))  {
            $("#disallow").html("需輸入數字").css("color", "red");
        }else {
            $("#disallow").html("");
            let result = checkAns(input, answer);
            $("textarea").html().length == 0 ? $("textarea").append(input + " ==> " + result) : $("textarea").append("\n" + input + " ==> " + result);
        }
    }

    function checkAns(input, answer) {
        let A = B = 0;
        for (let i=0; i<digits; i++) {
            if (input[i] == answer[i]) A++;
            if (input.includes(answer[i])) B++;
        }
        if (A == digits) alert("恭喜答對!");
        return A+"A"+(B-A)+"B";
    }

    $("#new-game").click(newGame);
    $("#ok").click(check);
    $("show-answer").click(() => {
        alert("正確答案: " + answer.join(""));
    })
})