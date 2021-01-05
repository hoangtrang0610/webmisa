$(document).ready(function () {
    new CustomerJS();
    //dialogDetail = $(".m-dialog").dialog({
    //    autoOpen: false,
    //    fluid: true,
    //    minWidth: 700,
    //    resizable: true,
    //    positon: ({ my: "center", at: "center", of: windown }),
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

    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }
}

