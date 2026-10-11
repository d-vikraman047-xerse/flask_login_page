$(document).ready(function() {
    // Add subtle entrance animation
    $('.login-card').hide().fadeIn(800);
    $('.form-group').each(function(index) {
        $(this).css({
            'opacity': 0,
            'transform': 'translateY(20px)'
        });
        
        setTimeout(() => {
            $(this).css('transition', 'all 0.5s ease')
                   .css({
                       'opacity': 1,
                       'transform': 'translateY(0)'
                   });
        }, 150 * (index + 1));
    });

    // Password visibility toggle
    $('.toggle-password').on('click', function() {
        const passwordInput = $('#password');
        const icon = $('#togglePasswordIcon');
        
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('bi-eye-slash').addClass('bi-eye');
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('bi-eye').addClass('bi-eye-slash');
        }
    });

    // Input focus effects
    $('.form-control').on('focus', function() {
        $(this).closest('.input-group').addClass('focused');
    }).on('blur', function() {
        $(this).closest('.input-group').removeClass('focused');
        
        // Basic validation on blur
        if ($(this).val().trim() !== '') {
            $(this).removeClass('is-invalid');
        }
    });

    // Form submission handling
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const email = $('#email');
        const password = $('#password');
        
        // Reset validation
        $('.form-control').removeClass('is-invalid');
        
        // Email validation (simple regex)
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.val())) {
            email.addClass('is-invalid');
            isValid = false;
            // Shake animation for invalid input
            email.closest('.form-group').animate({left: "-=10"}, 50)
                                        .animate({left: "+=20"}, 50)
                                        .animate({left: "-=20"}, 50)
                                        .animate({left: "+=10"}, 50);
        }
        
        // Password validation
        if (password.val().trim() === '') {
            password.addClass('is-invalid');
            isValid = false;
            password.closest('.form-group').animate({left: "-=10"}, 50)
                                           .animate({left: "+=20"}, 50)
                                           .animate({left: "-=20"}, 50)
                                           .animate({left: "+=10"}, 50);
        }
        
        if (isValid) {
            const btn = $('.btn-login');
            const btnText = btn.find('.btn-text');
            const spinner = btn.find('.spinner-border');
            
            // Show loading state
            btnText.addClass('d-none');
            spinner.removeClass('d-none');
            btn.prop('disabled', true);
            
            // Send request to MVC Controller
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.val(), password: password.val() })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    btn.removeClass('btn-primary').addClass('btn-success');
                    spinner.addClass('d-none');
                    btnText.text('Success!').removeClass('d-none');
                    setTimeout(() => {
                        $('.login-container').html(`
                            <div class="login-card p-4" style="width: 100%; height: 50vh; display: flex; justify-content: center; align-items: center; border-radius: 0;">
                                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/s7xj4Gibs_E?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="border: 4px solid var(--mc-stone-dark); border-top-color: var(--mc-stone-light); border-left-color: var(--mc-stone-light);"></iframe>
                            </div>
                        `);
                        $('.login-container').css({
                            'max-width': '800px',
                            'transition': 'max-width 0.5s ease'
                        });
                    }, 1000);
                } else {
                    spinner.addClass('d-none');
                    btnText.text('Sign In').removeClass('d-none');
                    btn.prop('disabled', false);
                    alert(data.message);
                    password.val('').addClass('is-invalid');
                }
            })
            .catch(error => {
                spinner.addClass('d-none');
                btnText.text('Sign In').removeClass('d-none');
                btn.prop('disabled', false);
                alert("An error occurred connecting to the server.");
            });
        }
    });
});
