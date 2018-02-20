<template>
  <div id="app">
    <div v-for="obj in downloadList" @click="getData(obj)">{{obj.name}} <span> sdfsf s{{obj.progress}}</span></div>
  </div>
</template>
<script>
  import {db} from './firebaseconfig';
  import _ from 'lodash';
  export default {
    name: 'App',
    data: function () {
      return {
        downloadList:[{name:"Trains", src: 'http://json.dpkpnm.com/trains1.zip',id: 'trains1db', progress:0, path:""}]
      }
    },
    methods: {
      getData: function(obj) {
        var sync = ContentSync.sync(obj);
        sync.on('progress', function(data) {obj.progress = data.progress;});
        sync.on('complete', function(data) { obj.path = data.localPath; });
        sync.on("error",function(data) {obj.err = data;})
      },

    }
  }
</script>

<style>
  * {margin:0; padding:0; box-sizing:border-box;}
  html {font-size: 18px;}
</style>
