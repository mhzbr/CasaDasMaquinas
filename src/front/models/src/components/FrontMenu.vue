<template>
    <div class="list-container">
      <ul class="list">
        <li v-for="item in items" :key="item.text" class="list-item">
          <a class="list-item-text" :href="item.link">{{ item.text }}</a>
          <span v-html="item.svg" class="svg-container"></span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [
          { text: "Menu Item 1", link: "#", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>' },
          { text: "Menu Item 2", link: "#", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>' },
          { text: "Menu Item 3", link: "#", svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24"><path d="M223.11 224.09c79.5 0 144-64.5 144-144C367.11 64.5 302.61 0 223.11 0c-79.5 0-144 64.5-144 144 0 79.5 64.5 144 144 144zm0 48c-70.69 0-128 57.31-128 128v16c0 13.25 10.75 24 24 24h208c13.25 0 24-10.75 24-24v-16c0-70.69-57.31-128-128-128zm120.59-48c-79.5 0-144 64.5-144 144 0 79.5 64.5 144 144 144 79.5 0 144-64.5 144-144 0-79.5-64.5-144-144-144zm0 48c70.69 0 128 57.31 128 128v16c0 13.25-10.75 24-24 24h-208c-13.25 0-24-10.75-24-24v-16c0-70.69 57.31-128 128-128z"/></svg>' }
        ]
      };
    }
  };
  </script>
  
  <style>
  .list-container {
      position: absolute;
      top: 50px;
      left: 0;
      width: 250px;
      background-color: white;
      border-width: 0 3px 3px 0; /* top, right, bottom, left */
      border-style: solid;
      border-color: black;
      border-radius: 0  0 25px 0;
      z-index: 9999;
  }
  
  .list {
      align-items: center;
      list-style-type: none;
      padding: 0;
  }
  
  .list-item {
      display: flex;
      justify-content: space-around;
      padding: 15px;
  }
  
  .list-item-text {
      font-weight: bold;
  }
  
  .svg-container {
      width: 24px;
      height: 24px;
  }
  </style>
  