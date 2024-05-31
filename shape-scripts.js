window.onload = function() {
    const canvas = document.getElementById('shapeCanvas');
    const ctx = canvas.getContext('2d');
    const croppedImage = new Image();
    croppedImage.src = localStorage.getItem('croppedImage');
    let originalImage = new Image();

    croppedImage.onload = () => {
        canvas.width = croppedImage.width;
        canvas.height = croppedImage.height;
        ctx.drawImage(croppedImage, 0, 0);
        originalImage.src = croppedImage.src;
    };

    document.getElementById('originalSize').addEventListener('click', showOriginalSize);
    document.getElementById('shapeHeart').addEventListener('click', () => applyShape('heart.png'));
    document.getElementById('shapeSquare').addEventListener('click', () => applyShape('square.png'));
    document.getElementById('shapeCircle').addEventListener('click', () => applyShape('circle.png'));
    document.getElementById('shapeRectangle').addEventListener('click', () => applyShape('rectangle.png'));

    function showOriginalSize() {
        clearCanvas();
        ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(croppedImage, 0, 0);
    }

    function applyShape(shapeImage) {
        const shape = new Image();
        shape.src = shapeImage;
        shape.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(croppedImage, 0, 0);
            ctx.globalCompositeOperation = 'source-in';
    
            const scaleFactor = Math.min(canvas.width / shape.width, canvas.height / shape.height);
            const scaledWidth = shape.width * scaleFactor;
            const scaledHeight = shape.height * scaleFactor;
            const offsetX = (canvas.width - scaledWidth) / 2;
            const offsetY = (canvas.height - scaledHeight) / 2;
            
            ctx.drawImage(shape, offsetX, offsetY, scaledWidth, scaledHeight);
    
            ctx.globalCompositeOperation = 'source-atop';
            ctx.drawImage(croppedImage, 0, 0, canvas.width, canvas.height);
    
            ctx.globalCompositeOperation = 'source-over';
        };
    }
    
    
};
