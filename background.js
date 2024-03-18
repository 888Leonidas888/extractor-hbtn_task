chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      let title = document.querySelector("h1").innerText;
      title = title.replace(/ /g, "_");
      title = title.toLowerCase();
      let nameFile = title + ".html";
      const collectionPanelDefault = document.querySelector(".contains-images");
      if (collectionPanelDefault) {
        const content = collectionPanelDefault.innerHTML;

        let newHTML = `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <link rel="stylesheet" href="main.css" />
          </head>
          <body>
            <div class="container-main">
              ${content}
            </div>
          </body>
        </html>
      `;
        chrome.storage.local.set({ content: newHTML }, () => {
          console.log("Contenido guardado en almacenamiento local:", newHTML);
        });

        // Crear un objeto Blob con el newHTML
        const blob = new Blob([newHTML], { type: "text/html" });

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
