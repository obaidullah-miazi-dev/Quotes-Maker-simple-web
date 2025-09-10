const imageInput = document.getElementById('image-input')
const imageUploadArea = document.getElementById('image-upload-area')
const quoteText = document.getElementById('quote-text')
const createBtn = document.getElementById('create-btn')
const imageHandle = document.getElementById('image')
const resultContainer = document.getElementById('result-container')

imageUploadArea.addEventListener('click', () => {
    imageInput.click()
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const imgUrl = URL.createObjectURL(file);
        imageUploadArea.innerHTML = `
            <img src="${imgUrl}" alt="preview" class="w-full h-full object-cover rounded-xl">
        `;
    }
});

createBtn.addEventListener('click', (e) => {
    const file = imageInput.files[0];
    if (!file) {
        alert("Please upload an image first");
        return;
    }

    if (quoteText.value.length === 0) {
        alert('Please write a quote')
        return;
    }

    const imgUrl = URL.createObjectURL(file);
    
    resultContainer.innerHTML = `<div class="skeleton md:h-96 md:w-full w-62 h-62 mx-auto bg-gray-200 rounded-xl animate-pulse"></div>`;

    setTimeout(() => {
        resultContainer.innerHTML = `
     <div id="preview" class="w-full h-full relative">
                <img id="image"  src="${imgUrl}" alt="">
                <div class="absolute inset-0 bg-[#00000062]
              flex items-center justify-center">
                    <h1 class="text-white text-4xl font-bold text-center px-20">${quoteText.value}</h1>
                </div>
            </div>

            <button id="download-btn"
                class="w-full mt-6 py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Download Image
            </button>
    `

        const downloadBtn = document.getElementById('download-btn');
        const preview = document.getElementById('preview');

        downloadBtn.addEventListener('click', () => {
            html2canvas(preview).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL("image/png");
                link.download = "quote-image.png";
                link.click();
            });
        });
        
    }, 3000);


})


