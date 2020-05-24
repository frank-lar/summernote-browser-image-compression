A plugin for the **[Summernote](https://github.com/summernote/summernote/)** WYSIWYG editor.

### Introduction

When inserting an image file from the user local filesystem, by default Summernote creates an **img data-uri** element which embeds the image data, base64 encoded.

Summernote allows to limit the uploaded file size to a desired maximum, so users are forced to recompress any files which are exceeding that limit before inserting them in Summernote, using 3rd party image editors . Tedious.

This little plugin takes advantage of the awesome **[Browser Image Compression](https://github.com/Donaldcwl/browser-image-compression)** library to automatically shrink uploaded images in the broser, in order to fit the allowed maximum resolution or file size; on the fly, in background, no user action required.

### Requirements

- [Summernote](https://github.com/summernote/summernote/) 0.8.x or later
- [Browser Image Compression](https://github.com/Donaldcwl/browser-image-compression) 1.0.x or later

Plugin has not been tested with previous versions, though it could still work.


### Installation

Just include the plugin file *after* Summernote and other required libraries. That's all.

````html
<script src="summernote-browser-image-compression.js"></script>
````


### Options


| Option           | Description                                                                                                                                                           | Type               | Default   |
|----------------- |---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |------------------- |---------- |
| enabled          | Enables the plugin. Setting it to false just turns Summernote back to its default behaviour when uploading images.                                                    | Bool               | true      |
| maxSizeMB        | Sets the upper limit on the compressed image file size. **Warning**: this will override Summernote's own **maximumImageFileSize** option.                                                                                                               | Float              | 2         |
| maxWidthOrHeight | The image, if necessary, will be scaled down by ratio to a point that width or height is smaller than maxWidthOrHeight.                                               | Integer            | String    |


### Example

In this example, any image bigger than 500KB and 800x800 pixels will be compressed as much as it's needed to fall within these limits.

Options can be configured for a single instance:

````javascript
$("#summernote").summernote({
        imageCompression: {
            enabled: true,
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800
        }
});
````

Or globally as well:

````javascript
$.summernote.options.imageCompression = {
        enabled: true,
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800
};
````

Check your browser console log to know exactly how much the image was compressed.
