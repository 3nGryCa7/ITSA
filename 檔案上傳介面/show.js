document.addEventListener("readystatechange", () => {
    if (document.readyState !== 'complete') return;
    function showFileInfo() {
        const files = document.getElementById("input").files;
        let total = files.length, names = [], bytes_size = 0, mb_size = 0;
    
        // files.forEach(file => {
        //     names.push(file.name);
        //     bytes_size += file.size;
        // })

        for (const file of files) {
            names.push(file.name);
            bytes_size += file.size;
        }
    
        mb_size = Math.round(bytes_size / 1048576 *1000) / 1000;
    
        document.getElementById('names').innerHTML = names.length ? names.join(',') : 0;
        document.getElementById('total').innerHTML = total;
        document.getElementById('mb-size').innerHTML = mb_size;
        document.getElementById('bytes-size').innerHTML = bytes_size;
    }
    
    showFileInfo();
    document.getElementById('input').addEventListener("change", showFileInfo);
})