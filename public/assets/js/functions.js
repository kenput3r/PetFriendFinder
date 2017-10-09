//filter form validation
$('#type').change(function() {
    if($(this).val() !== 'Pet Type') {
        $('#submit').removeAttr('disabled').removeClass('disabled');
    }else{
        $('#submit').attr('disabled', true).addClass('disabled');
    }
});

$('.section-change').click(function() {
    var hideId = $('.section-change.active').attr('data-section');
    var showId = $(this).attr('data-section');
    $('.section-change.active').removeClass('active');
    $(this).addClass('active');
    $(hideId).addClass('d-none');
    $(showId).removeClass('d-none');
});

function getUsersPets(userId) {
    $.get('/api/users-pets/' + userId).done(function(data) {
        console.log(data);
        for(pet in data) {
            var $col = $('<div>', {class: 'col-md-6'});
            var $form = $('<form>', {class: 'add-friend'});
            var $card = $('<div>', {class: 'card float-right'});
            var $cardImage = $('<img>',
                {
                    src: data[pet].picture,
                    class: 'card-img-top',
                    alt: data[pet].name 
                }
            );
            var $cardBody = $('<div>', {class: 'card-body'});
            var $cardTitle = $('<h4>', {class: 'card-title'});
            var $friendPetId = $('<input>',
                {
                    type: 'hidden',
                    name: 'friendPetId',
                    value: $('#FriendPetId').val()
                }
            );
            var $myPetId = $('<input>',
                {
                    type: 'hidden',
                    name: 'myPetId',
                    value: data[pet].id
                }
            );

            var $makeFriendship = $('<input>',
                {
                    type: 'submit',
                    value: 'Add Friend',
                    id: 'MatchFriend'
                }
            );

            $form.append($card);
            $card.append($cardImage);
            $card.append($cardBody);
            $cardBody.append($cardTitle);
            $cardBody.append($friendPetId);
            $cardBody.append($myPetId);
            $cardBody.append($makeFriendship);

            $col.append($form);

            $('#AsyncFriends').html('');
            $('#AsyncFriends').append($col);
        }
    });
}

$('#SubmitFriend').on('click', function(event) {
    event.preventDefault();
    var userId = $('#AddFriendForm').attr('data-userId');
    getUsersPets(userId);
});