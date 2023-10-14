$(() => {
    function toggleEye(event) {
      switch (event.target.id) {
        case "show-1":
          event.target.src = "./icons/hidden.png";
          event.target.id = "hide-1";
          $("#passwd-1").attr("type", "text");
          break;
        case "hide-1":
          event.target.src = "./icons/eye.png";
          event.target.id = "show-1";
          $("#passwd-1").attr("type", "password");
          break;
        case "show-2":
          event.target.src = "./icons/hidden.png";
          event.target.id = "hide-2";
          $("#passwd-2").attr("type", "text");
          break;
        case "hide-2":
          event.target.src = "./icons/eye.png";
          event.target.id = "show-2";
          $("#passwd-2").attr("type", "password");
          break;
      }
    }

    function checkPasswd(password) {
      if (password.length < 8) {
        return false;
      }
      let dic = {};
      password
        .split("")
        .forEach((item) => (dic[item] ? dic[item]++ : (dic[item] = 1)));

      return !Object.values(dic).some((ele) => ele > 1);
    }

    function ifSQLInjection(text) {
      text = text.toLowerCase();
      let limit = [
        "'",
        "#",
        "||",
        "&&",
        "!",
        "*",
        "select",
        "use",
        "drop",
        "delete",
        "from",
        "or",
        "and",
      ];

      return limit.find((item) => text.includes(item)) ? true : false;
    }

    function sameAsRegist() {
      if ($("#same-regist").prop("checked")) {
        $("#contact-address").val($("#regist-address").val());
      } else {
        $("#contact-address").val("");
      }
    }

    function checkEmail(email) {
      let parts = email.split("@");
      if (parts.length != 2) {
        return false;
      }

      let [account, host] = parts;
      let accountRegex = /^[a-zA-Z0-9_.]+$/;

      if (
        host.startsWith("_") ||
        host.startsWith(".") ||
        host.endsWith("_") ||
        host.endsWith(".")
      ) {
        return false;
      }

      if (host.split(".").length < 2) {
        return false;
      }

      if (email.includes("..")) {
        return false;
      }

      return accountRegex.test(account);
    }

    function passwdStrength(password) {
      let strength = 0;
      if (password.length > 12) {
        strength += 0.2;
      }
      if (/[0-9]/.test(password)) {
        strength += 0.2;
      }
      if (/[a-z]/.test(password)) {
        strength += 0.2;
      }
      if (/[A-Z]/.test(password)) {
        strength += 0.2;
      }
      if (/[~!@#$%^&*()_+-//{};:\[\]|`"']/.test(password)) {
        strength += 0.2;
      }
      return strength;
    }

    function sameText(text_1, text_2) {
      return text_1 == text_2;
    }

    $(".show-hide").on("click", function (event) {
      toggleEye(event);
    });

    function addWarn(event, text) {
      if ($(event).next(".warning-text").length == 0) {
        $(event).addClass("warning-input");
        $(event).after('<p class="warning-text"></p>');
        $(event).next(".warning-text").text(text);
      }
    }

    function deleteWarn(event) {
      $(event).next(".warning-text").remove();
      $(event).removeClass("warning-input");
    }

    function checkForm() {
      let error = 0;

      if (!($("#name").val() != "")) {
        $("#name").addClass("warning-input");
        error++;
      }
      if (ifSQLInjection($("#name").val())) {
        error++;
      }
      if ($("input[name=gender]:checked").length != 1) {
        error++;
      }
      if (!($("#date").val() != "")) {
        $("#date").addClass("warning-input");
        error++;
      } else {
        $("#date").removeClass("warning-input");
      }
      if (!($("#phone").val() != "")) {
        $("#phone").addClass("warning-input");
        error++;
      } else {
        $("#phone").removeClass("warning-input");
      }
      if (!($("#regist-address").val() != "")) {
        $("#regist-address").addClass("warning-input");
        error++;
      }
      if (ifSQLInjection($("#regist-address").val())) {
        error++;
      }
      if (!($("#contact-address").val() != "")) {
        $("#contact-address").addClass("warning-input");
        error++;
      }
      if (ifSQLInjection($("#contact-address").val())) {
        error++;
      }
      if (!($("#email-1").val() != "")) {
        $("#email-1").addClass("warning-input");
        error++;
      }
      if (!checkEmail($("#email-1").val())) {
        error++;
      }
      if (!($("#email-2").val() != "")) {
        $("#email-2").addClass("warning-input");
        error++;
      }
      if (!checkEmail($("#email-2").val())) {
        error++;
      }
      if (!($("#passwd-1").val() != "")) {
        $("#passwd-1").addClass("warning-input");
        error++;
      }
      if (!checkPasswd($("#passwd-1").val())) {
        error++;
      }
      if (!($("#passwd-2").val() != "")) {
        $("#passwd-2").addClass("warning-input");
        error++;
      }
      if (!checkPasswd($("#passwd-2").val())) {
        error++;
      }
      return error == 0;
    }

    $(".ifSQLIn").on("blur", function (event) {
      let contain = ifSQLInjection(event.target.value);
      if (contain) {
        addWarn(this, "疑似 SQL Injection 攻擊字串");
      } else {
        deleteWarn(this);
      }
    });

    $("#same-regist").click(sameAsRegist);

    $("#email-1").on("blur", function (event) {
      let ok = checkEmail(event.target.value);
      if (!ok) {
        addWarn(this, "電子郵件帳號不符合規則");
      } else {
        deleteWarn(this);
      }
    });

    $("#email-2").on("blur", function (event) {
      let same = sameText($("#email-1").val(), event.target.value);
      if (!same) {
        addWarn(this, "電子郵件帳號不相同");
      } else {
        deleteWarn(this);
      }
    });

    $("#passwd-1").on("input", function (event) {
      let password = event.target.value;
      $("meter").attr("value", passwdStrength(password));
      if (!checkPasswd(password)) {
        addWarn(this, "密碼不符合規範");
      } else {
        deleteWarn(this);
      }
    });

    $("#passwd-2").on("blur", function (event) {
      let same = sameText($("#passwd-1").val(), event.target.value);
      if (!same) {
        addWarn(this, "兩次輸入密碼不相同");
      } else {
        deleteWarn(this);
      }
    });

    $("#submit").click(function() {
        checkForm() ? alert("資料已填寫完畢，謝謝") : alert("請填入所有資料及修正錯誤資料");
    });
  });