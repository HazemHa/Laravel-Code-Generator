function ajaxRequest(name, type, content) {
    $.ajax({
        url: "http://127.0.0.1/init.php",
        type: "POST",
        crossDomain: true,
        headers: {
           "Access-Control-Allow-Origin":"*",
        },
        data: {
            name: name,
            type: type,
            content: content
        },
        success: function (res, status) {
            //  $TableResultFromServer
            if (status == 'success') {
                $TableResultFromServer.append('<tr class="bg-success"><td>' + name + '</td><td>' + status + '</td></tr>');
            } else {
                $TableResultFromServer.append('<tr class="bg-warning"><td>' + name + '</td><td>' + status + '</td></tr>');
            }
            /*
            toastr.success(name + " created successfully", name);*/
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $TableResultFromServer.append('<tr class="bg-danger"><td>' + name + '</td><td>' + textStatus + '</td></tr>');
            /*
            toastr.error(
            name + " There Are an Error but go check your files", name);*/
        }
    });
}