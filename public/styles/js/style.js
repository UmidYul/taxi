jQuery(document).ready(function ($) {
  $('.header-menu__link').on('click', function () {
    console.log($(this).attr('href').indexOf("#"));
    if ($(this).attr('href').indexOf("#") >= 0) {
      $('.header-burger').trigger('click');
    }
  });
  $('.jscatalog').on('mouseover', function () {
    $('.rightside-group').attr('style', 'margin-left:' + $('.catalog').children('ul').width() + 'px');
    $(this).parent().find('.catalog').addClass('catalog-display');
  });
  $('.catalog_main-item-li').on('mouseover', function () {
    $(this).parent().find('.show').removeClass('show').removeAttr('style');
  });
  $('.catalog_main-item').on('mouseover', function () {
    if ($(this).parent().find('.show')) {
      $(this).parent().find('.show').removeClass('show').removeAttr('style');
    }
    $(this).parent().find('[data-list="' + $(this).attr('data-item') + '"]').addClass('show').attr('style', 'z-index:10;margin-left:' + $('.catalog').children('ul').width() + 'px');
  });
  $('.catalog').on('mouseleave', function () {
    $(this).removeClass('catalog-display');
    $(this).find('.show').removeClass('show')
  });
  $('body').on('click', function () {
    $('.catalog').removeClass('catalog-display');
  });

  var CallButton = $(".btn__call-card-js");
  var CallData = document.getElementById("CallJs");

  CallButton.on("click", function (event) {
    event.preventDefault();
    var btn = event.currentTarget;

    function cityVal() {
      var city = btn.parentNode;
      city = $(city).find(".cards input[name=City]").val();
      return city;
    }


    function nameVal() {
      var name = btn.parentNode;
      name = $(name).find(".cards input[name=name]").val();
      return name;
    }


    function numberVal() {
      var number = btn.parentNode;
      number = $(number).find(".cards input[name=number]").val();
      return number;
    }


    function updateCartData() {
      var name = nameVal();
      var number = numberVal();
      var city = cityVal();
      var token = getToken();

      if (!number) {
        return false
      }

      return {
        csrfmiddlewaretoken: token,
        name: name,
        number: number,
		city: city,
      };
    }

	function puh() {
		$(".sent").addClass("active")
      setTimeout(function () {
        $(".sent").removeClass("active");
        }, 3000);

	}

    function getToken() {
      var token = btn.parentNode;
      token = $(token).find('input[name="csrfmiddlewaretoken"]').val();
      return token;
    }

    function sendPost(data) {
      var url = $(btn).data("url");
      var number = btn.parentNode;
      if (data === false) {
        $(number).find(".cards input[name=number]").addClass('error-number');
        return false
      } else {
        $(number).find(".cards input[name=number]").removeClass('error-number');
      }
	 // console.log(data);
	  $(".modal").removeClass("open");
      $.ajax({
        url: url,
        type: "POST",
        data: data,
        cache: true,
        success: function success(data) {
        puh()},
        error: function error() {},

      });
	  setTimeout(function () {
        $(".sent").removeClass("active");
        window.location.replace('https://xn--80aaaoevnuzqi.xn--p1acf/thanks');
        }, 100);
    }


    var data = updateCartData();
    sendPost(data);


  });
});
/* base */
$(document).ready(function () {
  $("input#city-field").val($.trim($(".header-address__caption span").text()));

  $(".header-burger").on("click", function (event) {
    event.preventDefault();
    $(this).toggleClass("active");
    $(".header-menu").toggleClass("active");
  });

  $(".header-address__caption").on("click", function () {
    $(this).find(".address-list").toggleClass("active");
  });

  $(".city-link__no").on("click", function (e) {
    e.preventDefault();
    $(".city").removeClass("active");
  });

  $(".js-modal-open").on("click", function (event) {
    event.preventDefault();
    var modal = $(this).attr("href");
    $(modal).addClass("open");
  });
  $(".modal").on("click", function (event) {
    if ($(event.target).is(".modal-close") || $(event.target).is(".modal")) {
      $(this).removeClass("open");
    }
  });
});

$("#filter").keyup(function () {
  var rex = new RegExp(".*(" + $(this).val() + ")+.*", "i");
  $(".row div").hide();
  $(".row div")
    .filter(function () {
      return rex.test(
        $(this)
          .text()
          .replace(/[^\wа-яё]+/gi, "")
      );
    })
    .show();
});

$("#filters").keyup(function () {
  var rex = new RegExp(".*(" + $(this).val() + ")+.*", "i");
  $(".row-2 div").hide();
  $(".row-2 div")
    .filter(function () {
      return rex.test(
        $(this)
          .text()
          .replace(/[^\wа-яё]+/gi, "")
      );
    })
    .show();
});

$(function () {
  $('[data-toggle="popover"]').popover();
});
$(".popover-dismiss").popover({
  trigger: "focus",
});



$(function() {
  $(".js-masked-phone").mask("+0(000)000-00-0000000", {
    placeholder: "+7(___)___-__-__",
    clearIfNotMatch: false
  });
});

$(document).ready(function(){

  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  $('.scrollup').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });


  function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  let cookie_city = getCookie('city');
  if (!cookie_city || cookie_city == undefined || cookie_city == null) {
    $('#city_choose').trigger('click');
  }
  $('body').on('click', '#city_ye', function () {
      document.cookie = "city=" + $('#city_trigger').data('city') + "; path=/; expires=Tue, 1 Jan 2025 00:11:11 GMT";
       $('#city_choose').trigger('click');
  });
  $('body').on('click', '#city_no', function () {
      document.cookie = "city=" + $('#city_trigger').data('city') + "; path=/; expires=Thu, 1 Jan 1970 00:00:00 GMT";
      if (document.documentElement.clientWidth < 1090) {
        document.location.href = '/cities';
      } else {
        $('#city_choose').trigger('click');
        $('#city_trigger').trigger('click');
      }
  });
  $('.address-list__link').click(function () {
      document.cookie = "city=" + $(this).data('city') + "; path=/; expires=Tue, 1 Jan 2025 00:11:11 GMT";
      document.location.href = $(this).data('href');
  });

  $('.conditions-items').click(function () {
      document.cookie = "city=" + $(this).data('city') + "; path=/; expires=Tue, 1 Jan 2025 00:11:11 GMT";
      document.location.href = $(this).data('href');
  });

  $('.js-view').on('mouseover', function (){
    let shadow = $('.why-shadow');
    let texts = shadow.find('p')
    texts.text($(this).data('content'));
    shadow.fadeIn(500);
    texts.fadeIn(500)
  });
  $('.why-shadow').on('click', function () {
    let shadow = $('.why-shadow');
    let texts = shadow.find('p')
    shadow.fadeOut(500);
  });

});




