(function () {
  if (!$ || !$.validator) return;

  $.extend($.validator.messages, {
    required: "Это поле обязательно",
    remote: "Пожалуйста, введите правильное значение.",
    email: "Пожалуйста, введите корректный e-mail",
    url: "Пожалуйста, введите корректный URL.",
    date: "Пожалуйста, введите корректную дату.",
    dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
    number: "Пожалуйста, введите число.",
    digits: "Пожалуйста, вводите только цифры.",
    creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
    equalTo: "Пароли не совпадают!",
    extension: "Пожалуйста, выберите файл с правильным расширением.",
    maxlength: $.validator.format(
      "Пожалуйста, введите не больше {0} символов."
    ),
    minlength: $.validator.format(
      "Пожалуйста, введите не меньше {0} символов."
    ),
    rangelength: $.validator.format(
      "Пожалуйста, введите значение длиной от {0} до {1} символов."
    ),
    range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
    max: $.validator.format(
      "Пожалуйста, введите число, меньшее или равное {0}."
    ),
    min: $.validator.format(
      "Пожалуйста, введите число, большее или равное {0}."
    ),
  });

  $.validator.addMethod(
    "email",
    function (value, element) {
      return (
        this.optional(element) ||
        /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,6}$/.test(value)
      );
    },
    "Введите корректный e-mail"
  );

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  var eventForm = $("#js-eventForm");

  if (eventForm.length) {
    eventForm.validate({
      errorElement: "span",
    });
  }

  var subscribeForm = $("#js-subscribeForm");

  if (subscribeForm.length) {
    const subscribeEmail = subscribeForm.find("#js-subscribeEmail");
    const subscribeAction = subscribeForm.attr("action");

    subscribeForm.validate({
      errorElement: "span",
      submitHandler: function (form, event) {
        event.preventDefault();

        $.ajax({
          url: subscribeAction,
          data: {
            email: subscribeEmail.val()
          },
          method: "POST",
          success: function () {
            subscribeEmail.val("");
            subscribeEmail.blur();
            toastr.success("Вы успешно подписались на рассылку новостей", "");
          },
          error: function () {
            toastr.error("Попробуйте еще раз", "Ошибка");
          }
        });

        // fetch(subscribeAction, {
        //   method: "POST",
        //   body: {
        //     email: subscribeEmail.val(),
        //   },
        // })
        //   .then(() => {
        //     subscribeEmail.val("");
        //     subscribeEmail.blur();
        //     toastr.success("Вы успешно подписались на рассылку новостей", "");
        //   })
        //   .catch(() => {
        //     toastr.error("Попробуйте еще раз", "Ошибка");
        //   });
      },
    });
  }

  const reserve = $("#js-reserve");
  if (reserve.length) {
    const reservePrice = JSON.parse(reserve.attr("data-price"));
    const reserveTypes = Object.keys(reservePrice);
    const reserveTicketsData = {};

    const reserveCheck = reserve.find(".js-reserveCheck");
    const reserveScene = reserve.find("#js-reserveScene");

    const reservePriceList = reserve.find("#js-reservePriceList");
    const reservePriceCaption = reservePriceList.attr("data-caption");

    const reserveTicketsList = reserve.find("#js-reserveTicketsList");
    const reserveTicketsCaption = reserveTicketsList.attr("data-caption");
    const reserveTicketsCurrency = reserveTicketsList.attr("data-currency");

    const reserveTotal = reserve.find("#js-reserveTotal");
    const reserveSubmit = reserve.find("#js-reserveSubmit");

    const sumReserve = function () {
      let total = 0;

      reserveTypes.forEach(function (type) {
        const qty = reserveTicketsData[type].qty;
        const sum = reserveTicketsData[type].qty * reservePrice[type];
        reserveTicketsData[type].qtyEl.html(qty);
        reserveTicketsData[type].sumEl.html(numberWithSpaces(sum));
        total += sum;
      });

      reserveTotal.html(numberWithSpaces(total));

      if (total > 0) {
        reserveSubmit.removeClass("btn--disabled");
      } else {
        reserveSubmit.addClass("btn--disabled");
      }
    };

    reserveTypes.forEach(function (type) {
      reservePriceList.append(
        `<div class="reserve__price-item reserve__price-item--${type}" "data-caption="${reservePriceCaption}">
           ${reservePrice[type]} +
         </div>`
      );

      const reserveTicketsEl = $('<div class="reserve__tickets">');
      const reserveQtyEl = $(
        `<div class="reserve__qty" data-caption="${reserveTicketsCaption}" data-price="${reservePrice[type]}">`
      );
      const reserveSumEl = $(
        `<div class="reserve__sum" data-currency="${reserveTicketsCurrency}">`
      );

      reserveTicketsEl.append(reserveQtyEl);
      reserveTicketsEl.append(reserveSumEl);

      reserveTicketsList.append(reserveTicketsEl);

      reserveTicketsData[type] = {};
      reserveTicketsData[type].qty = 0;
      reserveTicketsData[type].qtyEl = reserveQtyEl;
      reserveTicketsData[type].sumEl = reserveSumEl;
    });

    $.each(reserveCheck, function (i) {
      const check = this;
      const name = $(check).attr("name");
      if (!name) return;
      const sceneTable = reserveScene.find("[data-check=" + name + "]");
      if ($(this).attr("disabled")) {
        sceneTable.addClass("scene__table--disabled");
        return;
      }

      const type = $(check).attr("data-type") || "black";

      if (check.checked) {
        reserveTicketsData[type].qty += 1;
        sceneTable.addClass("scene__table--active");
      }

      $(check).on("change", function () {
        if (this.checked) {
          reserveTicketsData[type].qty += 1;
          sceneTable.addClass("scene__table--active");
        } else {
          if (reserveTicketsData[type].qty > 0)
            reserveTicketsData[type].qty -= 1;
          sceneTable.removeClass("scene__table--active");
        }

        sumReserve();
      });

      sceneTable.on("click", function () {
        check.checked = !check.checked;
        $(check).trigger("change");
      });
    });

    sumReserve();

    // reserve.validate({
    //   errorElement: "span"
    // });
  }
})();
