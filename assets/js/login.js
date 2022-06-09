$(function() {
    $('#link_reg').click(() => {
        $('.login-box').hide();
        $('.reg-box').show()
    });
    $('#link_login').click(() => {
        $('.login-box').show();
        $('.reg-box').hide()
    });

    //引入form
    const form = layui.form;
    //校验
    form.verify({
        password: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        repwd: (value) => {
            const pwd = $(".reg-box [name = password]").val();
            if (pwd !== value) {
                console.log(value, pwd);
                return "两次密码不一致";
            };
        }
    });

    // const baseUrl = "http://www.liulongbin.top:3007";
    $("#form_reg").submit((e) => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功'),
                    $('#link_login').click()
            }
        })
    });
    //登录 post & 监听
    $('#form_login').submit((e) => {
        e.preventDefault();
        $.ajax({
                type: 'POST',
                url: '/api/login',
                data: $('#form_login').serialize(),
                success: (res) => {
                    if (res.status !== 0) return layer.msg(res.message);
                    layer.msg('登录成功咯');
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html'
                }
            })
            // console.log(option);
    });
})