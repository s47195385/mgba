// mGBA Emulator JavaScript wrapper for Chrome Extension

class MGBAEmulator {
  constructor() {
    this.romData = null;
    this.romName = null;
    this.isRunning = false;
    this.isPaused = false;
    
    this.canvas = document.getElementById('screen');
    this.ctx = this.canvas.getContext('2d');
    
    this.initializeUI();
    this.setupEventListeners();
  }

  initializeUI() {
    // Draw a placeholder on the canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Load a ROM to start', this.canvas.width / 2, this.canvas.height / 2);
  }

  setupEventListeners() {
    // File input
    document.getElementById('romFile').addEventListener('change', (e) => {
      this.handleROMLoad(e);
    });

    // Control buttons
    document.getElementById('playBtn').addEventListener('click', () => {
      this.play();
    });

    document.getElementById('pauseBtn').addEventListener('click', () => {
      this.pause();
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
      this.reset();
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      this.handleKeyDown(e);
    });

    document.addEventListener('keyup', (e) => {
      this.handleKeyUp(e);
    });
  }

  async handleROMLoad(event) {
    const file = event.target.files[0];
    if (!file) return;

    this.romName = file.name;
    
    try {
      // Read the ROM file
      const arrayBuffer = await file.arrayBuffer();
      this.romData = new Uint8Array(arrayBuffer);
      
      // Update UI
      document.getElementById('romName').textContent = this.romName;
      document.getElementById('romInfo').classList.remove('hidden');
      document.getElementById('loadingMessage').classList.add('hidden');
      document.getElementById('emulatorCanvas').classList.add('active');
      
      // Enable buttons
      document.getElementById('playBtn').disabled = false;
      document.getElementById('resetBtn').disabled = false;
      
      // Show success message
      this.showMessage(`ROM loaded: ${this.romName}`, 'success');
      
      // Initialize emulator with the ROM
      this.initializeEmulator();
      
      // Notify background script
      chrome.runtime.sendMessage({
        action: 'loadROM',
        romName: this.romName
      });
      
    } catch (error) {
      this.showMessage(`Error loading ROM: ${error.message}`, 'error');
      console.error('Error loading ROM:', error);
    }
  }

  initializeEmulator() {
    // This is where the actual mGBA WebAssembly module would be initialized
    // For now, we'll create a placeholder
    
    console.log('Initializing emulator with ROM:', this.romName);
    console.log('ROM size:', this.romData.length, 'bytes');
    
    // Draw a "Ready" message
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#0f0';
    this.ctx.font = '16px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Emulator Ready!', this.canvas.width / 2, this.canvas.height / 2 - 10);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '12px Arial';
    this.ctx.fillText('Press Play to start', this.canvas.width / 2, this.canvas.height / 2 + 10);
    
    // TODO: Initialize mGBA WebAssembly module here
    // Example integration point:
    // if (typeof Module !== 'undefined' && Module.loadROM) {
    //   Module.loadROM(this.romData);
    // }
  }

  play() {
    if (!this.romData) {
      this.showMessage('Please load a ROM first', 'error');
      return;
    }

    this.isRunning = true;
    this.isPaused = false;
    
    document.getElementById('playBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;
    
    this.showMessage('Emulator started', 'success');
    console.log('Starting emulation...');
    
    // Start the emulation loop
    this.startEmulation();
  }

  pause() {
    this.isPaused = true;
    this.isRunning = false;
    
    document.getElementById('playBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    
    this.showMessage('Emulator paused', 'info');
    console.log('Emulation paused');
    
    // TODO: Pause the actual emulator
    // if (typeof Module !== 'undefined' && Module.pause) {
    //   Module.pause();
    // }
  }

  reset() {
    this.isRunning = false;
    this.isPaused = false;
    
    document.getElementById('playBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    
    this.showMessage('Emulator reset', 'info');
    console.log('Emulation reset');
    
    // Reinitialize the emulator
    if (this.romData) {
      this.initializeEmulator();
    }
    
    // TODO: Reset the actual emulator
    // if (typeof Module !== 'undefined' && Module.reset) {
    //   Module.reset();
    // }
  }

  startEmulation() {
    // This would run the emulation loop
    // For demonstration, we'll just show an animation
    
    let frame = 0;
    const animate = () => {
      if (!this.isRunning) return;
      
      // Simple animation to show it's "running"
      this.ctx.fillStyle = '#000';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw some animated elements
      const hue = (frame * 2) % 360;
      this.ctx.fillStyle = `hsl(${hue}, 70%, 50%)`;
      this.ctx.fillRect(
        Math.sin(frame * 0.05) * 80 + 120,
        Math.cos(frame * 0.03) * 60 + 80,
        20,
        20
      );
      
      this.ctx.fillStyle = '#fff';
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Emulator Running...', this.canvas.width / 2, 20);
      this.ctx.fillText('Frame: ' + frame, this.canvas.width / 2, 140);
      
      frame++;
      
      // TODO: Replace with actual emulator frame rendering
      // if (typeof Module !== 'undefined' && Module.runFrame) {
      //   Module.runFrame();
      // }
      
      requestAnimationFrame(animate);
    };
    
    animate();
  }

  handleKeyDown(event) {
    if (!this.isRunning) return;
    
    // Map keyboard keys to GBA buttons
    const keyMap = {
      'ArrowUp': 'UP',
      'ArrowDown': 'DOWN',
      'ArrowLeft': 'LEFT',
      'ArrowRight': 'RIGHT',
      'z': 'B',
      'x': 'A',
      'a': 'L',
      's': 'R',
      'Enter': 'START',
      'Shift': 'SELECT'
    };
    
    const button = keyMap[event.key];
    if (button) {
      event.preventDefault();
      console.log('Button pressed:', button);
      
      // TODO: Send button press to emulator
      // if (typeof Module !== 'undefined' && Module.pressButton) {
      //   Module.pressButton(button);
      // }
    }
  }

  handleKeyUp(event) {
    if (!this.isRunning) return;
    
    const keyMap = {
      'ArrowUp': 'UP',
      'ArrowDown': 'DOWN',
      'ArrowLeft': 'LEFT',
      'ArrowRight': 'RIGHT',
      'z': 'B',
      'x': 'A',
      'a': 'L',
      's': 'R',
      'Enter': 'START',
      'Shift': 'SELECT'
    };
    
    const button = keyMap[event.key];
    if (button) {
      event.preventDefault();
      console.log('Button released:', button);
      
      // TODO: Send button release to emulator
      // if (typeof Module !== 'undefined' && Module.releaseButton) {
      //   Module.releaseButton(button);
      // }
    }
  }

  showMessage(text, type = 'info') {
    // Temporarily show a message (you could enhance this)
    console.log(`[${type}] ${text}`);
    
    // Update error message if it's an error
    if (type === 'error') {
      const errorDiv = document.getElementById('errorMessage');
      errorDiv.textContent = text;
      errorDiv.classList.remove('hidden');
      
      setTimeout(() => {
        errorDiv.classList.add('hidden');
      }, 5000);
    }
  }
}

// Initialize the emulator when the page loads
let emulator;
document.addEventListener('DOMContentLoaded', () => {
  emulator = new MGBAEmulator();
  console.log('mGBA Chrome Extension loaded');
});
