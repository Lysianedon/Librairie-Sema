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

<img src="https://i.ibb.co/JWYrdZq/14.png" alt="14" border="0">
<img src="https://i.ibb.co/St3WCXj/15.png" alt="15" border="0"> // Lady b - contours noirs
<img src="https://i.ibb.co/g9PGpnQ/12.png" alt="12" border="0"> // Le pagne noir - Bernard Dadié
<img src="https://i.ibb.co/jfmGcGK/13.png" alt="13" border="0">  // Ellen Johnson Sirleaf
<img src="https://i.ibb.co/GPNDdh6/9.png" alt="9" border="0">
<img src="https://i.ibb.co/yW7TBTd/10.png" alt="10" border="0">
<img src="https://i.ibb.co/YTXzRg6/11.png" alt="11" border="0">
<img src="https://i.ibb.co/YbtLnRc/7.png" alt="7" border="0">
<img src="https://i.ibb.co/Kj7hXFr/8.png" alt="8" border="0">
<img src="https://i.ibb.co/WK4TC9b/4.png" alt="4" border="0">
<img src="https://i.ibb.co/Dw8ZY9F/5.png" alt="5" border="0">
<img src="https://i.ibb.co/yQc0RS3/6.png" alt="6" border="0">
<img src="https://i.ibb.co/S7Md2CC/2.png" alt="2" border="0">
<img src="https://i.ibb.co/NsPDYhW/3.png" alt="3" border="0">
<img src="https://i.ibb.co/NxTdHbb/1.png" alt="1" border="0">

<img src="https://i.ibb.co/RbHq1Q8/2.png" alt="2" border="0">
<img src="https://i.ibb.co/R7m2yZR/1.png" alt="1" border="0">
