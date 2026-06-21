const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

const isDev =
  process.env.NODE_ENV === "development" ||
  process.defaultApp ||
  /[\\/]electron[\\/]/.test(process.execPath);

let mainWindow;

// Функция для логирования с временем
function log(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// Функция поиска всех файлов в директории
function findFilesInDirectory(dirPath, extension) {
  const files = [];

  function scanDirectory(currentPath) {
    if (!fs.existsSync(currentPath)) return;

    const items = fs.readdirSync(currentPath);

    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && item.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  }

  scanDirectory(dirPath);
  return files;
}

function findIndexHtml() {
  log("Starting search for index.html...");

  // Все возможные пути для поиска
  const searchBasePaths = [
    process.resourcesPath,
    path.join(process.resourcesPath, "app"),
    path.join(process.resourcesPath, "dist"),
    __dirname,
    path.dirname(__dirname),
  ];

  log(`Resources path: ${process.resourcesPath}`);
  log(`Current dir: ${__dirname}`);

  // Сначала проверяем конкретные пути
  const specificPaths = [
    path.join(process.resourcesPath, "dist", "index.html"),
    path.join(process.resourcesPath, "dist", "assets", "index.html"),
    path.join(process.resourcesPath, "app", "dist", "index.html"),
    path.join(process.resourcesPath, "app", "dist", "assets", "index.html"),
    path.join(__dirname, "..", "dist", "index.html"),
    path.join(__dirname, "..", "dist", "assets", "index.html"),
    path.join(__dirname, "..", "..", "dist", "index.html"),
    path.join(__dirname, "..", "..", "dist", "assets", "index.html"),
  ];

  log("Checking specific paths:");
  for (const indexPath of specificPaths) {
    log(`  Checking: ${indexPath}`);
    if (fs.existsSync(indexPath)) {
      log(`✓ FOUND index.html at: ${indexPath}`);
      return indexPath;
    }
  }

  // Если не нашли, ищем рекурсивно во всех возможных местах
  log("Specific paths not found, starting recursive search...");

  for (const basePath of searchBasePaths) {
    if (fs.existsSync(basePath)) {
      log(`Scanning: ${basePath}`);
      const htmlFiles = findFilesInDirectory(basePath, ".html");

      if (htmlFiles.length > 0) {
        log(`Found ${htmlFiles.length} HTML files:`);
        htmlFiles.forEach((file) => log(`  - ${file}`));

        // Предпочтение отдаем index.html
        const indexFile = htmlFiles.find((file) =>
          path.basename(file).startsWith("index")
        );
        if (indexFile) {
          log(`✓ Using index file: ${indexFile}`);
          return indexFile;
        }

        log(`✓ Using first HTML file: ${htmlFiles[0]}`);
        return htmlFiles[0];
      }
    } else {
      log(`Path does not exist: ${basePath}`);
    }
  }

  log("✗ No HTML files found anywhere!");
  return null;
}

function createWindow() {
  log("Creating browser window...");

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Всегда открываем DevTools для отладки
  // mainWindow.webContents.openDevTools();
  // log("DevTools opened");

  // Логируем все события загрузки
  mainWindow.webContents.on("did-start-loading", () => {
    log("Started loading page");
  });

  mainWindow.webContents.on("did-finish-load", () => {
    log("Finished loading page");
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL) => {
      log(`❌ Failed to load: ${errorDescription} (code: ${errorCode})`);
      log(`URL: ${validatedURL}`);
    }
  );

  mainWindow.webContents.on("dom-ready", () => {
    log("DOM is ready");
  });

  if (isDev) {
    log("Development mode: loading from http://localhost:5173");
    mainWindow.loadURL("http://localhost:5173").catch((err) => {
      log(`❌ Failed to load dev URL: ${err.message}`);
    });
  } else {
    log("Production mode: loading from file");

    const indexPath = findIndexHtml();

    if (indexPath && fs.existsSync(indexPath)) {
      log(`Loading from: ${indexPath}`);
      mainWindow
        .loadFile(indexPath)
        .then(() => {
          log("✅ Successfully loaded file");
        })
        .catch((err) => {
          log(`❌ Failed to load file: ${err.message}`);
          showErrorPage(
            mainWindow,
            `File load error: ${err.message}\nPath: ${indexPath}`
          );
        });
    } else {
      log("❌ No HTML file found");
      showErrorPage(
        mainWindow,
        `Application files not found.\n\n` +
          `Resources path: ${process.resourcesPath}\n` +
          `Current dir: ${__dirname}\n` +
          `Please reinstall the application.`
      );
    }
  }
}

function showErrorPage(win, message) {
  log(`Showing error page: ${message}`);
  win.loadURL(`data:text/html;charset=utf-8,
    <html>
      <head>
        <title>Application Error</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
            background: #f8f9fa; 
            color: #dc3545; 
          }
          .container { 
            max-width: 800px; 
            margin: 50px auto; 
            background: white; 
            padding: 30px; 
            border-radius: 10px; 
            box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
          }
          pre { 
            background: #f1f3f4; 
            padding: 15px; 
            border-radius: 5px; 
            overflow: auto; 
            font-size: 12px; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚨 Application Error</h1>
          <p>${message.replace(/\n/g, "<br>")}</p>
          <h3>Debug Information:</h3>
          <pre>Resources path: ${
            process.resourcesPath
          }\nCurrent dir: ${__dirname}</pre>
        </div>
      </body>
    </html>`);
}

// Логируем события приложения
app.on("ready", () => {
  log("App ready event fired");
  createWindow();
});

app.on("window-all-closed", () => {
  log("All windows closed, quitting app");
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  log("App activate event fired");
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("before-quit", () => {
  log("App is about to quit");
});

// Логируем необработанные ошибки
process.on("uncaughtException", (error) => {
  log(`❌ Uncaught Exception: ${error.message}`);
  log(error.stack);
});

process.on("unhandledRejection", (reason, promise) => {
  log(`❌ Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

log("Main process started");
