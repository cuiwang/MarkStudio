export const dragMixin = {
  mounted() {
    this.disableDragEvent()
  },
  methods: {
    disableDragEvent() {
      window.addEventListener('dragenter', this.disableDrag, false)
      window.addEventListener('dragover', this.disableDrag)
      window.addEventListener('drop', this.disableDrag)
    },
    disableDrag(e) {
      const dropzone = document.getElementsByClassName('el-upload-dragger')
      if (dropzone === null || !dropzone.contains()) {
        e.preventDefault()
        e.dataTransfer.effectAllowed = 'none'
        e.dataTransfer.dropEffect = 'none'
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('dragenter', this.disableDrag, false)
    window.removeEventListener('dragover', this.disableDrag)
    window.removeEventListener('drop', this.disableDrag)
  }
}