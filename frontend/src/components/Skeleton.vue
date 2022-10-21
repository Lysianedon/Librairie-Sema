<template>
    <div class="container">
    <div class="skel-box">
  <div class="skeleton">
  <div class="skeleton-left">
    <div class="line long-line"></div>
    <div class="line"></div>
    <div class="line short-line"></div>
        </div>
        <div class="skeleton-right">
            <div class="square"></div>
        </div>

    </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'SkeletonComponent',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
 .skel-box{
    height: fit-content;
    width: 17vw;
    margin: 1%;
    padding: 18px 20px 13px 20px;
    }
.skeleton {
    margin-bottom: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column-reverse;
}
 .skeleton .square {
     height: 280px;
     width: 230px;
     margin-bottom: 3vh;
     border-radius: 5px;
     background: rgba(130, 130, 130, 0.2);
     background: -webkit-gradient(linear, left top, right top, color-stop(8%, rgba(130, 130, 130, 0.2)), color-stop(18%, rgba(130, 130, 130, 0.3)), color-stop(33%, rgba(130, 130, 130, 0.2)));
     background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
     background-size: 800px 100px;
     animation: wave-squares 2s infinite ease-out;
}
 .skeleton .line {
     height: 14px;
     width: 190px;
     margin-bottom:17px;
     border-radius: 2px;
     background: rgba(130, 130, 130, 0.2);
     background: -webkit-gradient(linear, left top, right top, color-stop(8%, rgba(130, 130, 130, 0.2)), color-stop(18%, rgba(130, 130, 130, 0.3)), color-stop(33%, rgba(130, 130, 130, 0.2)));
     background: linear-gradient(to right, rgba(130, 130, 130, 0.2) 8%, rgba(130, 130, 130, 0.3) 18%, rgba(130, 130, 130, 0.2) 33%);
     background-size: 800px 100px;
     animation: wave-lines 2s infinite ease-out;
}

.skeleton .long-line {
    width: 210px;
}
.skeleton .short-line {
    width: 180px;
}

 @keyframes wave-lines {
    0% {
        background-position: -468px 0;
    }
     100% {
        background-position: 468px 0;
    }
}
 @keyframes wave-squares {
    0% {
        background-position: -468px 0;
    }
     100% {
        background-position: 468px 0;
    }
}

</style>
