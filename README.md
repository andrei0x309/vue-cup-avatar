## VUE-CUP-AVATAR

> A vue-cup-avatar component, stands for Vue crop - upload avatar.

It's a Vue component for crop and, forwards the final blob when the user finishes the crop to your function.
Based on the website repo seems nice: [https://github.com/innocenzi/avatar](https://github.com/innocenzi/avatar)
If you use tailwind/windicss it has support for dark mode. (AKA `class="dark"`)
Also, it exposes some ID's if you want to override some styles. (`vue-cup-avatar`(whole component), `va-from` (upload from), `va-toolbar` (crop toolbar with buttons/commands))

The component will open the cropper in full page mode modal.

### Simple use (demo in example folder )

`yarn add vue-cup-avatar`

```javascript
<script setup lang="ts">
import { VACropper } from 'vue-cup-avatar'
import 'vue-cup-avatar/dist/style.css'

const yourUploadFunction = (data: Blob) => {
 console.log(data)
}

</script>

<template>
 <VACropper avatar="./logo.svg" @cropped="yourUploadFunction" />
</template>
```

### Props

```javascript
 {
 // avatar image to show as avatar before user crop/upload
 avatar: {
  default: '',
  type: String,
 },
 // size in rem of that avatar
 avatarSize: {
  default: 6,
  type: Number,
 },
 // avatar margin
 avatarMarginBottom: {
  default: 0.8,
  type: Number,
 },
  // avatar margin
 avatarMarginTop: {
  default: 0.8,
  type: Number,
 },
// Don't show the avatar ( just the form)
 noAvatar: {
  default: false,
  type: Boolean,
 },
  // show or not upload from url, default false, will only show upload from file
 showLoadFromUrl: {
  default: false,
  type: Boolean,
 },
}
```

### Events

```javascript
 cropped: (data: Blob) => unknown
```

### Screenshots

![Screenshot 1](https://lh3.googleusercontent.com/pw/AMWts8A-s3Zys-9jAkpFmZ9kfMJ_wEcZZe7RXomCsRL0N4qLI7Bhv9XdrA44bWopf3lH1_n3XZ8fgqS429T8Mh8LVmhjwuJjldyY-rExN3wTtMlqQZ9QGUEd2yFkFg9ONTNuxzcef0YbVuJcx4pipGrogPLi=w316-h182-no)

![Screenshot 2](https://lh3.googleusercontent.com/pw/AMWts8D2IhwkD4QxakYAF-mgmPiYNU1QLR4bdbE0Y72KmxlHVNUXCWYMk9R9sdEqyVyJWV453kHMP46TZw2xPUlg-Sjpa3wVOXCaY23UNPvK3kWtU4yU42MIiiLVKhpsS5XOUlHAASmJl4zzvDh9sCdc42jj=w320-h205-no)

![Screenshot 3](https://lh3.googleusercontent.com/pw/AMWts8DPEncHimLA3UwuBG6MNv8jo8Fc35uhV-DHOUzKsEBtzpsCq4xneepKFIz2p2S7xKlVszOHnDkLZk_XYrbDy7earwx8Uo1IXAOAM-aVC6W_ky0nptDf3DsC2_ZgS4SvT615qJGy2ZMon8FvgIly5qDt=w690-h707-no)

![Screenshot 4](https://lh3.googleusercontent.com/pw/AMWts8DPk4ngl2yOCAnVXpiOIhdZTLRqMaJYFTAKDHApbBuzchI3_u8AIxBpgatqRBsnI4tO-pqqqlp2aDN9ZOYZniKYS-_Z1MpZGGp1VWyQNRrh6Lgq_zJZ4F2YBE4YR240KdWL_7Ut1N71XyzREEe1asIc=w682-h705-no)