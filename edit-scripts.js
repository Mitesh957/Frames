window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const imageId = urlParams.get('imageId');
    const imageSrc = localStorage.getItem(imageId);

    if (!imageSrc) {
        alert("No image data found. Please go back and upload an image.");
        return;
    }

    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    let img = new Image();
    img.src = imageSrc;
    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
    };

    document.getElementById('rotateLeft').addEventListener('click', () => rotateImage(-90));
    document.getElementById('rotateRight').addEventListener('click', () => rotateImage(90));
    document.getElementById('flipHorizontal').addEventListener('click', () => flipImage('horizontal'));
    document.getElementById('flipVertical').addEventListener('click', () => flipImage('vertical'));
    document.getElementById('startCrop').addEventListener('click', startCrop);
    document.getElementById('crop').addEventListener('click', cropImage);

    function rotateImage(degrees) {
        const radians = degrees * Math.PI / 180;
        const newCanvas = document.createElement('canvas');
        const newCtx = newCanvas.getContext('2d');

        newCanvas.width = img.height;
        newCanvas.height = img.width;
        newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);
        newCtx.save();
        newCtx.translate(newCanvas.width / 2, newCanvas.height / 2);
        newCtx.rotate(radians);
        newCtx.drawImage(img, -img.width / 2, -img.height / 2);
        newCtx.restore();

        img = new Image();
        img.src = newCanvas.toDataURL();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }

    function flipImage(direction) {
        const newCanvas = document.createElement('canvas');
        const newCtx = newCanvas.getContext('2d');
        newCanvas.width = img.width;
        newCanvas.height = img.height;
        newCtx.clearRect(0, 0, newCanvas.width, newCanvas.height);
        newCtx.save();
        if (direction === 'horizontal') {
            newCtx.scale(-1, 1);
            newCtx.drawImage(img, -img.width, 0);
        } else {
            newCtx.scale(1, -1);
            newCtx.drawImage(img, 0, -img.height);
        }
        newCtx.restore();

        img = new Image();
        img.src = newCanvas.toDataURL();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    }

    let isCropping = false;
    let cropStartX, cropStartY, cropEndX, cropEndY;

    function startCrop() {
        isCropping = true;
        canvas.style.cursor = 'crosshair';

        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
    }

    function onMouseDown(e) {
        if (!isCropping) return;

        cropStartX = e.offsetX;
        cropStartY = e.offsetY;
    }

    function onMouseUp(e) {
        if (!isCropping) return;

        cropEndX = e.offsetX;
        cropEndY = e.offsetY;

        const cropWidth = cropEndX - cropStartX;
        const cropHeight = cropEndY - cropStartY;

        if (cropWidth > 0 && cropHeight > 0) {
            const newCanvas = document.createElement('canvas');
            const newCtx = newCanvas.getContext('2d');

            newCanvas.width = cropWidth;
            newCanvas.height = cropHeight;
            newCtx.drawImage(img, cropStartX, cropStartY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            img = new Image();
            img.src = newCanvas.toDataURL();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                localStorage.setItem('croppedImage', img.src);
                window.location.href = `shape.html`;
            };
        }

        isCropping = false;
        canvas.style.cursor = 'default';
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mouseup', onMouseUp);
    }

    function cropImage() {
        if (!isCropping) return;

        const cropWidth = cropEndX - cropStartX;
        const cropHeight = cropEndY - cropStartY;

        if (cropWidth > 0 && cropHeight > 0) {
            const newCanvas = document.createElement('canvas');
            const newCtx = newCanvas.getContext('2d');

            newCanvas.width = cropWidth;
            newCanvas.height = cropHeight;
            newCtx.drawImage(img, cropStartX, cropStartY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

            img = new Image();
            img.src = newCanvas.toDataURL();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);

                
                localStorage.setItem('croppedImage', img.src);

                
                window.location.href = `shape.html`;
            };
        }

        isCropping = false;
        canvas.style.cursor = 'default';
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mouseup', onMouseUp);
    }
};
