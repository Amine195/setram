// SideNav Button Initialization
$(".button-collapse").sideNav();
// SideNav Scrollbar Initialization
var sideNavScrollbar = document.querySelector('.custom-scrollbar');
Ps.initialize(sideNavScrollbar);

// Material Select Initialization
$(document).ready(function() {
    $('.mdb-select').material_select();
});

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();

// Stiky Content
$(function () {
  $(".sticky").sticky({
      topSpacing: 90
      , zIndex: 2
      , stopper: "#footer"
  });
});

// Data Picker Initialization
$('.datepicker').pickadate();

// Time Picker Initialization
$('#input_starttime').pickatime({
  twelvehour: true,
});

// Toastr Options
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": 300,
  "hideDuration": 1000,
  "timeOut": 5000,
  "extendedTimeOut": 1000,
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

// Switch event handler
$(document).ready(()=>{
  $("[name='approveComment']").on('switchChange.bootstrapSwitch', function(e, data){

    const id = $(this).attr('data-id');

    $.ajax({
      type: "POST",
      url: '/admin/comments/approve-comment',
      data: {id: id, approveComment: data},
      cache: false,
      success: function(data){
        toastr["success"](`Comment with id ${data._id} was updated`, "SUCCESS")
      }
    });
  });
});