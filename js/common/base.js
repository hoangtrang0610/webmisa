class BaseJS {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.initEvents();
        this.loadData();
    }

    setApiRouter() {

    }


    /**
     * khởi tạo tất cả sự kiện cho các button 
     * 
     * */
    initEvents() {
        var me = this;
        //sự kiện click khi nhấn thêm mới:
        $('#btnAdd').click(function () {
            try {
                me.FormMode = 'Add';
                //hiển thị dialog thông tin chi tiết 
                $('#dialog').css('display', ' block');
                $('input').val(null);
                //load dữ liệu cho các combobox 
                var select = $('select#cbxCustomerGroup');
                select.empty();
                //lấy dữ liệu nhóm khách hàng:
                $('.loading').show();
                $.ajax({
                    url: me.host + "/api/customergroups",
                    method: "GET"
                }).done(function (res) {
                    if (res) {
                        console.log(res);
                        $.each(res, function (index, obj) {
                            var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                            select.append(option);
                        })
                    }
                    $('.loading').hide();
                }).fail(function (res) {
                    $('.loading').hide();
                })
            } catch (e) {
                console.log(e);
            }
        })

        //sự kiện khi ấn close
        $('#btnClose').click(function () {
            $('#dialog').css('display', ' none');
        })


        //load lại sự kiện khi  nhấn button nạp:
        $('#btnRefresh').click(function () {
            //hiển thị dialog thông tin chi tiết 
            me.loadData();
        })

        //Ẩn form chi tiết khi nahans hủy
        $('#btnCancel').click(function () {
            //hiển thị dialog thông tin chi tiết 
            //dialodDetail.dialog('close');
        })

        //thực hiện lưu dữ liệu khi nhấn button [Lưu] trên trang chi tiết
        $('#btnSave').click(function () {
            //validate dữ liệu
            var inputValidates = $('input[required], input[type="email"]');
            $.each(inputValidates, function (index, input) {
                $(input).trigger('blur');
            })
            var inputNotValids = $('input[validate="false"]');
            if (inputNotValids && inputNotValids.length > 0) {
                alert("Dữ liệu không hợp lệ vui lòng kiểm tra lại");
                inputNotValids[0].focus();
                return;
            }


            //thu thập thông tin dữ liệu được nhập--> built thành object
            // lấy tất cả các control nhập liệu
            var inputs = $('input[fieldName], select[fieldName]');
            var entity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldname');
                var value = $(this).val();
                //Check với trường hợp input là radio, thì chỉ lấy value của input có attribute checked:
                if ($(this).attr('type') == "radio") {
                    if (this.checked) {
                        entity[propertyName] = value;
                    }
                } else {
                    entity[propertyName] = value;
                }
            })

            //gọi service tương ứng thực hiện lưu dữ liệu
            $.ajax({
                url: me.host + me.apiRouter,
                method: 'POST',
                data: JSON.stringify(entity),
                contentType: 'application/json'
            }).done(function (res) {
                alert("thêm thành công");
                $('#dialog').css('display', ' none');
                me.loadData();
            }).fail(function (res) {
                console.log(res);
            })

            //sau khi lưu thành công thì: 

            //+đưa ra thông báo thành công

            //+ẩn form chi tiết
            //+load lại dữ liệu  


        }.bind(this))

        //hiển thị 1 bản ghi chi tiết khi nhấn đúp chuột vào 1 bản ghi trên danh sách dữ liệu
        $('table tbody').on('dblclick', 'tr', function () {
            me.FormMode = 'Edit';
            //Lấy khóa chính của bản ghi:
            var recordId = $(this).data('recordId');
            console.log(recordId);
            //gọi service lấy thông tin chi tiết qua Id:
            $.ajax({
                url: me.host + me.apiRouter + `/${recordId}`,
                method: "GET",
            }).done(function (res) {
                //Bindding dữ liệu lên form chi tiết 

                // lấy tất cả các control nhập liệu
                var inputs = $('input[fieldName], select[fieldName]');
                var entity = {};
                $.each(inputs, function (index, input) {
                    var propertyName = $(this).attr('fieldname');
                    var value = res[propertyName];
                    $(this).val(value);
                    //Check với trường hợp input là radio, thì chỉ lấy value của input có attribute checked:
                    //if ($(this).attr('type') == "radio") {
                    //    if (this.checked) {
                    //        entity[propertyName] = value;
                    //    }
                    //} else {
                    //    entity[propertyName] = value;
                    //}
                })
            }).fail(function (res) {

            })

            $('#dialog').css('display', 'block');
        })


        /**---------------
         * validate bắt buộc nhập
         * Created: HTTRANG(31/12/2020)
         * */


        $('input[required]').blur(function () {
            //kiểm tra dữ liệu đã nhập, nếu bỏ trống thì cảnh báo:
            var value = $(this).val();
            if (!value) {
                // this.classList.add("txtCustomerCode");
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được phép để trống');
                $(this).attr("validate", false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr("validate", true);
            }

        })

        /**---------------
        * validate email đúng định dạng
        * Created: HTTRANG(31/12/2020)
        * */
        $('input[type="email"]').blur(function () {
            var value = $(this).val();
            var testEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (!testEmail.test(value)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Email không đúng định dạng');
            }
            else {
                $(this).removeClass('border-red');
            }
        })

    }
    /**
     * load dữ liệu
     * createBy: HTTRANG
     * */
    loadData() {
        $('table tbody').empty();
        var me = this;
        try {
            var colums = $('table thead th')
            var getDataUrl = this.getDataUrl;

            $.ajax({
                url: me.host + me.apiRouter,
                method: "GET",
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    $(tr).data("recordId", obj.CustomerId);
                    //lấy thông tin dữ liệu sẽ map tương ứng với các cột
                    $.each(colums, function (index, th) {
                        var td = $(`<td><div><span></span></div></td>`)
                        var fieldName = $(th).attr('fieldname');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "Money":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            default:
                        }

                        td.append(value);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })
            }).fail(function (res) { })
        }
        catch (e) {
            console.log(e);
        }
        //lấy thông tin các cột dữ liệu

    }
}