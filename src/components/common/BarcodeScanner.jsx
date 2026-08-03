import { useEffect, useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import Button from "./Button";

export default function BarcodeScanner({ onDetected }) {
  const videoRef = useRef(null);
  const controlsRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  function stopScanner() {
    controlsRef.current?.stop();
    controlsRef.current = null;
    setOpen(false);
  }

  async function startScanner() {
    try {
      setError("");
      setOpen(true);
      requestAnimationFrame(async () => {
        try {
          const reader = new BrowserMultiFormatReader();
          controlsRef.current = await reader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
            if (result) {
              onDetected(result.getText());
              stopScanner();
            }
          });
        } catch (err) {
          setError(err?.name === "NotAllowedError" ? "Camera permission was denied." : "Unable to start the webcam scanner.");
          stopScanner();
        }
      });
    } catch (err) {
      setError(err?.name === "NotAllowedError" ? "Camera permission was denied." : "Unable to start the webcam scanner.");
      stopScanner();
    }
  }

  useEffect(() => () => stopScanner(), []);

  return <div className="barcode-scanner">
    <Button type="button" variant="secondary" icon={<Camera size={18} />} onClick={startScanner}>Scan barcode</Button>
    {error && <div className="error-message">{error}</div>}
    {open && <div className="scanner-overlay" role="dialog" aria-modal="true" aria-label="Barcode scanner">
      <div className="scanner-dialog"><button type="button" className="icon-button" onClick={stopScanner} aria-label="Close scanner"><X size={18} /></button>
        <h2>Scan barcode</h2><p>Point your computer webcam at the product barcode.</p><video ref={videoRef} autoPlay playsInline muted className="scanner-video" />
      </div>
    </div>}
  </div>;
}
