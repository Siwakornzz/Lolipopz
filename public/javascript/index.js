$("#adduser").submit(function(event) {
    alert("Data Inserted Successfully!");
})

$("#updateuser").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
        console.log(data.password)
    })



    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        alert("Data Updated Successfully!");
    })

})
console.log(window.location.pathname)
if (window.location.pathname == "/user") {
    $ondelete = $(".delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")
        console.log(id)

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

$("#addproduct").submit(function(event) {
    alert("Data Inserted Successfully!");
})

$("#updateproduct").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']

            // console.log(data.password)
    })



    var request = {
        "url": `http://localhost:3000/api/product/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        alert("Data Updated Successfully!");
    })

})
console.log(window.location.pathname)
if (window.location.pathname == "/checkproduct") {
    $ondelete = $(".delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")
            // console.log(id)

        var request = {
            "url": `http://localhost:3000/api/product/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

$("#addtopup").submit(function(event) {
    alert("Data Inserted Successfully!");
})

$("#updatetopup").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value']
            // console.log(data.password)
    })



    var request = {
        "url": `http://localhost:3000/api/topup/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        alert("Data Updated Successfully!");
    })

})
console.log(window.location.pathname)
if (window.location.pathname == "/checktopup") {
    $ondelete = $(".delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")
            // console.log(id)

        var request = {
            "url": `http://localhost:3000/api/topup/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}