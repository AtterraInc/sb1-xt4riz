export class RecordingService {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];

  startRecording(stream: MediaStream): void {
    this.chunks = [];
    this.mediaRecorder = new MediaRecorder(stream);
    
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };

    this.mediaRecorder.start();
  }

  stopRecording(): Promise<string> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder) {
        resolve('');
        return;
      }

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        resolve(url);
      };

      this.mediaRecorder.stop();
    });
  }
}