$(document).ready(function () {
    $("#summernote").summernote({
        height: 450,
        imageCompression: {
            enabled: true,
            maxSizeMB: 0.5,
            maxWidthOrHeight: 800
        }
    });
});