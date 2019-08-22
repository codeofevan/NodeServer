var admin = {
    //获取左侧菜单栏的文档高度
    fn_getScroll: function (ifm_lf, item_lf, ifm_rg, item_rg) {
        //查找需要修改的元素
        let leftMenu = document.getElementById(ifm_lf);
        let leftDoc = window.frames[ifm_lf].contentWindow.document;
        let rightPage = document.getElementById(ifm_rg);
        let rightDoc = window.frames[ifm_rg].contentWindow.document;
        //绑定this
        let setIfmH = this.fn_setIfmH.bind(admin, leftMenu, leftDoc, rightPage, rightDoc);
        setIfmH();

        if (item_lf) {
            let menuIs = leftDoc.querySelectorAll(item_lf);
            for (var elem of menuIs) {
                elem.onclick = () => {
                    setTimeout(() => {
                        setIfmH();
                    }, 0);
                };
            }
        }
        if (item_rg) {
            let menuIs = leftDoc.querySelectorAll(item_rg);
            for (var elem of menuIs) {
                elem.onclick = () => {
                    setTimeout(() => {
                        setIfmH();
                    }, 0);
                };
            }
        }
        //监听窗口变动
        // rightDoc.documentElement.onresize = ()=>{
        //     setIfmH();
        // }
    },
    fn_setIfmH: function (leftMenu, leftDoc, rightPage, rightDoc) {
        //获取视窗框架高度
        setTimeout(()=>{
            let winH = window.screen.availHeight;
            let leftH = leftDoc.documentElement.scrollHeight;
            let rightH = rightDoc.documentElement.scrollHeight;
            //取最大的高度
            let menuH = winH > leftH ? (winH > rightH ? winH : rightH) : (leftH > rightH ? leftH : rightH);
            console.log('>>winH:' + winH + ' leftH:' + leftH + ' rightH:' + rightH);
            //设置框架高度
            leftMenu.style.height = menuH + 'px';
            rightPage.style.height = menuH + 'px';
        },10);
        // console.log('>>'+leftMenu.style+' '+rightPage.style);
    }
};