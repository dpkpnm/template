<template>
	<div id=app :class="gradient">
  <div class=arrowtop @click="changeGradient(-1)"></div>
		<div id=main>
				<transition name='bounce' :duration="{ enter: 500, leave: 0 }">
					<div key=question id=question v-if="!answer">
						<div @click="answer=true">$</div>
						<transition key=fade name="fade" :duration="{enter:1000, leave:0}">
							<div class="center small" v-if="title">{{title}}</div>
						</transition>
					</div>
					<div key=answer id=answer v-else>
						<div class="circle white" v-if="image" @click="changeGradient(1)">$</div>
					</div>
				</transition>
		</div>
		<div class=arrowbottom @click="changeGradient(1)"></div>
	</div>
</template>



<script>
import {db} from './firebaseconfig';
import _ from 'lodash';


export default {
  name: 'App',
  data: function () {
    return {
   	 message: 'Hello Vue!',
	    currentGradient: 1,
	    image:true,
	    title:"title",
	    answer: false

    }
  },
  computed: {
	  	gradient: function() {
	  		return "gradient"+this.currentGradient;
	  	}
	  },
	  methods: {
	  	changeGradient: function(dir) {
	  		this.answer=false;
	  		this.currentGradient = this.currentGradient+dir;
	  		this.title="title"+this.currentGradient;
	  	}
	  }

}
</script>
<style>
	*{margin:0;padding:0;box-sizing:border-box;}
	#app{width:100vw;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;}

	.gradient1{background:#4ecdc4;background:linear-gradient(#4ecdc4,#556270);}
	.gradient2{background:linear-gradient(#da4453,#89216b);}
	.gradient3{background:linear-gradient(#26a0da,#314755);}
	.gradient4{background:linear-gradient(#f09819,#ff512f);}
	.arrowtop,.arrowbottom{text-align:center;background:transparent;opacity:0.5;}
	.arrowtop::after{content:"\2191";font-size:2rem;}
	.arrowbottom::after{content:"\2193";font-size:2rem;}
	#main{flex-grow:1;color:#fff;font-size:4rem;display:flex;flex-direction:column;justify-content:center;align-items:center;}
	.fade-enter-active,.fade-leave-active{transition:opacity .5s;}
	.fade-enter,.fade-leave-to{opacity:0;}
	.bounce-enter-active{animation:bounce-in .5s;}
	.bounce-leave-active{animation:bounce-in .5s reverse;}
	@keyframes bounce-in{
		0%{transform:scale(0);opacity:0;}
		50%{transform:scale(1.5);opacity:0.5;}
		100%{transform:scale(1);opacity:1;}
	}
	.circle{border-radius:50%;padding:32px;background:rgba(0,0,0,0.1);width:8rem;height:8rem;text-align:center;}
	.white{background:rgba(255,255,255,1);color:black;}
	#question,#answer{position:absolute;}
	.center{text-align:center;}
	.small{font-size:2rem;color:rgba(255,255,255,0.6);padding-top:16px;}

</style>
