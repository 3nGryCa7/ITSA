$(() => {
    var lastBtn = $("#last");
    var nextBtn = $("#next");
    var submitBtn = $("#submit");

    var titles = ["第一題?", "第二題?", "第三題?"];
    var currentPage = 0;

    var answers = [1, 4, 3];
    var userAns = [0, 0, 0];

    function changePage(currentPage) {
        $("h2.title").text(titles[currentPage]);

        if (currentPage == 0) {
            $("#last").addClass("hidden");
        } else {
            $("#last").removeClass("hidden");
        }

        if (currentPage == 2) {
            $("#submit").removeClass("hidden");
            $("#next").addClass("hidden");
        } else {
            $("#submit").addClass("hidden");
            $("#next").removeClass("hidden");
        }

        $("div.answer").addClass("hidden");
        $("div.answer").eq(currentPage).removeClass("hidden");
        
        (userAns[currentPage] !== 0) ? $(".answer").eq(currentPage).find("input")[userAns[currentPage]-1].click() : null;
    }

    function getAns() {
        if ($("input:checked").length > 0) {
            userAns[currentPage] = parseInt($("input:checked").val());
        }
    }

    function checkAns() {

        let rightAns = 0;

        userAns.forEach((value, index) => {
            if (value == answers[index]) {
                rightAns += 1;
                $(".answer").eq(index).addClass("right-ans");
            } else {
                $(".answer").eq(index).addClass("false-ans");
            }
        })

        $("<span>", {
            text: "答對題數: " + rightAns
        }).appendTo("main");
        $("<span>", {
            text: "總題數: " + $("div.answer").length
        }).appendTo("main");
    }

    
    changePage(currentPage);
    $("input").change(getAns);
    lastBtn.click(function() {
        currentPage -= 1;
        changePage(currentPage);
    });
    nextBtn.click(function() {
        currentPage += 1;
        changePage(currentPage);
    });
    submitBtn.click(checkAns);
})