'use client'
import { useZxing } from "react-zxing";
import { useEffect, useState, useRef } from "react";

export default function Attendance() {
  const [result, setResult] = useState<string | null>(null);
  const { ref } = useZxing({
    //@ts-ignore
    onDecodeResult(result) {
      setResult(result.getText());
      stopCamera();
    },
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
    });
  };

  useEffect(() => {
    return () => stopCamera(); // Clean up function to stop camera on component unmount
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="relative">
        <video
          className="w-64 h-auto rounded-lg border border-gray-400"
          ref={videoRef}
        />

        {result && (
          <div className="absolute top-0 left-0 bg-white p-2 rounded-lg">
            <p className="text-black">{result}</p>
          </div>
        )}

        <div className="absolute bottom-4 left-0 right-0 text-center">
          <button
            onClick={async () => {
              await startCamera();
            }}
            className="text-white bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            Start Camera
          </button>

          {videoRef.current && (
            <button
              onClick={() => {
                stopCamera();
              }}
              className="text-white bg-red-500 px-4 py-2 rounded-lg shadow hover:bg-red-600 ml-2"
            >
              Stop Camera
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
