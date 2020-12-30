$(document).ready(function () {
    new EmployeeJS();
});

/**
 * Class quản lý các sự kiện cho trang Employee
 * CreateBy: HTTrang
 * */
class EmployeeJS extends BaseJS {
    constructor() {
        super();
    }

    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/employees";
    }

}
