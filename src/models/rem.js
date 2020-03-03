(function PageResize(){
    (function GetSize(){
        let width=document.documentElement.clientWidth||document.body.clientWidth;
        width>750?width=750:null;
        width<320?width=320:null;
        document.documentElement.style.fontSize=(width*(100/350))+"px";//375可改750
        if(!window.onresize){
            window.onresize=function(){
                onFooEndFunc(GetSize);
            }
        }
    })();
    //延迟运行计算
    let executionTimer;
    let onFooEndFunc=function(fn){
        let delay=300;//根据实际情况可调整延时时间
        if(!!executionTimer){
            clearTimeout(executionTimer);
        }
        //这里延时执行你的函数
        executionTimer=setTimeout(function(){
            fn()
        },delay);
    };
})();