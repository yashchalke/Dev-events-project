import { useEffect, useState, useRef, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import GeneralLayout from "../Components/Layouts/GeneralLayout";
import GradientLayout from "../Components/Layouts/GradientLayout";

const ScanTicket = () => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  const [scanResult, setScanResult] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const scannerRef = useRef<Html5Qrcode | null>(null);

  const isScanningRef = useRef(false);

  const verifyTicket = useCallback(
    async (ticketId: string) => {
      const loadingToast = toast.loading("Verifying Ticket...");

      try {
        const token = await getToken();

        const response = await fetch(
          "http://localhost:5000/api/registrations/verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ticketId }),
          }
        );

        const data = await response.json();
        toast.dismiss(loadingToast);

        if (response.ok) {
          setStatusMessage("✅ " + data.message);
          toast.success("Entry Approved!");
        } else {
          setStatusMessage("❌ " + data.message);
          toast.error(data.message || "Verification Failed");
        }
      } catch (error: unknown) {
        console.error(error);
        toast.dismiss(loadingToast);
        toast.error("Network Error");

        let errMsg = "Could not connect to server.";
        if (error instanceof Error) {
          errMsg = error.message;
        }
        setStatusMessage(`⚠️ Network Error: ${errMsg}`);
      } finally {
        setTimeout(() => {
          isScanningRef.current = false;
          setIsProcessing(false);
          setStatusMessage("");

          if (scannerRef.current) {
            scannerRef.current.resume();
          }
        }, 3000);
      }
    },
    [getToken]
  );

  const onScanSuccess = useCallback(
    async (decodedText: string) => {
      if (isScanningRef.current) return;

      isScanningRef.current = true;
      setIsProcessing(true);
      setScanResult(decodedText);

      if (scannerRef.current) {
        scannerRef.current.pause(true);
      }

      await verifyTicket(decodedText);
    },
    [verifyTicket]
  );

  useEffect(() => {
    if (isSignedIn && !scannerRef.current) {
      setTimeout(() => {
        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: undefined,
        };

        html5QrCode
          .start(
            { facingMode: "environment" },
            config,
            onScanSuccess,
            undefined
          )
          .catch((err: unknown) => {
            console.error("Error starting camera", err);
            setCameraError(
              "Camera permission denied. Please allow camera access."
            );
            toast.error("Camera Permission Required");
          });
      }, 100);
    }

    return () => {
      if (scannerRef.current) {
        if (scannerRef.current.isScanning) {
          scannerRef.current
            .stop()
            .then(() => {
              scannerRef.current?.clear();
              scannerRef.current = null;
            })
            .catch((err) => console.error("Failed to stop scanner", err));
        } else {
          scannerRef.current.clear();
          scannerRef.current = null;
        }
      }
    };
  }, [isSignedIn, onScanSuccess]);

  if (!isLoaded) return null;

  if (!isSignedIn) {
    return (
      <GeneralLayout>
        <GradientLayout Gradient={1} />
        <div className="h-screen flex items-center justify-center text-white px-4 text-center">
          <div className="bg-white/10 p-8 rounded-xl border border-white/10 backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-4">Restricted Access</h2>
            <p>
              You must be an organizer or staff member to access the scanner.
            </p>
          </div>
        </div>
      </GeneralLayout>
    );
  }

  return (
    <GeneralLayout>
      <GradientLayout Gradient={1} />
      <Toaster position="top-center" />

      <style>{`
                #reader video {
                    object-fit: cover !important;
                    width: 100% !important;
                    height: 100% !important;
                    border-radius: 1rem;
                }
            `}</style>

      <div className="min-h-screen pt-28 pb-10 px-4 flex flex-col items-center">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Ticket Scanner
          </h1>
          <p className="text-gray-400">
            Logged in as: <span className="text-bg-main">{user?.fullName}</span>
          </p>
        </div>

        <div className="w-full max-w-md bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(147,51,234,0.3)] border-4 border-white/10 relative aspect-square">
          {cameraError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gray-900 z-30">
              <span className="text-4xl mb-2">🚫📷</span>
              <p className="text-red-400 font-bold mb-2">{cameraError}</p>
              <p className="text-gray-500 text-sm">
                Note: Camera access requires HTTPS or Localhost.
              </p>
            </div>
          ) : (
            <div id="reader" className="w-full h-full bg-black"></div>
          )}

          {isProcessing && (
            <div className="absolute inset-0 bg-black/85 z-20 flex flex-col items-center justify-center backdrop-blur-sm p-6 text-center animate-in fade-in duration-200">
              {statusMessage.includes("✅") ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.6)]">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Verified!
                  </h2>
                  <p className="text-green-400 text-lg font-medium">
                    {statusMessage.replace("✅", "").trim()}
                  </p>
                </div>
              ) : statusMessage.includes("⚠️") ? (
                <div className="flex flex-col items-center">
                  <div className="text-5xl mb-4">⚠️</div>
                  <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
                  <p className="text-yellow-400 text-lg">
                    {statusMessage.replace("⚠️", "").trim()}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(239,68,68,0.6)]">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Declined
                  </h2>
                  <p className="text-red-400 text-lg font-medium">
                    {statusMessage.replace("❌", "").trim()}
                  </p>
                </div>
              )}
              <p className="text-gray-500 text-sm mt-8 animate-pulse">
                Resetting in 3s...
              </p>
            </div>
          )}
        </div>

        {scanResult && !isProcessing && (
          <div className="mt-4 px-4 py-2 bg-white/10 rounded-lg">
            <p className="text-gray-400 text-xs uppercase">Last Read</p>
            <p className="text-white font-mono text-sm">{scanResult}</p>
          </div>
        )}

        <div className="mt-8 bg-white/5 p-6 rounded-xl border border-white/10 max-w-md w-full">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <span>ℹ️</span> Instructions
          </h3>
          <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
            <li>Grant camera permissions when prompted.</li>
            <li>Hold the device steady over the QR code.</li>
            <li>If scanning fails, check lighting or connection.</li>
          </ul>
        </div>
      </div>
    </GeneralLayout>
  );
};

export default ScanTicket;
