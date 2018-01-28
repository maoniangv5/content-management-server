<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <hr>
    <div>
      <button id="pickfiles">选择文件</button>
      <button id="upload">开始上传</button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
import { mapState, mapMutations } from "vuex";
import store from "@/store/store";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  store,
  computed: mapState(["imgUToken"]),
  methods: {
    ...mapMutations(["updateToken"]),
    initUpload(uptoken) {
      var uploader = Qiniu.uploader({
        runtimes: "html5",
        browse_button: "pickfiles",
        uptoken: uptoken,
        get_new_uptoken: false,
        unique_names: false,
        save_key: true,
        domain: "http://p366az0kg.bkt.clouddn.com/",
        max_file_size: "100mb",
        max_retries: 3,
        dragdrop: false,
        chunk_size: "4mb",
        auto_start: false,
        multi_selection: false,
        filters: {
          mime_types: [
            { title: "Image files", extensions: "jpg,png,jpeg,gif" }
          ]
        },
        init: {
          PostInit: function(up) {
            document.getElementById("upload").onclick = function() {
              up.start();
              return false;
            };
          },
          FileUploaded: function(up, file, info) {
            var domain = up.getOption("domain");
            var res = JSON.parse(info.response);
            var sourceLink = domain + res.key;
            console.log(sourceLink);
          },
          Error: function(up, err, errTip) {
            console.log(err);
          }
        }
      });
    },
    getToken() {
      let _this = this;
      Axios.get("http://54.178.220.145:3001/api/imgUToken")
        .then(function(response) {
          _this.initUpload(response.data.result.uploadToken);
          _this.updateToken(response.data.result.uploadToken);
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  created() {
    this.getToken();
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
