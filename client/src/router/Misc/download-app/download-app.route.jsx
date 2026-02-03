import React, { useEffect, useMemo, useState } from "react";

// Download / Install page for an iOS "web app" (PWA-style Add to Home Screen)
// Tailwind-only. Drop into your routes as /download (or similar).

const isIOS = () => {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

const isSafari = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const isSafariLike =
    /Safari/.test(ua) && !/Chrome|CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);
  return isSafariLike;
};

const isStandalone = () => {
  // iOS standalone (A2HS) exposes navigator.standalone
  // Modern browsers may also support display-mode
  if (typeof window === "undefined") return false;
  // @ts-ignore
  const navStandalone =
    typeof navigator !== "undefined" && navigator.standalone;
  const mediaStandalone = window.matchMedia?.(
    "(display-mode: standalone)",
  )?.matches;
  return Boolean(navStandalone || mediaStandalone);
};

const Step = ({ number, title, children }) => (
  <div className="border rounded-2xl bg-white shadow-sm p-5">
    <div className="flex items-start gap-4">
      <div className="shrink-0 w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
        {number}
      </div>
      <div className="min-w-0">
        <p className="text-lg font-semibold text-gray-900">{title}</p>
        <div className="mt-2 text-sm text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
    {children}
  </span>
);

const FAQItem = ({ q, a }) => (
  <div className="border rounded-2xl bg-white shadow-sm p-5">
    <p className="font-semibold text-gray-900">{q}</p>
    <p className="mt-2 text-sm text-gray-700 leading-relaxed">{a}</p>
  </div>
);

export default function DownloadAppPage() {
  const [env, setEnv] = useState({
    ios: false,
    safari: false,
    standalone: false,
  });

  useEffect(() => {
    setEnv({ ios: isIOS(), safari: isSafari(), standalone: isStandalone() });
  }, []);

  const primaryMessage = useMemo(() => {
    if (env.standalone) {
      return {
        title: "You're already installed ✅",
        sub: "Looks like you opened the app from your Home Screen.",
      };
    }

    if (env.ios && env.safari) {
      return {
        title: "Install the app on iPhone",
        sub: "This installs a Home Screen app (no App Store required).",
      };
    }

    if (env.ios && !env.safari) {
      return {
        title: "Open in Safari to install",
        sub: "iOS only allows “Add to Home Screen” from Safari.",
      };
    }

    return {
      title: "Install the app",
      sub: "You can add this web app to your Home Screen for quick access.",
    };
  }, [env.ios, env.safari, env.standalone]);

  // You can replace this with your production URL.
  const appUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      // lightweight feedback
      alert("Link copied!");
    } catch {
      alert("Could not copy. Please copy the URL from the address bar.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-10">
        {/* Header */}
        <div className="border rounded-3xl bg-white shadow-sm p-6 sm:p-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge>iOS</Badge>
              <Badge>Home Screen App</Badge>
              <Badge>No App Store</Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900">
              {primaryMessage.title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl">
              {primaryMessage.sub}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center">
              <a
                href={appUrl}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800"
              >
                Open the app
              </a>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200"
              >
                Copy link
              </button>
            </div>

            {!env.standalone ? (
              <div className="mt-5 rounded-2xl bg-gray-50 border p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Tip:</span> After installing,
                  the app opens full-screen and shows up like a normal app.
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Steps */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Step number={1} title="Open this page in Safari">
            If you're on iPhone and using Chrome or another browser, tap the
            menu and choose{" "}
            <span className="font-semibold">Open in Safari</span>.
          </Step>

          <Step number={2} title="Tap the Share icon">
            In Safari, tap the <span className="font-semibold">Share</span>{" "}
            button (a square with an arrow). It’s usually at the bottom of the
            screen.
          </Step>

          <Step number={3} title="Add to Home Screen">
            Scroll the share sheet and tap{" "}
            <span className="font-semibold">Add to Home Screen</span>.
          </Step>

          <Step number={4} title="Name it and Add">
            Pick a name (or keep the default) and tap{" "}
            <span className="font-semibold">Add</span>. You’ll get an icon on
            your Home Screen.
          </Step>
        </div>

        {/* Troubleshooting / Notes */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 border rounded-2xl bg-white shadow-sm p-6">
            <p className="text-lg font-semibold text-gray-900">
              Troubleshooting
            </p>

            <div className="mt-4 space-y-3">
              <div className="border rounded-xl bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">
                  I don’t see “Add to Home Screen”
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  Make sure you’re in{" "}
                  <span className="font-semibold">Safari</span>. Some in-app
                  browsers (Instagram, TikTok) hide the option.
                </p>
              </div>

              <div className="border rounded-xl bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">
                  The app looks like a website
                </p>
                <p className="mt-1 text-sm text-gray-700">
                  After adding, open it from your Home Screen icon. It should
                  run full-screen.
                </p>
              </div>

              <div className="border rounded-xl bg-gray-50 p-4">
                <p className="font-semibold text-gray-900">Notifications</p>
                <p className="mt-1 text-sm text-gray-700">
                  Web apps on iOS have limitations. If you need push
                  notifications later, we can add them as iOS support allows.
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-2xl bg-white shadow-sm p-6">
            <p className="text-lg font-semibold text-gray-900">
              Share the install link
            </p>
            <p className="mt-2 text-sm text-gray-700">
              Send this link to clients so they can install the app:
            </p>
            <div className="mt-3 border rounded-xl bg-gray-50 p-3">
              <p className="text-sm font-semibold text-gray-900 break-all">
                {appUrl || "https://your-domain.com"}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="mt-3 w-full px-4 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800"
            >
              Copy link
            </button>

            <div className="mt-4 border rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-700">
                Want a QR code? If you want, I can add a tiny QR component or
                plug in a hosted QR image.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-6">
          <p className="text-lg font-semibold text-gray-900">FAQ</p>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
            <FAQItem
              q="Is this a real iOS app?"
              a="It’s a web app installed to your Home Screen. It launches like an app and can feel native, but it’s still powered by the web."
            />
            <FAQItem
              q="Will it update automatically?"
              a="Yes. When you deploy updates, the app will load the latest version the next time it opens (or after a refresh)."
            />
            <FAQItem
              q="Do I need the App Store?"
              a="No. Install is done through Safari → Share → Add to Home Screen."
            />
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-gray-500">
          <p>
            Note: To make this feel truly “app-like” on iOS, ensure your PWA
            manifest and icons are configured.
          </p>
        </div>
      </div>
    </div>
  );
}
