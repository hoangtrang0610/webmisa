$(document).ready(function () {
    loadData();
});

function loadData() {
    //lấy dữ liệu về:
    $.ajax({
        url: "http://api.manhnv.net/api/employees", 
        method: "GET",

    }).done(function (res) {
        var data = res;
       
        $.each(data, function (index, item) {
            debugger;
       
            var tr = `<tr>
                        <td><div><span>`+ item.EmployeeCode + `</span></div></td>
                        <td><div><span>`+ item['FullName'] + `</span></div></td>
                        <td><div><span>`+ item.GenderName + `</span></div></td>
                        <td><div><span>`+ item.DateOfBirth + `</span></div></td>
                        <td><div><span>`+ item.PhoneNumber + `</span></div></td>
                        <td><div><span>`+ item.Email + `</span></div></td>
                        <td><div><span>`+ item.PositionName + `</span></div></td>
                        <td><div><span>`+ item.DepartmentName + `</span></div></td>
                        <td><div><span>`+ item.Salary + `</span></div></td>
                        <td><div style="max-width:250px"><span>`+ item.Address + `</span></div></td>
                        <td><div><span>`+ item.WorkStatusName + `</span></div></td>
                    </tr>`;
            $('table tbody').append(tr);
            debugger;
        })


        
    }).fail(function (res) { })
    //binding dữ liệu lên table:
}