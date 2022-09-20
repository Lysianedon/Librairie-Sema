<template>
    <div>
        <h1>FORM</h1>

        <!-- <img :src="imageUrl" alt="image" > -->
        <img src="https://i.ibb.co/wMggCCf/1507-1.jpg" alt="image" height="400">

        <input
        type="file"
        name="image"
        id="image"
        style="display: none"
        ref="fileInput"
        accept="image/*"
        @change="onFilePicked">
        <button @click="onPickFile">Select image</button>
    </div>
</template>

<script>
export default ({
  name: 'FormVue',
  data () {
    return {
      myForm: 'Ceci est un formulaire',
      imageUrl: '',
      image: null,
      title: '',
      location: '',
      description: '',
      date: null,
      test: ''
    }
  },
  methods: {
    // onCreateMeetup () {
    //   if (!this.formIsValid) {
    //     return
    //   }
    //   if (!this.image) {
    //     return
    //   }
    //   const meetupData = {
    //     title: this.title,
    //     location: this.location,
    //     imageUrl: this.imageUrl,
    //     description: this.description,
    //     date: this.submittableDateTime
    //   }
    //   this.$store.dispatch('createMeetup', meetupData)
    //   this.$router.push('/meetups')
    // },

    onPickFile () {
      this.$refs.fileInput.click()
    },
    // onFilePicked (e) {
    //   const files = e.target.files
    //   const filename = files[0].name
    //   console.log(filename)
    //   if (filename.lastIndexOf('.') <= 0) {
    //     return alert('Please add a valid image !')
    //   }
    //   const fileReader = new FileReader()
    //   console.log(fileReader)
    //   fileReader.addEventListener('load', () => {
    //     this.imageUrl = fileReader.result
    //     console.log(fileReader.result)
    //     // console.log('fileReader', fileReader)
    //   })
    //   fileReader.readAsDataURL(files[0])
    //   this.image = files[0]
    // }

    onFilePicked () {
      const preview = document.querySelector('img')
      const file = document.querySelector('input[type=file]').files[0]
      const reader = new FileReader()

      reader.addEventListener('load', () => {
        // on convertit l'image en une chaîne de caractères base64
        preview.src = reader.result
        console.log(reader.result)
      }, false)

      if (file) {
        reader.readAsDataURL(file)
      }
    }
  }
})
</script>
