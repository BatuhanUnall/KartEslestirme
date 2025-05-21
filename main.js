const electron = require("electron") //Electron modülünü projemize ekler.
const url = require("url") //url modülünü ekler.
const path = require("path") //path modülünü ekler.

const { app, BrowserWindow, Menu } = electron;//Modüldeki yazılan nesneleri alır.

let mainWindow;//Ana pencere değişkenimiz
app.on("ready", () => {//Uygulama hazır olduğunda çalışacak
    mainWindow = new BrowserWindow({//Ana penceremizi tanımlıyoruz.
        webPreferences: {
            nodeIntegration: true,//Açılan pencerelerde node modüllerine erişebilir hale gelirler.
            contextIsolation: false
        },
        fullscreen: true//Tam ekranda açılmasını sağlıyoruz.
    })
    mainWindow.loadURL(//Ana penceremiz sayfa ekleme işlemini yapar.
        url.format({
            pathname: path.join(__dirname, "menu.html"),//menu.html sayfasını ana pencere yapar.
            protocol: "file:",//Dosyanın protokolünün file olduğunu belirtir.
            slashes: true//Slash karakterini dosya yolunu belirtmek için ekler.
        })
    )
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)//Ana menüyü mainMenuyu aktarır.
    Menu.setApplicationMenu(mainMenu)//Sayfanın ana menüsünü uygulamaya ekler.
}
)
const mainMenuTemplate = [//Menü dizisi
    {
        label: "İşlemler",//Ana menü ismimiz
        submenu: [//Alt menü oluşturma
            {
                label: 'Sayfayı Yenile',//İlk alt menü
                role: "reload"//Menüye kendini yenileme rolü verildi.
            },
            {
                label: "Çıkış",//İkinci alt menü
                accelerator: process.platform != "darwin" ? "Ctrl+Q" : "Command+Q",//İşletim sistemi mac değil ise ctrl+q ile, mac ise command+q ile çıkış kısayolu oluşturur.
                role: "quit"//Menüye uygulamadan çıkma rolü verildi.
            },
            {
                label: "Ana Menü",//Üçüncü alt menü
                click() {
                    mainWindow.loadFile("menu.html");//Menüye tıklandığında ana menü sayfasını yükleyecek.
                }
            },
            {
                label: "Yüksek Skorlar",//Dördüncü alt menü
                click() {
                    mainWindow.loadFile("bestScores.html");//Menüye tıklandığında en iyi sürelerin olduğu sayfayı yükleyecek.
                }
            }
        ]
    }
]