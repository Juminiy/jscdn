 function passwordCheck() {
        var pwdx = document.getElementById("password").value;
        if(pwdx.length<7||pwdx.length>36){
            document.getElementById("tipPassword").innerHTML="<font color='red'>Password is limited to 7-36 bits !</font><i class=\"fa fa-close\" aria-hidden=\"true\"></i>";
            document.getElementById("button").disabled = true;
            return false;
        }else{
            document.getElementById("tipPassword").innerHTML="<font color='green'>请牢记您的密码 ! </font><i class=\"fa fa-opencart \" aria-hidden=\"true\"></i>";
            document.getElementById("button").disabled = false;
            return true;
        }
    }


    var DATA;
    function emailChar() {
        $.post({
            url:"[[@{/mail/FindCode}]]",
            data: { email:$("#email").val()},
            success: function (data) {
                DATA=data.toString();
                if(DATA=="empty"){
                    $("#tipEmail").html("<span style='color: red'>邮箱不存在!</span>");
                    document.getElementById("button").disabled= true;
                }else{
                    $("#tipEmail").html("<span style='color: limegreen'>验证码已经送达,注意查收邮件!</span>");
                }
            }
        });
    }

    function codeCheck() {
        if(DATA==document.getElementById("code").value){
            $("#tipCode").html("<span style='color: limegreen' id='pass'>验证通过</span>");
            document.getElementById("button").disabled= false;
            return true;
        }else{
            $("#tipCode").html("<span style='color: red' id='pass'>验证失败</span>");
            document.getElementById("button").disabled= true;
            return false;
        }
    }
    /**
     * @correct fullCheck use function return false/true
     */
    function fullCheck() {
       if(codeCheck()==true&&passwordCheck()==true){
           document.getElementById("button").disabled= false;
       }else{
           document.getElementById("button").disabled= true;
       }
    }

    function emailCheck(){
        var email=document.getElementById("email").value;
        var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        $.post({
            url:"[[@{/ajax/check/email}]]",
            data: { email:$("#email").val()},
            success: function (data){
                if(data.toString()=="no"){
                    $("#tipEmail").html("<span style='color: green'>Valid Email Address !</span>");
                    document.getElementById("button").disabled = false;
                    document.getElementById("sendCode").disabled = false;
                    if(reg.test(email)){
                        document.getElementById("button").disabled = false;
                        document.getElementById("sendCode").disabled = false;
                        $("#tipEmail").html("<span style='color: green'>Valid Email Address !</span>");
                    }else{
                        document.getElementById("tipEmail").innerHTML="<font color='red'>Invalid Email Address ! </font>"
                        document.getElementById("button").disabled = true;
                        document.getElementById("sendCode").disabled = true;
                    }
                }else{
                    $("#tipEmail").html("<span style='color: red'> 邮箱不存在 !</span>");
                    document.getElementById("button").disabled = true;
                    document.getElementById("sendCode").disabled = true;
                }
            }
        })
    }