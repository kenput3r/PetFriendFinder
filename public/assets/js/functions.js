$(document).ready(function () {

    //filter form validation
    $('#type').change(function () {
        if ($(this).val() !== 'Pet Type') {
            $('#submit').removeAttr('disabled').removeClass('disabled');
        } else {
            $('#submit').attr('disabled', true).addClass('disabled');
        }
    });

    $('.section-change').click(function () {
        var hideId = $('.section-change.active').attr('data-section');
        var showId = $(this).attr('data-section');
        $('.section-change.active').removeClass('active');
        $(this).addClass('active');
        $(hideId).addClass('d-none');
        $(showId).removeClass('d-none');
    });

    function getUsersPets(userId) {
        $.get('/api/users-pets/' + userId).done(function (data) {
            console.log(data);
            for (pet in data) {
                var $col = $('<div>', {
                    class: 'col-md-6'
                });
                var $form = $('<form>', {
                    class: 'add-friend',
                    method: 'post'
                });
                var $card = $('<div>', {
                    class: 'card float-right'
                });
                var $cardImage = $('<img>', {
                    src: data[pet].picture,
                    class: 'card-img-top',
                    alt: data[pet].name
                });
                var $cardBody = $('<div>', {
                    class: 'card-body'
                });
                var $cardTitle = $('<h4>', {
                    class: 'card-title'
                });
                var $friendPetId = $('<input>', {
                    type: 'hidden',
                    name: 'friendPetId',
                    class: 'friendPetId',
                    value: $('#FriendPetId').val()
                });
                var $myPetId = $('<input>', {
                    type: 'hidden',
                    name: 'myPetId',
                    class: 'myPetId',
                    value: data[pet].id
                });

                var $makeFriendship = $('<input>', {
                    type: 'submit',
                    value: 'Add Friend',
                    class: 'MatchFriend'
                });

                $form.append($card);
                $card.append($cardImage);
                $card.append($cardBody);
                $cardBody.append($cardTitle);
                $cardTitle.html(data[pet].name);
                $cardBody.append($friendPetId);
                $cardBody.append($myPetId);
                $cardBody.append($makeFriendship);

                $col.append($form);

                $('#AsyncFriends').append($col);
            }
            $('.add-friend').each(function () {
                let friendPetId = $(this).find('.friendPetId').val();
                let myPetId = $(this).find('.myPetId').val();
                console.log('friendPetId', friendPetId);
                console.log('myPetId', myPetId);
                $(this).find('.MatchFriend').on('click', function (event) {
                    event.preventDefault();
                    $.post('/api/friendships', {
                            myPetId: myPetId,
                            friendPetId: friendPetId
                        })
                        .done(function (response) {
                            $('#AsyncFriends').html(response);
                        });
                })
            });

        });
    }

    $('#SubmitFriend').on('click', function (event) {
        event.preventDefault();
        var userId = $('#AddFriendForm').attr('data-userId');
        $('#AsyncFriends').html('');
        getUsersPets(userId);
    });

    $("#post-btn").click(function () {
        $.post("process.php", $("#reg-form").serialize(), function (data) {
            alert(data);
        });
    });

    switch (window.location.pathname) {

        case '/profile':
        case '/profile/':
            $('#view-post').addClass('active');
            break;
        case '/profile/view-pets':
        case '/profile/view-pets/':
            $('#view-pets').addClass('active');
            break;
        case '/profile/view-friends':
        case '/profile/view-friends/':
            $('#view-friends').addClass('active');
            break;
        case '/profile/edit-profile':
        case '/profile/edit-profile/':
            $('#edit-profile').addClass('active');
            break;
        case '/home':
        case '/home/':
            $('#feed').addClass('active');
            break;
        case '/find-pet-friend':
        case '/find-pet-friend/':
            $('#find-pet-friend').addClass('active');
            break;
        case '/message':
        case '/message/':
            $('#message').addClass('active');
            break;
    }

});