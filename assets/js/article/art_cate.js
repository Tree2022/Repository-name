$(function() {
    const form = layui.form
    console.log(1);
    const initArtCateList = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                console.log(res);
                const htmlStr = template('tpl-table', res);
                $('tbody').empty().html(htmlStr)
            }
        })
    }
    initArtCateList();
    const layer = layui.layer;

    $("#btnAddCate").click(() => {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });

    });

    // 通过代理监听 submit 事件
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("新增分类失败！");
                initArtCateList();
                layer.msg("新增分类成功！");
                layer.close(indexAdd);
            },
        });
    });

    //给编辑按钮绑定点击事件
    let indexEdit = null;
    $('tbody').on('click', '.btn-edit', function() {
        const id = $(this).attr('data-id');
        console.log(id);
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                form.val("form-edit", res.data);
            },
        });
    });
    $("body").on("submit", "#form-edit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("更新分类数据失败！");
                }
                layer.msg("更新分类数据成功！");
                layer.close(indexEdit);
                initArtCateList();
            },
        });
    });
    //删除功能
    $('tbody').on('click', '.btn-delete', function() {
        const id = $(this).attr('data-id');
        layer.confirm("确认删除吗？", { icon: 3, title },
            function(index) {
                $.ajax({
                    method: 'GET',
                    url: "/my/article/deletecate/" + id,
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg('删除分类成功！');
                        }
                        layer.msg('删除分类成功！');
                        layer.close(index);
                        initArtCateList();
                    }
                })
            })
    })


})