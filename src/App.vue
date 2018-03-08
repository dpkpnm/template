<template>
	<div :class="gradient">
	  <div v-if="page=='main'">
	  	<div v-for="category in categories" @click="showPlayer(category)">{{category.name}}</div>
	  </div>
	  <div v-if="page=='player'">
	  	{{station.name}}
	  	{{station.url}}
	  </div>
	  <div v-if="page=='settings'">
	  	Settings
	  	<div @click="showPlayer" class=close>Close</div>
	  </div>
	  <footer v-if="page=='player'">
	  	<div @click="showMain">Main</div>
	  	<div>Prev</div>
	  	<div>Next</div>
	  	<div @click="showSettings">Settings</div>
	  </footer>
	</div>
</template>

<script>
import {db} from './firebaseconfig';
import _ from 'lodash';


export default {
  name: 'App',
  data: function () {
    return {
    	station:{},
   		page: 'main',
   		gradient:"gradient1",
   		categories: [
   			{name:"All India Radio",url:""},
   			{name:"FM",url:""},
   		]
    }
  },
  methods: {
  	showPlayer: function(station) {
  		this.page='player';
  		this.station = station || this.station;
  		this.gradient = "gradient2";
  	},
  	showMain: function() {
  		this.page="main";
  		this.gradient = "gradient1";
  	},
  	showSettings: function() {
  		this.page="settings";
  		this.gradient = "gradient3";
  	}
  }
}
</script>

<style type="text/css">
	* {margin:0; padding:0;}
	body {min-height:100%; color:#fff;}
	footer {display: flex; justify-content: center; align-items: center; position: absolute; bottom: 0; left:0; width:100%;}
	footer>div {flex-grow: 1; padding: 16px; text-align: center;}
	.close {position: absolute; right: 0; top: 0; padding: 16px;}
	.gradient1{background:#4ecdc4;background:linear-gradient(#4ecdc4,#556270); height:100vh;}
	.gradient2{background:linear-gradient(#da4453,#89216b); height:100vh;}
	.gradient3{background:linear-gradient(#26a0da,#314755); height:100vh;}
	.gradient4{background:linear-gradient(#f09819,#ff512f); height:100vh;}
</style>