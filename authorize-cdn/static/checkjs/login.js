 function authorize(){
        $.post({
            url: "[[@{/ajax/check/authorize}]]",
            data: { username:$("#username").val(),password:$("#password").val()},
            success: function (data){
                if(data.toString()=="ok"){
                    $("#tip").html("<span style='color: limegreen'>     Authorize Pass ! </span>");
                    document.getElementById("button").disabled= false;
                }else{
                    $("#tip").html("<span style='color: red'>       用户名或者密码错误!  </span>");
                    document.getElementById("button").disabled= true;
                }
            }
        })
    }

    function check(){
        $.post({
            url:"[[@{/ajax/check/username}]]",
            data: {username:$("#username").val()},
            success: function (data){
                if(data.toString()=="ok"){
                    $("#tipU").html("<span style='color: #de3f3f'>我们这里没有这个人 !</span>")
                }else{
                    $("#tipU").html("<span style='color: #1c7430'>快来玩耍啊 !</span>")
                }
            }
        })
    }