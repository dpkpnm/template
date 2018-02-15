<template>
  <div id="app">
    <div v-for="obj from downloadList" @click="download(obj)">{{obj.name}} <span>{{obj.progress}}</span></div>
  </div>
</template>
<script>
  import {db} from './firebaseconfig';
  import _ from 'lodash';
  export default {
    name: 'App',
    data: function () {
      return {
        downloadList:[{name:"Trains", src: 'http://json.dpkpnm.com/trains1.zip',id: 'trains1db'}]
      }
    },
    methods: {
      download: function(obj) {
        var sync = ContentSync.sync(obj);
        sync.on('progress', function(data) {obj.progress = data.progress;});
        sync.on('complete', function(data) { obj.path = data.localPath; });
        sync.on("error",function(data) {obj.err = data;})
      },

    },
    mounted() {

    }
  }
</script>

<style>
  * {margin:0; padding:0; box-sizing:border-box;}
</style>
