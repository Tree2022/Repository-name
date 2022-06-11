$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function() {
        console.log(1);
        $('#file').click()
    });

    const layer = layui.layer;

    // 为文件上传框绑定 change 事件
    $("#file").change((e) => {
        const fileList = e.target.files.length;
        if (fileList === 0) return layer.msg("请选择文件！");

        // 1. 拿到用户选择的文件
        let file = e.target.files[0];
        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file);
        // 3. 重新初始化裁剪区域
        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", imgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    });


})