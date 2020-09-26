<template>
  <div class="about">
    <b-container>
      <h1>Bookmate - библиотека на VueJS реализующая функционала библиотеки книг</h1>
      <b-card-group deck>
        <b-card
            align="left"
            border-variant="primary"
            style="max-width: 40rem;"
            sub-title=""
            title="Добавить стейт в приложение"
        >
          <b-card-text>
            Цель: Подключать и сконфигурировать роутер, добавлять чтение параметров
            адреса внутри компонентов вызвать хуки при переходе на определенный route.
            Научиться использовать vuex знать что такое гетеры, мутации и экшены
          </b-card-text>

          <b-card-text>
            Какие скиллы тренируем в ДЗ:
            <ul>
              <li>работа с глобальным стейтом приложения</li>
              <li>получение данных из стейта в компонентах</li>
              <li>вызов экшенов и мутаций из компонентов</li>
              <li>работа с vue-router, добавление вложенных роутов, знание хуков роутера</li>
            </ul>
          </b-card-text>

          <template v-slot:header>
            <a class="card-link" target="_blank" href="https://github.com/phpclub/bookmate/tree/hw3"><b-icon-globe></b-icon-globe> GitHub: Версия #hw3</a>
          </template>
        </b-card>


        <b-card
            align="left"
            border-variant="primary"
            style="max-width: 40rem;"
            sub-title=""
            title="Реализовать несколько форм и списков"
        >
          <b-card-text>Цель: Научится создавать формы и работать с данными в приложении</b-card-text>

          <b-card-text>Какие скиллы тренируем в ДЗ:
            <ul>
              <li>работа с формами</li>
              <li>передача данных между компонентами</li>
            </ul>
          </b-card-text>


          <template v-slot:header>
            <a class="card-link" target="_blank" href="https://github.com/phpclub/bookmate/tree/hw2"><b-icon-globe></b-icon-globe> GitHub: Версия #hw2</a>
          </template>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>
