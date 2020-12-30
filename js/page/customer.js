$(document).ready(function () {
    new CustomerJS();
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

