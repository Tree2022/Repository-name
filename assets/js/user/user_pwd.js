$(function() {
    console.log(2);
    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/],
        samePwd: (val) => {
            if (val === $("[name=oldPwd]").val()) return "新密码不能和原密码相同！";
        },
        rePwd: (val) => {
            if (val !== $("[name = newPwd]").val()) return "两次密码不一致！";
        },
    });
    $(".layui-form").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),

            success: (res) => {
                if (res.status !== 0) return "更新密码失败，稍后再试！";
                localStorage.removeItem("token");
                window.parent.location.href = "/login.html";
                layer.msg("更新密码成功，请重新登陆");
            },
        });
    });
});