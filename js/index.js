$(function() {
    var json_result;
    $.getJSON("data.json", function(json) {
        $(document).attr("title", json.name);
        $('#person_name').text(json.name);
        console.log(json); // this will show the info it in firebug console
        json_result = json;
        get_years_index(json.data);
        $( ".month_link").one( "click", function() {
            display_photos( $(this).attr('data') );
        });
    });
    function display_photos(year_month){
        var ym = year_month.split('_');
        var year = ym['0'];
        var month = ym['1'];
        $('#month_label').text(year_month);
        for(row of json_result.data){
            if(row.year==year){
                for(month_data of row.contents){
                    if(month_data.month==month){
                        //display here
                        var files = month_data.files;
                        add_photo_to_gallary(year,month,files);
                    }
                }
            }
        }
    }
    function add_photo_to_gallary(year,month,files){
        var html_content='';
        for(file of files){
            path = 'photos/'+year+'/'+month+'/'+file.file_name;
            html_content+='<div class="col-sm-6 col-md-4 col-lg-3 item"><a href="'+path+'" data-lightbox="photos"><img class="img-fluid" src="'+path+'"></a></div>';
        }
        $('#photo_list').html(html_content);

    }

    function get_target_name(year){
        return 'content_'+year;
    }
    function get_years_index(data){
        var content = '';
        for(row of data){
            year = row.year;
            months = row.contents;
            content+='<li class="mb-1">';
            content+='	  <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#'+get_target_name(year)+'" aria-expanded="false">'
            content+=year;
            content+='</button>';
            content+='<div class="collapse" id="'+get_target_name(year)+'" style="">';
            content+='<ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">';
            for(var i=0;i<months.length;i++){
                month = months[i];
                content+='<li><a href="#" data='+year+'_'+month.month+' class="month_link link-dark d-inline-flex text-decoration-none rounded">'+month.month+'</a></li>'
            }
            content+='</ul>';
            content+='</div>';
            content+='</li>';
        }
        $('#years_index').html(content);
    }


    (() => {
        'use strict'
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        tooltipTriggerList.forEach(tooltipTriggerEl => {
          new bootstrap.Tooltip(tooltipTriggerEl)
        })
      })()
});
