import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import './InstallPrompt.css';

const InstallPrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        // Check visit count and timing
        const today = new Date().toDateString();
        const storedData = JSON.parse(localStorage.getItem('installPromptData') || '{}');

        // Reset count if it's a new day
        if (storedData.date !== today) {
            storedData.date = today;
            storedData.dismissCount = 0;
            storedData.visitCount = 0;
        }

        storedData.visitCount = (storedData.visitCount || 0) + 1;
        localStorage.setItem('installPromptData', JSON.stringify(storedData));

        // Show if: dismissed less than 2 times today, OR visited more than 2 times
        const shouldShow = storedData.dismissCount < 2 || storedData.visitCount > 2;

        if (!shouldShow) return;

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Show custom prompt for iOS or after delay
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

        if (!isStandalone) {
            setTimeout(() => setShowPrompt(true), 2000);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                setShowPrompt(false);
            }
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);

        // Update dismiss count
        const storedData = JSON.parse(localStorage.getItem('installPromptData') || '{}');
        storedData.dismissCount = (storedData.dismissCount || 0) + 1;
        localStorage.setItem('installPromptData', JSON.stringify(storedData));
    };

    if (!showPrompt) return null;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <div className="install-prompt">
            <div className="install-content">
                <div className="install-icon">
                    <Download size={24} />
                </div>
                <div className="install-text">
                    <h4>Install App</h4>
                    {isIOS ? (
                        <p>Tap share button and "Add to Home Screen"</p>
                    ) : (
                        <p>Install this portfolio for quick access!</p>
                    )}
                </div>
                <div className="install-actions">
                    {!isIOS && deferredPrompt && (
                        <button className="install-btn" onClick={handleInstall}>
                            Install
                        </button>
                    )}
                    <button className="dismiss-btn" onClick={handleDismiss}>
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallPrompt;
