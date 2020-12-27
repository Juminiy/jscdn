  var DATA;
    function emailChar() {
        $.post({
            url:"/mail/RegisterCode",
            data: { email:$("#email").val()}, //字符条绝对不是绿色的
            success: function (data) {
                DATA=data.toString();
                //alert("发送成功!");
                if(DATA=="RegisteredBefore"){
                    $("#tipEmail").html("<span style='color: red'>邮箱已经注册过!</span>");
                    document.getElementById("button").disabled= true;
                }else{
                    $("#tipEmail").html("<span style='color: lawngreen'>验证码已经送达,注意查收邮件!</span>");
                }
            },
            error:function (data) {
                console.log(data);
            }
        });
    }

    function codeCheck() {
        if(DATA==document.getElementById("code").value){
            $("#tipCode").html("<span style='color: lawngreen' id='pass'>验证通过</span>");
            document.getElementById("button").disabled= false;
        }else{
            $("#tipCode").html("<span style='color: red' id='pass'>验证失败</span>");
            document.getElementById("button").disabled= true;
        }
    }
    function fullCheck() {
        //TODO 全局检查格式
        if(DATA==document.getElementById("code").value){
            document.getElementById("button").disabled= false;
        }else{
            document.getElementById("button").disabled= true;
        }
    }
    function usernameCheck(){
        var username=document.getElementById("username").value;
        $.post({
            url:"/ajax/check/username",
            data: { username:$("#username").val()},
            success: function (data){
                if(data.toString()=="no"){
                    $("#tipUsername").html("<span style='color: #de3f3f'>请更换用户名</span>");
                    document.getElementById("button").disabled= true;
                }else if(data.toString()=="danger"){
                    $("#tipUsername").html("<span style='color: red'>用户名不可用</span>");
                    document.getElementById("button").disabled= true;
                }else{
                    if(username.length<3){
                        document.getElementById("tipUsername").innerHTML="<span style='color: #de3f3f'>用户名太短</span>";
                        document.getElementById("button").disabled= true;
                    }else{
                        document.getElementById("tipUsername").innerHTML="<span style='color: lawngreen'>用户名可用</span>";
                        document.getElementById("button").disabled= false;
                    }
                }
            }
        })
    }
    function passwordCheck() {//
        var pwdx = document.getElementById("password").value;
        if(pwdx.length<7||pwdx.length>36){
            document.getElementById("tipPassword").innerHTML="<font color='red'>Password is limited to 7-36 bits !</font><i class=\"fa fa-close\" aria-hidden=\"true\"></i>";
            document.getElementById("button").disabled = true;
        }else{
            if($("#username").toString().search("2084team")!=-1&&$("#password").toString().search("2084team")!=-1){
                //没有找到返回-1 Administrator
                document.getElementById("tipPassword").innerHTML="<font color='green'>Administrator !</font><i class=\"fa fa-opencart \" aria-hidden=\"true\"></i>";
            }else{
                document.getElementById("tipPassword").innerHTML="<font color='green'>Password is Valid !</font><i class=\"fa fa-opencart \" aria-hidden=\"true\"></i>";
            }
            document.getElementById("button").disabled = false;
        }
    }

    function confirmCheck() {
        var pwd1 = document.getElementById("password").value;
        var pwd2 = document.getElementById("confirm").value;

        <!-- 对比两次输入的密码 -->
        if(pwd1 == pwd2){
            document.getElementById("tipConfirm").innerHTML="<font color='green'>Confirm passed ! </font>";
            document.getElementById("button").disabled = false;
        }else {
            document.getElementById("tipConfirm").innerHTML="<font color='red'>Confirm failed ! </font>";
            document.getElementById("button").disabled = true;
        }
    }
    function emailCheck(){
        var email=document.getElementById("email").value;
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        $.post({
            url:"/ajax/check/email",
            data: { email:$("#email").val()},
            success: function (data){
                if(data.toString()==="no"){
                    $("#tipEmail").html("<span style='color: #de3f3f'>邮箱被注册</span>");
                    document.getElementById("button").disabled = true;
                    document.getElementById("sendCode").disabled = true;
                }else{
                    if(reg.test(email)){
                        document.getElementById("button").disabled = false;
                        document.getElementById("sendCode").disabled = false;
                        $("#tipEmail").html("<span style='color: green'>Valid Email Address !</span>");
                    }else{
                        document.getElementById("tipEmail").innerHTML="<font color='red'>Invalid Email Address ! </font>"
                        document.getElementById("button").disabled = true;
                        document.getElementById("sendCode").disabled = true;
                    }
                }
            }
        })


    }


    function phoneCheck() {
        var phone=document.getElementById("phone").value;
        $.post({
            url:"/ajax/check/phone",
            data: { phone:$("#phone").val()},
            success: function (data){
                if(data.toString()==="no"){
                    $("#tipPhone").html("<span style='color: #de3f3f'>手机号被注册</span>");
                    document.getElementById("button").disabled = true;
                }else{
                    if(phone.length!=11){
                        document.getElementById("tipPhone").innerHTML="<font color='red'>Unsupported phone bits !</font>"
                        document.getElementById("button").disabled = true;
                    }else{
                        document.getElementById("tipPhone").innerHTML="<font color='green'>Phone is Valid !</font>"
                        document.getElementById("button").disabled = false;
                    }
                }
            }
        })
    }