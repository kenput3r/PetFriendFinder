//filter form validation
$('#type').change(function() {
    if($(this).val() !== 'Pet Type') {
        $('#submit').removeAttr('disabled').removeClass('disabled');
    }else{
        $('#submit').attr('disabled', true).addClass('disabled');
    }
});