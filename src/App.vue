<template>
  <div id="app">
    <a v-touch:pan="callback"></a>
    <h1>కార్టూన్లు</h1>
    <div>{{lastcard}}/{{cards[currentcard].name}}</div>
    <div class=wrapper>
    <div class="card loading"><div>Loading</div></div>
    <div :class="{card:true,clear:card.clear,favorite:card.favorite}" :style="{transform:'translateX(' + card.position +') rotate(' + card.rotate + 'deg)', 'transition-duration':card.duration+'s'}"  v-for="card in cards">
      <div class="clearcard"></div>
      <div class="favoritecard"></div>
      <div class="img" :style="{opacity:card.opacity}"><img :src="card.url"></div>
    </div>
    </div>
  </div>
</template>



<script>
import {db} from './firebaseconfig';
import _ from 'lodash';
// import { mapGetters,mapMutations } from 'vuex';


export default {
  name: 'App',
  data: function () {
    return {
      cards:[],
      currentcard:0,
      loading:false,
      lastcard:"",
      animating:false
    }
  },
  methods: {
    callback(direction) {
      var a = arguments[1];
      // console.log(a);
      if(a.direction==2 && !this.cards[this.currentcard].clear) {
        this.cards[this.currentcard].clear=true;
        this.cards[this.currentcard].favorite=false;
      }
      if(a.direction==4 && !this.cards[this.currentcard].favorite) {
        this.cards[this.currentcard].clear=false;
        this.cards[this.currentcard].favorite=true;
      }
      if(a.type=='panstart' && !this.animating) {
        this.animating=true;
        this.cards[this.currentcard].duration=0;
      }
      if(this.animating) {
        this.cards[this.currentcard].position=(a.deltaX*1.5)+"px";
        this.cards[this.currentcard].opacity=1-Math.abs(a.deltaX/innerWidth);
        this.cards[this.currentcard].rotate=a.deltaX/15;
      }
      if(a.isFinal && a.type=="panend") {
        var that =this;
        this.cards[this.currentcard].duration=.4;
        if(a.deltaX<-100){
          this.cards[this.currentcard].clear=true;
          this.cards[this.currentcard].position="-120%";
          this.nextCard();
        } else if(a.deltaX>100) {
          this.cards[this.currentcard].favorite=true;
          this.cards[this.currentcard].position="120%";
          this.nextCard();
        } else {
          this.cards[this.currentcard].position="0px";
          this.cards[this.currentcard].duration=.2;
          this.cards[this.currentcard].rotate=0;
          this.cards[this.currentcard].clear=false;
          this.cards[this.currentcard].clear=false;
          return;
        }
        this.animating=false;
        
          
      }
    },
    nextCard() {
      debugger;
      this.currentcard--;
      if(this.currentcard < 0) {
        this.getNextData();
        this.loading=true;
      }
    },
    getNextData() {
      var ref="";
      if(this.lastcard=="")
        ref = db.ref("cartoons").orderByChild("name").limitToFirst(5);
      else
        ref = db.ref("cartoons").startAt(this.lastcard).orderByChild("name").limitToFirst(5);
      var that = this;
      this.cards=[];
      ref.once("value", function(data){
        
        _(data.val()).each(function(v) {
          that.cards.push({url:v.url,favorite:false,clear:false,name:v.name,position:"0px",opacity:1,duration:0, rotation:0});
        })
        that.currentcard = that.cards.length-1;
        that.loading=false;
        // debugger;
        that.lastcard = that.cards[that.currentcard].name;
        // console.log(that.lastcard);

        // console.log( _(data.val()).map().value());
      })
    },
  },
  created() {
    this.getNextData();
  },
  
}
</script>

<style>
* {margin:0; padding:0; box-sizing:border-box;}
body {background:#add8df;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {margin: 16px;}
.wrapper {position:absolute; overflow:hidden; width:100vw; height:90vh; padding:64px 8px 0; }
.loading {display:flex; justify-content:center; align-items:center; }
.img { height:100%; width:100%; position:absolute; top:0; left:0; background-color:#fff}
.img img {object-fit: contain; width:100%; height:100%;}
a {z-index:100; position:fixed; width:100%; height:100%; left:0}
.card {height:80%; width:98%; position:absolute; box-shadow: 0 10px 7px -7px rgba(0,0,0,0.12), 0 0 4px rgba(0,0,0,0.1); background:#fff;}
.clear,.favorite {transition:transform .4s ease-in-out;}
.clearcard, .favoritecard {position:absolute; width:100%; height:100%; display:none;}
.clear .clearcard {opacity:1; background-color:red; display:block; }
.favorite .favoritecard { background-color:green; display:block;}
</style>
