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
            
            var DateOfBirth = item["DateOfBirth"];
            var salary = item["Salary"];
            salary = formatMoney(salary);
            DateOfBirth = formatDate(DateOfBirth);
            var checkbox = `<input type="checkbox"/>`;
            if (item.GenderName == "Nam") {
                var checkbox = `<input type="checkbox" checked/>`;
            }
            var tr = `<tr>
                        <td><div><span>`+ item.EmployeeCode + `</span></div></td>
                        <td><div><span>`+ item['FullName'] + `</span></div></td>
                        <td><div class="text-align-center">`+ checkbox + `</div></td>
                        <td><div><span>`+ DateOfBirth + `</span></div></td>
                        <td><div><span>`+ item.PhoneNumber + `</span></div></td>
                        <td><div><span>`+ item.Email + `</span></div></td>
                        <td><div><span>`+ item.PositionName + `</span></div></td>
                        <td><div><span>`+ item.DepartmentName + `</span></div></td>
                        <td><div class="text-align-right">`+ salary + `</div></td>
                        <td style="max-width:150px"  title="`+ item.Address +`">` + item.Address + `</td>
                        <td><div><span>`+ item.WorkStatusName + `</span></div></td>
                    </tr>`;
            $('table tbody').append(tr);
            debugger;
        })


        
    }).fail(function (res) { })
    //binding dữ liệu lên table:
}

