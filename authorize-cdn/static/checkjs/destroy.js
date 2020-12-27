function usernameCheck(){
        $.post({
            url:"/ajax/check/username",
            data: { username:$("#username").val()},
            success: function (data){
                if(data.toString()=="no"||data.toString()=="danger"){
                    $("#tipUsername").html("<span style='color: limegreen'>用户名正确</span>");
                    document.getElementById("button").disabled= false;
                }else{
                    $("#tipUsername").html("<span style='color: red'>用户名错误</span>");
                    document.getElementById("button").disabled= true;
                }
            }
        })
    }

    function passwordCheck() {
        var pwdx = document.getElementById("password").value;
        if(pwdx.length<7||pwdx.length>36){
            document.getElementById("tipPassword").innerHTML="<font color='red'>Password is limited to 7-36 bits !</font><i class=\"fa fa-close\" aria-hidden=\"true\"></i>";
            document.getElementById("button").disabled = true;
        }else{
            document.getElementById("tipPassword").innerHTML="<font color='green'>Password is Valid !</font><i class=\"fa fa-opencart \" aria-hidden=\"true\"></i>";
            document.getElementById("button").disabled = false;
        }
    }

    function check(){
        var confirm=document.getElementById("confirm").value;
        if(confirm==document.getElementById("username").value+" confirm destroy"){
            document.getElementById("button").disabled=false;
            $("#tipConfirm").html("<span style='color: limegreen'>验证通过</span>");
        }else{
            document.getElementById("button").disabled=true;
            $("#tipConfirm").html("<span style='color: #de3f3f'>格式: 你的用户名+空格+confirm+空格+destroy</span>");
        }
    }