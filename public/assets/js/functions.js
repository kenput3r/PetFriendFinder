//filter form validation
$('#type').change(function() {
    if($(this).val() !== 'Pet Type') {
        $('#submit').removeAttr('disabled');
    }else{
        $('#submit').attr('disabled', true);
    }
});