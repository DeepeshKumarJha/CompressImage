function compressImage(file, quality) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
  
          canvas.width = img.width;
          canvas.height = img.height;
  
          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0);
  
          // Get the compressed image as a Blob object
          canvas.toBlob(function (blob) {
            resolve(blob);
          }, 'image/webp', quality);
        };
  
        img.onerror = function (error) {
          reject(error);
        };
  
        img.src = event.target.result;
      };
  
      reader.onerror = function (error) {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
}
  

export default compressImage;