//filter form validation
$('#type').change(function() {
    if($(this).val() !== 'Pet Type') {
        $('#submit').removeAttr('disabled').removeClass('disabled');
    }else{
        $('#submit').attr('disabled', true).addClass('disabled');
    }
});

$('.section-change').click(function() {
    let hideId = $('.section-change.active').attr('data-section');
    let showId = $(this).attr('data-section');
    $('.section-change.active').removeClass('active');
    $(this).addClass('active');
    $(hideId).addClass('d-none');
    $(showId).removeClass('d-none');
});