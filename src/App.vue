<template>
	<div :class="gradient">
	<div class=container>
	  <div v-if="page=='main'" class="gradient2">
	  	<div v-for="(category,index) in categories" @click="showPlayer(index)" class="list">{{category.name}}</div>
	  </div>
	  <div v-if="page=='player'" class="player gradient2">
	  	<div class="center">
	  		<div>
	  			{{station.name}}
	  			
	  			<!-- {{station.url}} -->
	  		</div>
	  		<div class="material-icons playpause" v-if="isPlaying" @click="pause">pause_circle_outline</div>
	  		<div class="material-icons playpause" v-if="!isPlaying" @click="play">play_circle_outline</div>
	  	</div>
	  	<footer v-if="page=='player'">
		  	<div @click="showMain" class="material-icons">menu</div>
		  	<div class="material-icons" @click="changeStation(-1)">chevron_left</div>
		  	<div class="material-icons" @click="changeStation(1)">chevron_right</div>
		  	<div class="material-icons" @click="showSettings">settings</div>
		</footer>
	  </div>
	  <div v-if="page=='settings'" class="gradient3 settings">
	  	Settings
	  	<div @click="showPlayer()" class="close material-icons">close</div>
	  </div>
	</div>
	</div>
</template>

<script>
import {db} from './firebaseconfig';
import _ from 'lodash';


export default {
  name: 'App',
  data: function () {
    return {
    	player:null,
    	isPlaying:true,
    	cnStation:0,
   		page: 'main',
   		gradient:"gradient1",
   		categories: [
   			{name:"All India Radio",url:"http://airtelugu-lh.akamaihd.net/i/airtelugu_1@507818/index_1_a-b.m3u8?sd=10&rebase=on"},
   			{name:"Vividh Bharati",url:"https://vividhbharati-lh.akamaihd.net/i/vividhbharati_1@507811/master.m3u8"},
   		]
    }
  },
  computed: {
  	station: function() {
  		return this.categories[this.cnStation];
  	}
  },
  methods: {
  	showPlayer: function(index) {
  		this.page='player';
  		if(index>=0) {
  			this.cnStation = index;
        this.player.setStream(this.station.url);
        this.play();
      }
  	},
  	showMain: function() {
  		this.page="main";
  		this.gradient = "gradient1";
  	},
  	showSettings: function() {
  		this.page="settings";
  	},
  	changeStation: function(val) {
  		this.cnStation = this.cnStation+val;
  		if(this.cnStation == this.categories.length)
  			this.cnStation=0;
  		if(this.cnStation == -1)
  			this.cnStation=this.categories.length-1;
  	},
  	play: function() {
  		if(this.isPlaying)
  			return;
  		this.isPlaying=true;
      this.player.playPause();
  	},
  	pause: function() {
  		if(!this.isPlaying)
  			return;
  		this.isPlaying = false;
      this.player.playPause();
  	}
  },
  mounted() {
    this.player = window.ExoPlayer;
    this.player.show({
        url: '',
        userAgent: 'MyAwesomePlayer',
        autoPlay: false,
        audioOnly: true,
        connectTimeout: 5000,
        // controller: {
        //   hideProgress: true, // Hide entire progress timebar
        //   hidePosition: true, // If timebar is visible hide current position from it
        //   hideDuration: true, // If timebar is visible Hide stream duration from it
        //   controlIcons: {
        //     'exo_rew': 'http://url.to/rew.png',
        //     'exo_play': 'http://url.to/play.png',
        //     'exo_pause': 'http://url.to/pause.png',
        //     'exo_ffwd': 'http://url.to/ffwd.png'
        //   }
        // }
      })
    this.player.playPause();
  }
}
</script>

<style type="text/css">
	* {margin:0; padding:0;}

	html {font-size: 16px; font-family: Roboto;}
	body {font-size: 2rem;min-height:100%;}
	footer {display: flex; justify-content: center; align-items: center; position: absolute; bottom: 0; left:0; width:100%;}
	footer>div {flex-grow: 1; padding: 16px; text-align: center;}
	.center {text-align: center;}
	.container>div {height:100vh; color:#fff;}
	.list {padding: 2rem; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.3);}
	.gradient1{background:#4ecdc4;background:linear-gradient(#734b6d,#42275a);}
	.gradient2{background:linear-gradient(#da4453,#89216b);}
	.gradient3{background:linear-gradient(#3A6073,#16222A);}
	.gradient4{background:linear-gradient(#f09819,#ff512f);}
	.close {position: absolute; right: 0; top: 0; padding: 16px;}
	.material-icons {font-size: 2rem;}
	.player {height: 100vh; display: flex; align-items: center; justify-content: center; font-size: 2rem;}
	.playpause {font-size: 6rem; margin-top: 10rem; text-align: center;}
	#audioplayer {display: none;}
</style>