<template>
  <div class="upload-img">
      <div class="upload-list" v-for="(item, index) in uploadList" :key="index">
          <template v-if="item.status === 'finished'">
              <img 
                @click="handleView(item.name)"
                :src="item.url" />
              <Icon
                type="md-remove-circle"
                @click.native="handleRemove(item)"
                color="red" size="20"/>
          </template>
          <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
      </div>
      <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="//jsonplaceholder.typicode.com/posts/"
          style="display: inline-block;width: 100px;">
          <div class="add-wrapper" v-if="uploadList.length < maxLen">
              <img src="./img/add.png" style="margin-top: 2px;"/>
          </div>
      </Upload>
      <Modal title="图片预览" v-model="visible">
          <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
      </Modal>
  </div>
</template>
<script>
    export default {
        name: 'uploadImg',
        props: {
            maxLen: {
              type: Number,
              default: 6
            },
            defaultList: {
                type: Array,
                default () {
                    return [
                        {
                            'name': 'a42bdcc1178e62b4694c830f028db5c0',
                            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                        },
                        {
                            'name': 'bc7521e033abdd1e92222d733590f104',
                            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                        }
                    ]
                }
            }
        },
        data () {
            return {
                imgName: '',
                visible: false,
                uploadList: []
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                console.log('file, ', file)
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < this.maxLen;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
<style lang="scss">
  .upload-img {
      width: 434px;
      .upload-list{
          display: inline-block;
          width: 102px;
          height: 67px;
          text-align: center;
          line-height: 60px;
          border: 1px solid transparent;
          border-radius: 4px;
          background: #fff;
          position: relative;
          box-shadow: 0 1px 1px rgba(0,0,0,.2);
          margin-right: 4px;
          .ivu-progress {
              overflow: hidden;
              vertical-align: super;
              .ivu-progress-outer {
                padding: 0;
                margin: 0;
                width: 60%;
            }
          }
          img {
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
      }
      .upload-list:hover .ivu-icon-md-remove-circle {
        display: block;
      }
      .ivu-icon-md-remove-circle {
        display: none;
        position: absolute;
        top: -7px;
        right: -7px;
        cursor: pointer;
      }
      .ivu-upload-drag {
          border: 0;
      }
      .add-wrapper {
           width: 100px;
           height: 65px;
           line-height: 65px;
           border: 1px dashed #dcdee2;

      }
      .add-wrapper:hover {
          border-color: #2d8cf0;
      }
  }
</style>
