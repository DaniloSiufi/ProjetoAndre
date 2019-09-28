$("#lg").on("click",function(e){
    $(".reg").css("display","none");
    $(".log").css("display","");
})

$("#rg").on("click",function(e){
    $(".reg").css("display","");
    $(".log").css("display","none");
})

var locked = false;

$("#enviar2").click(function () {
    if(!locked){
        locked = true;
        $.ajax({
            method: "post",
            url: "/login",
            data: {
                email: $("#email2").val(),
                username: $("#username2").val(),
                password: $("#password2").val()
            }
        }).done(function (response) {
            locked = false;
            if(response.err){
                $(".er2").text(response.err);
            }else{
               $(".reg").css("display","none");
               $(".log").css("display","none");
               $(".welcome").css("display","");
               $("#name").text("Bem vindo " + response.name);
            }
        })
    }
});

$("#enviar").click(function () {
    if(!locked){
        locked = true;
        $.ajax({
            method: "post",
            url: "/register",
            data: {
                email: $("#email").val(),
                username: $("#username").val(),
                password: $("#password").val()
            }
        }).done(function (response) {
            locked = false;
            console.log(response)
            if(response.err){
                $(".er1").text(response.err);
            }else{
               $(".reg").css("display","none");
               $(".log").css("display","none");
               $(".welcome").css("display","");
               $("#name").text("Bem vindo " + response.name);
            }
        })
    }
}) 