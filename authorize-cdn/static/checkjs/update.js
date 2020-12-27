 function usernameCheck(){
        $.post({
            url:"/ajax/check/username",
            data: { username:$("#username").val()},
            success: function (data){
                if(data.toString()=="no"||data.toString()=="danger"){
                    $("#tipUsername").html("<span style='color: limegreen'>用户名正确</span>");
                    document.getElementById("button").disabled= false;
                }else{
                    $("#tipUsername").html("<span style='color: limegreen'>用户名错误</span>");
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

    function phoneCheck() {
        var phone=document.getElementById("phone").value;
        if(phone.length!=11){
            document.getElementById("tipPhone").innerHTML="<font color='red'>Unsupported phone bits !</font>"
            document.getElementById("button").disabled = true;
        }else{
            document.getElementById("tipPhone").innerHTML="<font color='green'>Phone is Valid !</font>"
            document.getElementById("button").disabled = false;
        }
    }

    function showFileImage(){
        document.getElementById('fileInput')
            .addEventListener('change',function selectedFileChanged(){
                if(this.files.length === 0){
                    return ;
                }
                const reader = new FileReader();
                reader.onload = function fileReadCompleted(){
                    document.getElementById("avatar").src = reader.result ;
                };
                reader.readAsDataURL(this.files[0]);
            });
    }