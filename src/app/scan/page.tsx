"use client";
import { useZxing } from "react-zxing";
import { useEffect, useState } from "react";
export default function Attendance() {
  const [result, setResult] = useState<string | null>(null);
  const { ref } = useZxing({
    //@ts-ignore
    onDecodeResult(result) {
      setResult(result.getText());
      stopCamera();
    },
  });

  const stopCamera = () => {
    const stream = ref.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => {
      track.stop();
    });
  };

  useEffect(() => {
    stopCamera();
  }, []);

  const startCamera = async () => {
    await navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        const video = ref.current;
        if (video) {
          video.srcObject = stream;
        }
      });
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-950">
        <video className="w-full rounded-lg border border-gray-400" ref={ref} />

        <button
          onClick={async () => {
            await startCamera();
          }}
          className="text-white"
        >
          Scan
        </button>
      </div>
    </>
  );
}
