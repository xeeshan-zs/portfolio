import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import './InstallPrompt.css';

const InstallPrompt = () => {
    const [showPrompt, setShowPrompt] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        // Check if already dismissed
        const dismissed = localStorage.getItem('installPromptDismissed');
        if (dismissed) return;

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Show custom prompt for iOS
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

        if (isIOS && !isStandalone && !dismissed) {
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
        localStorage.setItem('installPromptDismissed', 'true');
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
                        <p>Tap the share button and select "Add to Home Screen"</p>
                    ) : (
                        <p>Install this portfolio for quick access anytime!</p>
                    )}
                </div>
                <div className="install-actions">
                    {!isIOS && (
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
