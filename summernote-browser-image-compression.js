(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        factory(window.jQuery);
    }
}(function ($) {
    $.extend($.summernote.options, {
        imageCompression: {
            enabled: true,
            maxSizeMB: 2, // default 2MB
            maxWidthOrHeight: 1280, // max 1280x1280px
        },
    });

    $.extend($.summernote.plugins, {
        imageCompression: function (context) {
            let options = context.options;

            if (!options.imageCompression.enabled) {
                return;
            }

            options.maximumImageFileSize = null;

            if (typeof imageCompression !== 'function') {
                console.log('Could not enable browser-image-compression plugin: imageCompression library not loaded!');
                return;
            }

            options.callbacks.onImageUpload = function (files) {
                $.each(files, (index, originalFile) => {
                    if (originalFile instanceof File === false || originalFile.type.indexOf('image/') !== 0) {
                        console.log('Warning: file is not an image.');
                        return;
                    }

                    if (!options.imageCompression.enabled) {
                        context.$note.summernote('insertNode', originalFile);
                    }

                    imageCompression(originalFile, {
                        maxSizeMB: options.imageCompression.maxSizeMB,
                        maxWidthOrHeight: options.imageCompression.maxWidthOrHeight,
                    })
                        .then((compressedFile) => {
                            context.invoke('editor.insertImagesAsDataURL', [compressedFile]);

                            console.log(`compressedFile size ${(compressedFile.size / 1024 / 1024).toFixed(3)} MB`);
                        })
                        .catch((error) => {
                            console.log('Error: image was not compressed. Fallback to user uploaded file.');
                            console.log(error);

                            context.invoke('editor.insertImagesAsDataURL', [originalFile]);
                        });
                });
            };
        },
    });
}));
