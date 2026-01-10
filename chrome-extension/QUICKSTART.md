# Quick Start Guide - mGBA Chrome Extension

## 🚀 Quick Installation

1. **Open Chrome Extensions**
   - Navigate to `chrome://extensions/` in your Chrome browser
   - Or click the puzzle icon (Extensions) → "Manage Extensions"

2. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Navigate to and select the `chrome-extension` folder from this repository
   - The mGBA icon should appear in your extensions toolbar

4. **Open the Emulator**
   - Click the mGBA extension icon in your toolbar
   - The side panel will open on the right side of your browser window

## 🎮 How to Use

### Loading a Game

1. Click the **"📁 Select ROM File"** button
2. Choose a GBA, GB, or GBC ROM file from your computer
3. Wait for the ROM to load (you'll see confirmation)
4. Click the **"▶️ Play"** button to start

### Playing Games

Use these keyboard controls:

| Key | Action |
|-----|--------|
| **Arrow Keys** | Move (D-Pad) |
| **Z** | B Button |
| **X** | A Button |
| **A** | L Shoulder |
| **S** | R Shoulder |
| **Enter** | Start |
| **Shift** | Select |

### Emulator Controls

- **▶️ Play** - Start/Resume the game
- **⏸️ Pause** - Pause the game
- **🔄 Reset** - Reset the game to the beginning

## ⚠️ Important Notes

### This is a Wrapper

This Chrome extension provides the **interface and framework** for running mGBA. To actually play games, you would need to integrate the mGBA WebAssembly build.

### Legal Notice

- Only use ROM files you legally own
- Do not download or distribute copyrighted games
- You are responsible for ensuring you have the right to use any ROMs

## 🔧 Troubleshooting

### Extension Not Loading

- Make sure Developer Mode is enabled
- Try reloading the extension (click the refresh icon)
- Check the Chrome console for errors

### Side Panel Not Opening

- Chrome must support the Side Panel API (Chrome 114+)
- Try clicking the extension icon again
- Check if side panel is enabled in Chrome settings

### ROM Not Loading

- Verify the file is a valid GBA/GB/GBC ROM (.gba, .gb, .gbc)
- Check the file isn't corrupted
- Look at the browser console for error messages

## 📚 Next Steps

### For Developers

If you want to integrate the actual emulator:

1. Build mGBA for WebAssembly using Emscripten
2. Add the compiled `.wasm` and `.js` files to this directory
3. Update `emulator.js` to load and interact with the WASM module
4. Connect the integration points marked with TODO comments

### For Users

Currently, this is a demonstration wrapper. To use a fully functional GBA emulator:

- Visit the official mGBA website for native builds
- Look for existing web-based GBA emulators
- Wait for a WebAssembly build to be integrated with this extension

## 🐛 Reporting Issues

If you encounter issues with:
- **This wrapper**: Open an issue on this repository
- **The mGBA emulator**: Visit [mgba.io](https://mgba.io/)

## 🎉 Enjoy!

Once fully integrated, you'll have a Game Boy Advance emulator right in your browser's sidebar, allowing you to play classic games while browsing the web!

---

**Version**: 1.0.0  
**Last Updated**: January 2026
