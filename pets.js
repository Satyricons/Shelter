// 1. Отправляем запрос к файлу
fetch('data.json')
  // 2. Обрабатываем ответ от сервера
  .then(response => {
      // Проверяем, был ли запрос успешным
      if (!response.ok) {
          // Если нет (например, файл не найден), выбрасываем ошибку
          throw new Error(`Ошибка при загрузке файла: ${response.status}`);
      }
      // Если все хорошо, преобразуем ответ в JSON-объект
      return response.json();
  })
  // 3. Работаем с полученными данными
  .then(list => {
      // В этой переменной 'data' теперь находится обычный JavaScript-массив с объектами

      




//Инициализация
let countPages, pix, page
reinit()

//Заполняем контейнер

for (let i = 0; i < list.length; i++) {
  document.querySelector('.slides_our_pets').insertAdjacentHTML(
    'beforeend',
    `<div class="slide_pets">
                    <div class="img_slide"><img src=${list[i].img} alt=""></div>
                    <div class="name_slide">${list[i].name}</div>
                    <button class="button_slide" onclick=showPet(${i})>Learn more</button>
                </div>`
  )
}

function reinit () {
  document.querySelector('.next').addEventListener('click', next)
  document.querySelector('.prev').addEventListener('click', prev)
  document.querySelector('.next_end').addEventListener('click', next_end)
  document.querySelector('.prev_start').addEventListener('click', prev_start)
  document.querySelector('.burger').addEventListener('click', openBurger)
  
  document.querySelector(
    '.container_slides_our_pets'
  ).style.transform = `translate(0px)`
  page = 0
  setPage(page)
  buttonStatus('prev', 'inactive')
  buttonStatus('next_end', 'active')
  //Кол-во страниц относительно размера экрана:
  countPages =
    window.innerWidth >= 1280
      ? list.length / 8
      : window.innerWidth >= 768
      ? list.length / 6
      : window.innerWidth >= 320
      ? list.length / 3
      : 1
if(!document.querySelector('.container_modal_menu')&(window.innerWidth < 768)){
      document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="container_modal_menu">
    <nav class="mob_nav-menu_pets">
          <ul>
            <li><a href="./index.html#about">About the shelter</a></li>
            <li id="active_a_pets"><a href="./pets.html#pets">Our pets</a></li>
            <li><a href="./index.html#help">Help the shelter</a></li>
            <li><a href="./pets.html#contacts">Contacts</a></li>
          </ul>
        </nav>    
    </div>`
  )
  document.querySelector('.container_modal_menu').addEventListener('click', closeBurger)
} else if(window.innerWidth < 768) {document.querySelector('.container_modal_menu').setAttribute('id', 'inactive')}


}

function setPage (page) {
  document.querySelector('.page_pets').innerHTML = page + 1
}

function buttonStatus (button, status) {
  if (button === 'prev') {
    document.querySelector('.prev').setAttribute('id', status)
    document.querySelector('.prev_start').setAttribute('id', status)
  }
  if (button === 'next_end') {
    document.querySelector('.next_end').setAttribute('id', status)
  }
}

//Сдвиг слайдеров

function next () {
  pix = -(document.querySelector('.container_show_our_pets').clientWidth + 40)
  if (page + 1 < countPages) {
    page++
    setPage(page)
    buttonStatus('prev', 'active')
    document.querySelector(
      '.container_slides_our_pets'
    ).style.transform = `translate(${pix * page}px)`
    if (page + 1 === countPages) buttonStatus('next_end', 'inactive')
  } else reinit()
}

function next_end () {
  if (page < countPages) {
    pix = -(document.querySelector('.container_show_our_pets').clientWidth + 40)
    page = Math.round(countPages) - 1
    setPage(page)
    buttonStatus('prev', 'active')

    document.querySelector(
      '.container_slides_our_pets'
    ).style.transform = `translate(${pix * page}px)`

    buttonStatus('next_end', 'inactive')
  }
}

function prev () {
  if (page > 0) {
    page--
    console.log(page, pix * page)
    setPage(page)
    buttonStatus('next_end', 'active')
    document.querySelector(
      '.container_slides_our_pets'
    ).style.transform = `translate(${pix * page}px)`
    if (page < 1) buttonStatus('prev', 'inactive')
  }
}

function prev_start () {
  reinit()
}

// отследить событие изменения окна
// window.addEventListener('resize', function () {
//   reinit()
// })


let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
  const currentWidth = window.innerWidth;

  if (currentWidth !== lastWidth) {
    console.log(`Ширина изменена! Текущая ширина: ${currentWidth}px`);
    // здесь ваш код, который выполнится при изменении ширины
    reinit();
    lastWidth = currentWidth; // обновляем сохраненное значение
  }
});


//Модальное окно при нажатии кнопки
function showPet (id) {
  document.body.insertAdjacentHTML(
    'beforeend',
    `<div class="container_modal">
    <div class="modal">
    <img src=${list[id].img} alt="">
    </div>
    <img onclick=closePet() class="close_modal" src="./img/modal_close_button.png">
    </div>`
  )
}

function closePet () {
  document.querySelector('.container_modal').remove()
}

//Меню мобильной версии

function openBurger () {
  if (!document.getElementById('active_menu')){document.querySelector('.container_modal_menu').setAttribute('id', 'active_menu')}
  else{document.querySelector('.container_modal_menu').setAttribute('id', 'inactive_menu')}  
}

function closeBurger (){
  document.querySelector('.container_modal_menu').setAttribute('id', 'inactive_menu')
}

  })
  // 4. Обрабатываем возможные ошибки (например, файл не найден)
  .catch(error => {
      console.error('Произошла ошибка:', error);
  });

  
