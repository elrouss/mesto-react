<h1 align="center">Учебный проект: "Место"</h1>

<div align="center">
  <a href="https://elrouss.github.io/mesto-react/">
    <img src="https://user-images.githubusercontent.com/108838349/212987501-fb372d45-e9c6-43c6-8f18-7cb212535021.gif" width="550" alt="Гиф с демонстрацией функционала приложения">
  </a>
</div>

## 1. Описание проекта
Данная проектная работа выполнена в рамках образовательной программы <a href="https://practicum.yandex.ru/">Яндекс Практикума</a>. Проект представляет собой портирование на "React" адаптивного приложения с профилем пользователя и фотокарточками, <a href="https://github.com/elrouss/mesto">изначально написанного</a> на нативных технологиях: HTML5, CSS3 и JavaScript. Он похож по своему типу и функционалу на популярные соцсети: Instagram, Facebook, VKontakte, - расширенный <a href="https://github.com/elrouss/react-mesto-auth">в следующей учебной работе</a> добавлением формы регистрации и авторизации пользователей

#### Ссылка на проект: https://elrouss.github.io/mesto-react/
<i>* - проект прошел обязательное код-ревью</i>

## 2. Стек технологий
<span>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="Иконка React">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="Иконка CSS3">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="Иконка HTML5">
</span>

## 3. Установка и запуск приложения в локальном репозитории
1. `git clone https://github.com/elrouss/mesto-react.git` - клонировать репозиторий (с использованием HTTPS) на свое устройство
2. `npm i` - установить зависимости
3. `npm run start` - запустить приложение в режиме разработчика (в браузере ввести ссылку `http://localhost:3000/`, если приложение не открылось там автоматически)

## 4. Процесс создания
Работа разделена на <b>2</b> этапа:
1. Портирование  HTML-разметки, CSS-стилей, реализация открытия и закрытия 5 модальных окон (<a href="https://github.com/elrouss/mesto-react/blob/main/src/components/EditProfilePopup/EditProfilePopup.js">EditProfilePopup</a>, <a href="https://github.com/elrouss/mesto-react/blob/main/src/components/EditAvatarPopup/EditAvatarPopup.js">EditAvatarPopup</a>, <a href="https://github.com/elrouss/mesto-react/blob/main/src/components/AddPlacePopup/AddPlacePopup.js">AddPlacePopup</a>, <a href="https://github.com/elrouss/mesto-react/blob/main/src/components/ConfirmCardDeletionPopup/ConfirmCardDeletionPopup.js">ConfirmCardDeletionPopup</a>, <a href="https://github.com/elrouss/mesto-react/blob/main/src/components/ImagePopup/ImagePopup.js">ImagePopup</a>), загрузка данных с сервера
2. Написание функционала с передачей данных на сервер (см. п.5)

### 4.1 Основные задачи, проблемы и их решение
1. <b>Удаление карточки</b> в окне подтверждения
<p>
  <b>Решение:</b> <a href="https://github.com/elrouss/mesto-react/commit/9056b9457df3269575a711dc209880f79c70adfd">при реализации окна подтверждения удаления карточки</a> сделовало учесть прокидывание <b>_id</b> конкретно открытой карточки, в противном случае либо не работала функция удаления, либо предпринималась попытка удаления всех карточек в галерее (неудачная в связи с контролем сервера). Для этого был создан стейт <b>activeCardId</b>, в который записывается <b>_id</b> открываемой карточки и соответственно используется в функции ее удаления
</p>

2. <b>Пустые элементы верстки</b> и <b>"дерганье"</b> в процессе отрисовки после получения данных с сервера
<p>
  <b>Решение:</b> для скрытия страницы до ответа с сервера и вставки их в верстку <a href="https://github.com/elrouss/mesto-react/commit/534d12d58c6c991bb51342c284c585621e2b7c8c">добавлено</a> окно-заглушка
</p>

3. <b>Валидация форм</b> и <b>усиленный контроль</b> за типом данных, вводимых пользователем
<p>
  <b>Решение:</b> для валидации форм <a href="https://github.com/elrouss/mesto-react/commit/83aee0d7d40ed688131e90a2136b6136910f807e">написана логика</a>, которая проверяет в компонентах сохраняемые в стейтах данные, вводимые пользователем в инпутах (url, длина слова). Далее в зависимости от установленных правил отдельная функция проверяет, можно ли считать форму валидной или нет, и пробрасывает булево значение через пропс в родительский компонент <b>PopupWithForm</b>. Там в свою очередь стилизуется и блокируется/активируется кнопка того или иного дочернего компонента формы. <a href="https://github.com/elrouss/mesto-react/commit/3b6241c4ad5463069972cb8bd0ea59651b6b8a2d">Кроме того</a>, во избежание передачи url-ов, которые могли бы случайно начинаться с пустого пробела (следовательно, вызывать ошибку при сабмите), и двойных пробелов при отправке данных на сервер методом <b>trim</b> обрезаются лишние пробелы по краям, а <b>регулярным выражением</b> убираются все неодинарные пробелы
</p>

4. Проблема <b>добавления</b> пользователем <b>нескольких однотипных карточек</b> при клике на кнопку сабмита в процесса обмена данными с сервером
<p>
  <b>Решение:</b> <a href="https://github.com/elrouss/mesto-react/commit/b5de99695437d5d1727c9922fc64a007d8fd61a6">блокировать кнопку</a>
</p>

## 5. Функционал
- Адаптивный интерфейс
- Открытие и закрытие модальных окон (по кнопке, <b><i>оверлею</i></b> и <b><i>клавише "Escape"</i></b>)
- Модальное окно с увеличенной фотографией карточки
- Редактирование информации пользователя
- Обновление аватара
- Добавление новой карточки
- Добавление и снятие лайка (включая счетчик лайков)
- Удаление карточки <b><i>с модальным окном подтверждения действия</i></b>
- <b><i>Спиннеры загрузки</i></b>
- <b><i>Валидация форм</i></b>
- <b><i>Окно предварительной загрузки страницы</i></b>
<br>
<b><i>* - жирным курсивом выделен дополнительный функционал, не входящий в обязательный перечень требований для получения зачета по проектной работе</i></b>

## 6. Планы по доработке
- ~~Исправление ошибки при закрытии модального окна с фотографией карточки (реализовано <a href="https://github.com/elrouss/react-mesto-auth">в следующем проекте</a>)~~
- ~~Оптимизирование валидации форм под кастомный хук (также реализовано <a href="https://github.com/elrouss/react-mesto-auth">в следующем проекте</a>)~~
- Оптимизация приложения для людей с ограниченными возможностями (напр., label для инпутов форм)
- Добавление автоматического обновления галереи карточек
- Добавление функции сабмита форм нажатием на клавишу "Enter" (в настоящий момент работает только в случае клика пользоватем по полю формы)

<div align="center">
  <a href="https://elrouss.github.io/mesto-react/">
    <img width="370" src="https://user-images.githubusercontent.com/108838349/212988411-b9432993-edba-453d-8a73-334faf7f2f87.png">
  </a>
  <a href="https://elrouss.github.io/mesto-react/">
    <img width="450" src="https://user-images.githubusercontent.com/108838349/212988602-f0b32fcd-88a0-4135-8d3a-81fa35de94a9.png">
  </a>
</div>


