function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token"),
        // },ajaxPrefilter
        success: (res) => {
            console.log(res);
            if (res.status !== 0) return layer.msg('获取用户信息失败')
                // console.log(res.data);
                // layer.msg('获取用户信息成功！');
            rederAvatar(res.data)
        },
        // complete: (res) => {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         localStorage.removeItem("token");
        //         location.href = "/login.html"
        //     }
        //     console.log(res)
        // }
    })
}
//渲染用户信息

const rederAvatar = (user) => {
    const name = user.username || user.nikename;
    console.log(user);
    console.log(name);
    $("#welcome").html(`欢迎${name}`);
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本头88像
        $(".layui-nav-img").hide();
        let firstName = name[0].toUpperCase();
        $(".text-avatar").html(firstName).show();
    }
};
// 退出登录
$("#btnout").click(() => {
    console.log(1);
    layer.confirm(
        "确定退出登录？", { icon: 3, title: "" },
        function(index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});

function change() {
    $('#change').addClass('layui-this').next().removeClass('layui-this ')
}
getUserInfo();