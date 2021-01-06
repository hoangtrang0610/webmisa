$(document).ready(function () {
    new CustomerJS();
    //dialogDetail = $(".m-dialog").dialog({
    //    autoOpen: false,
    //    fluid: true,
    //    minWidth: 700,
    //    resizable: true,
    //    positon: ({ my: "center", at: "center", of: window }),
    //    modal: true,
    //});
});

/**
 * Class quản lý các sự kiện cho trang Employee
 * CreateBy: HTTrang
 * */
class CustomerJS extends BaseJS {
    constructor() {     
        super();
    }

    setApiRouter() {
        this.apiRouter = "/api/customers";
    }

   
}

