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

    setApiRouter() {
        this.apiRouter = "/api/employees";
    }


}
