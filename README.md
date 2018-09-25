# ieImgInterpolation
jQuery plugin for better image interpolation in Internet Explorer.

![Interpolation problem in IE](example.png)

## Usage
Download *ieImgInterpolation.min.js* and insert the following code before the end of your body tag.
```
<!-- Stupid IE image interpolation workaround -->
<script src="path/to/ieImgInterpolation.min.js"></script>
<script>
    $(function() {
        $('img:not(.auto-interpolation)').ieImgInterpolation();
    });
</script>
```
Tested with jquery-3.3.1.
