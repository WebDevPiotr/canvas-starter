const download = (data: any, type: string, fileName: string) => {
    const blob = new Blob([data], { type });
    const a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}

export default download