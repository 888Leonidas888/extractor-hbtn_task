chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      let title = document.querySelector("h1").innerText;
      title = title.replace(/ /g, "_");
      title = title.toLowerCase();
      let nameFile = title + ".html";
      const h1 = document.querySelector(".contains-images");
      if (h1) {
        const contenido = h1.innerHTML;
        chrome.storage.local.set({ contenido: contenido }, () => {
          console.log("Contenido guardado en almacenamiento local:", contenido);
        });

        // Crear un objeto Blob con el contenido
        const blob = new Blob([contenido], { type: "text/html" });

        // Crear un objeto URL para el Blob
        const url = URL.createObjectURL(blob);

        // Crear un enlace <a> y asignarle el objeto URL
        const link = document.createElement("a");
        link.href = url;
        link.download = nameFile; // Nombre del archivo
        document.body.appendChild(link);

        // Simular un clic en el enlace para descargar el archivo
        link.click();

        // Eliminar el enlace del DOM
        document.body.removeChild(link);

        // Revocar el objeto URL para liberar memoria
        URL.revokeObjectURL(url);
      } else {
        // console.log("No se encontró ningún H1 en la página.");
        alert("No se encontraron elementos");
      }
    },
  });
});
