<template>
	<div>
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
  	},
  	showMain: function() {
  		this.page="main";
  	},
  	showSettings: function() {
  		this.page="settings";
  	}
  }
}
</script>

<style type="text/css">
	footer {display: flex; justify-content: center; align-items: center; position: absolute; bottom: 0; left:0; width:100%;}
	footer>div {flex-grow: 1; padding: 16px; text-align: center;}
	.close {position: absolute; right: 0; top: 0; padding: 16px;}
</style>