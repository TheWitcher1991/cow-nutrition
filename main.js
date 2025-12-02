	'use strict'

	if (require.main !== module) {
		require('update-electron-app')({
			logger: require('electron-log'),
		})
	}
	const path = require('path')
	const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')

	const pjson = require('./package.json')

	const debug = /--debug/.test(process.argv[2])

	if (process.mas) app.setName(pjson.name)

	let mainWindow = null

	const registerGlobalShortcuts = () => {
		globalShortcut.register('CommandOrControl+Shift+L', () => {
			mainWindow?.webContents.send('show-server-log')
		})
	}

	process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

	function createWindow() {
		const windowOptions = {
			minWidth: 960,
			minHeight: 665,
			center: true,
			title: pjson.name,
			resizable: true,
			frame: false,
			hasShadow: false,
			titleBarStyle: 'hidden',
			icon: path.join(__dirname, '/dist/public/img/icon.ico'),
			webPreferences: {
				nodeIntegration: true,
				nodeIntegrationInWorker: true,
				contextIsolation: false,
				enableRemoteModule: true,
				v8CacheOptions: 'code',
				// webSecurity: false,
				preload: path.join(__dirname, '/dist/preload.js'),
			},
		}

		if (process.platform === 'linux') {
			windowOptions.icon = path.join(__dirname, '/dist/public/img/icon.ico')
		}

		mainWindow = new BrowserWindow(windowOptions)
		mainWindow.setMenuBarVisibility(false)
		mainWindow.setProgressBar(0)
		let promise = mainWindow.loadURL(path.join(__dirname, '/src/index.html'))

		if (debug) {
			mainWindow.webContents.openDevTools()
			mainWindow.maximize()
			require('devtron').install()
		}

		mainWindow.on('closed', () => {
			mainWindow = null
		})

		ipcMain.on('minimize-window', () => {
			mainWindow.minimize()
		})

		ipcMain.on('maximize-window', () => {
			mainWindow.maximize()
		})

		ipcMain.on('restore-window', () => {
			mainWindow.restore()
		})

		ipcMain.on('close-window', () => {
			mainWindow.close()
		})
	}

	app.whenReady().then(() => {
		registerGlobalShortcuts()
		createWindow()

		app.on('activate', () => {
			if (BrowserWindow.getAllWindows().length === 0) {
				createWindow()
			}
		})
	})

	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})
