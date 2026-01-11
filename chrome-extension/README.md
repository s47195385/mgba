# mGBA Chrome Extension

A Chrome extension wrapper that allows you to play Game Boy Advance (GBA) games in your browser's sidebar using the mGBA emulator.

## Features

- 🎮 **Side Panel Interface**: Opens the emulator in Chrome's side panel for easy access
- 📁 **ROM Loading**: Load GBA, GB, and GBC ROM files directly
- 🎨 **Modern UI**: Clean, intuitive interface with responsive design
- ⌨️ **Keyboard Controls**: Full keyboard support for game controls
- 🔄 **Emulator Controls**: Play, pause, and reset functionality

## Installation

### Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top-right corner
3. Click "Load unpacked"
4. Select the `chrome-extension` directory from this repository
5. The mGBA extension icon should now appear in your extensions toolbar

### Using the Extension

1. Click the mGBA extension icon in your toolbar
2. The side panel will open on the right side of your browser
3. Click "Select ROM File" to load a GBA, GB, or GBC ROM
4. Once loaded, click "Play" to start the emulator
5. Use keyboard controls to play your game

## Keyboard Controls

| Key | GBA Button |
|-----|------------|
| Arrow Keys | D-Pad (Up/Down/Left/Right) |
| Z | B Button |
| X | A Button |
| A | L Button |
| S | R Button |
| Enter | Start |
| Shift | Select |

## File Structure

```
chrome-extension/
├── manifest.json          # Chrome extension configuration
├── sidepanel.html        # Main emulator UI
├── styles.css            # Styling for the UI
├── emulator.js           # Emulator wrapper logic
├── background.js         # Service worker for extension
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Technical Details

### About This Wrapper

This Chrome extension provides a **wrapper interface** for the mGBA emulator. It creates a side panel UI that can:

- Load ROM files from your local filesystem
- Display the emulator canvas
- Handle keyboard input
- Provide basic emulator controls

### Integration with mGBA

To fully integrate the actual mGBA emulator, you would need to:

1. **Build mGBA for WebAssembly**: Compile mGBA using Emscripten to create a WebAssembly build
2. **Include WASM files**: Add the compiled `.wasm` and `.js` files to this extension
3. **Update emulator.js**: Integrate the WebAssembly module in the `emulator.js` file
4. **Handle Memory**: Manage ROM data transfer to the WASM module

### Example Integration Points

The `emulator.js` file contains TODO comments marking integration points:

```javascript
// Initialize the emulator
if (typeof Module !== 'undefined' && Module.loadROM) {
  Module.loadROM(this.romData);
}

// Run emulation frame
if (typeof Module !== 'undefined' && Module.runFrame) {
  Module.runFrame();
}

// Handle button input
if (typeof Module !== 'undefined' && Module.pressButton) {
  Module.pressButton(button);
}
```

## Development

### Making Changes

1. Edit the files in the `chrome-extension` directory
2. Go to `chrome://extensions/`
3. Click the refresh icon on the mGBA extension card
4. Reopen the side panel to see your changes

### Debugging

- Open Chrome DevTools for the side panel: Right-click in the side panel → Inspect
- View service worker logs: Click "service worker" link in the extension card on `chrome://extensions/`
- Check console for error messages and debugging output

## Limitations

- **No Emulator Core Included**: This is a UI wrapper only. The actual emulator core needs to be integrated separately
- **Browser Permissions**: Requires host permissions for future features (e.g., online ROM sources)
- **Storage**: Currently only supports loading ROMs from local files
- **Save States**: Not yet implemented (would require persistent storage integration)

## Future Enhancements

Potential improvements for this wrapper:

- [ ] Integrate actual mGBA WebAssembly build
- [ ] Add save state functionality
- [ ] Implement touch controls for tablets
- [ ] Add settings panel for emulator configuration
- [ ] Support for game saves persistence
- [ ] Gamepad API support for physical controllers
- [ ] Speed controls (fast-forward, slow-motion)
- [ ] Screenshot and recording features
- [ ] Cheat code support

## Legal Notice

⚠️ **Important**: This extension is a wrapper/interface only. 

- You must own the games you play
- Only use ROM files you legally own
- Downloading copyrighted ROMs you don't own is illegal
- This project does not provide or endorse ROM piracy

## License

This Chrome extension wrapper follows the same license as mGBA itself (Mozilla Public License 2.0).

The mGBA emulator core is Copyright © 2013 – 2023 Jeffrey Pfau.

## Support

For issues with:
- **This wrapper**: Open an issue in this repository
- **mGBA emulator**: Visit [mgba.io](https://mgba.io/)

## Resources

- [mGBA Official Website](https://mgba.io/)
- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Side Panel API Guide](https://developer.chrome.com/docs/extensions/reference/sidePanel/)
- [Emscripten Documentation](https://emscripten.org/docs/)

---

Made with ❤️ for retro gaming enthusiasts
