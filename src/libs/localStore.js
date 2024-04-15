/* LocalStore is a wrapper for window.localStorage and extends file systems*/

class LocalStore {
    getItem(itemName, fallbackData) {
        let dataStore = fallbackData || [];
        if(typeof window !== 'undefined') {
            dataStore = JSON.parse(window.localStorage.getItem(itemName));
        }
        return dataStore;
    }

    setItem(itemName, data) {
        if(typeof window !== 'undefined') {
            window.localStorage.setItem(itemName, JSON.stringify(data));
            return true;
        }
        return false;
    }

    importFile(acitonReducerCall, targetSystemCode) {
        const handleFileInputChange = (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
        
            reader.onload = function(e) {
                const data = e.target.result;
                const lines = data.split('\n');
                if (lines.length < 2) {
                    console.error('Invalid file format');
                    return;
                }
                const header = lines[0].trim().split('|');
                const fileType = header[0];
                const targetSystem = header[1];
                const exeValidation = header[2];
                if (fileType !== 'MKOAPP' || targetSystemCode !== targetSystem || exeValidation !== 'PM24') {//NOTE: should pass error codes in the future for troubleshooting
                    console.error('Invalid file header');
                    return;
                }
                const parsedData = JSON.parse(lines[1]);
                acitonReducerCall(parsedData);
            };
        
            reader.readAsText(file);
        }
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        fileInput.addEventListener('change', handleFileInputChange);
        fileInput.click();
    }

    exportFile(data, filename, targetSystemCode) {
        if (!window) {
          return;
        }
        const headerData = `MKOAPP|${targetSystemCode}|PM24\n`;
        const blobObj = new Blob([headerData, JSON.stringify(data)], { type: "application/json" });
        const blobUrl = window.URL.createObjectURL(blobObj);
        const anchor = window.document.createElement('a');
        anchor.download = filename;
        anchor.href = blobUrl;
        anchor.click();
        window.URL.revokeObjectURL(blobUrl);
    }
}

export default LocalStore;