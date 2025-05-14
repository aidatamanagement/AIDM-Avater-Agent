// Widget configuration
const WIDGET_CONFIG = {
    containerId: 'tavus-widget-container',
    defaultValues: {
        replica_id: "r9fa0878977a",
        conversation_name: "Tavus Chat Session",
        persona_id: "",
        conversational_context: ""
    },
    styles: `
        .tavus-widget {
            font-family: 'Fixeldisplay', Arial, sans-serif;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 400px;
            display: flex;
            flex-direction: column;
        }

        .tavus-video-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
        }

        .tavus-video-container video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            min-width: 100%;
            min-height: 100%;
        }

        .tavus-content {
            position: relative;
            z-index: 1;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px;
            margin-bottom: 20px;
        }

        .tavus-start-chat-btn {
            padding: .80rem 1.25rem;
            font-size: .875rem;
            font-weight: 600;
            background-color: #115E49;
            color: white;
            border: none;
            border-radius: .75em;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            margin: 0 auto;
            letter-spacing: .5px;
            text-transform: uppercase;
        }

        .tavus-start-chat-btn:hover {
            background-color: #0d4a3a;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .tavus-start-chat-btn.loading {
            background-color: #082d23;
            cursor: not-allowed;
        }

        .tavus-loading-spinner {
            display: none;
            width: 20px;
            height: 20px;
            border: 3px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: tavus-spin 1s linear infinite;
        }

        @keyframes tavus-spin {
            to {
                transform: rotate(360deg);
            }
        }

        .tavus-start-chat-btn.loading .tavus-loading-spinner {
            display: inline-block;
        }

        .tavus-chat-popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 95%;
            height: 95%;
            max-width: 95vw;
            max-height: 95vh;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            overflow: hidden;
        }

        .tavus-chat-popup.active {
            display: block;
        }

        .tavus-close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #115E49;
            border: none;
            color: #ffffff;
            font-size: 24px;
            cursor: pointer;
            z-index: 1001;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .tavus-close-btn:hover {
            background-color: #0d4a3a;
            transform: scale(1.05);
        }

        .tavus-chat-content {
            height: 100%;
            padding: 20px;
            overflow: hidden;
            border-radius: 12px;
        }

        .tavus-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999;
            backdrop-filter: blur(4px);
        }

        .tavus-overlay.active {
            display: block;
        }
    `
};

// Create widget container
function createWidgetContainer() {
    const container = document.createElement('div');
    container.id = WIDGET_CONFIG.containerId;
    container.className = 'tavus-widget';
    container.innerHTML = `
        <div class="tavus-video-container">
            <video autoplay muted loop playsinline>
                <source src="https://cdn.prod.website-files.com/63b2f566abde4cad39ba419f%2F67b5222642c2133d9163ce80_newmike-transcode.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <div class="tavus-content">
            <button class="tavus-start-chat-btn">
                <span class="tavus-loading-spinner"></span>
                <span class="tavus-button-text">Start Chatting Now</span>
            </button>
        </div>
        <div class="tavus-overlay"></div>
        <div class="tavus-chat-popup">
            <button class="tavus-close-btn">&times;</button>
            <div class="tavus-chat-content">
                <iframe id="tavusChatFrame" style="width: 100%; height: 100%; border: none;" allow="camera; microphone; display-capture"></iframe>
            </div>
        </div>
    `;
    return container;
}

// Initialize the widget
function initTavusWidget(config = {}) {
    // Styles
    const styles = `
        .tavus-widget {
            font-family: 'Fixeldisplay', Arial, sans-serif;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 400px;
            display: flex;
            flex-direction: column;
        }

        .tavus-video-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            overflow: hidden;
        }

        .tavus-video-container video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            min-width: 100%;
            min-height: 100%;
        }

        .tavus-content {
            position: relative;
            z-index: 1;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 20px;
            margin-bottom: 20px;
        }

        .tavus-start-chat-btn {
            padding: .80rem 1.25rem;
            font-size: .875rem;
            font-weight: 600;
            background-color: #115E49;
            color: white;
            border: none;
            border-radius: .75em;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            margin: 0 auto;
            letter-spacing: .5px;
            text-transform: uppercase;
        }

        .tavus-start-chat-btn:hover {
            background-color: #0d4a3a;
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .tavus-start-chat-btn.loading {
            background-color: #082d23;
            cursor: not-allowed;
        }

        .tavus-loading-spinner {
            display: none;
            width: 20px;
            height: 20px;
            border: 3px solid #ffffff;
            border-radius: 50%;
            border-top-color: transparent;
            animation: tavus-spin 1s linear infinite;
        }

        @keyframes tavus-spin {
            to {
                transform: rotate(360deg);
            }
        }

        .tavus-start-chat-btn.loading .tavus-loading-spinner {
            display: inline-block;
        }

        .tavus-chat-popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 95%;
            height: 95%;
            max-width: 95vw;
            max-height: 95vh;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 999999;
            overflow: hidden;
        }

        .tavus-chat-popup.active {
            display: block;
        }

        .tavus-close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #115E49;
            border: none;
            color: #ffffff;
            font-size: 24px;
            cursor: pointer;
            z-index: 1000000;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .tavus-close-btn:hover {
            background-color: #0d4a3a;
            transform: scale(1.05);
        }

        .tavus-chat-content {
            height: 100%;
            padding: 20px;
            overflow: hidden;
            border-radius: 12px;
        }

        .tavus-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 999998;
            backdrop-filter: blur(4px);
        }

        .tavus-overlay.active {
            display: block;
        }
    `;

    // Create and inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create widget HTML
    const container = document.getElementById('tavus-widget-container');
    container.innerHTML = `
        <div class="tavus-widget">
            <div class="tavus-video-container">
                <video autoplay muted loop playsinline>
                    <source src="https://cdn.prod.website-files.com/63b2f566abde4cad39ba419f%2F67b5222642c2133d9163ce80_newmike-transcode.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
            <div class="tavus-content">
                <button class="tavus-start-chat-btn">
                    <span class="tavus-loading-spinner"></span>
                    <span class="tavus-button-text">Start Chatting Now</span>
                </button>
            </div>
        </div>
    `;

    // Create popup and overlay elements at document level
    const popupHTML = `
        <div class="tavus-overlay"></div>
        <div class="tavus-chat-popup">
            <button class="tavus-close-btn">&times;</button>
            <div class="tavus-chat-content">
                <iframe id="tavusChatFrame" style="width: 100%; height: 100%; border: none;" allow="camera; microphone; display-capture"></iframe>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', popupHTML);

    // Initialize event listeners
    const startChatBtn = container.querySelector('.tavus-start-chat-btn');
    const buttonText = container.querySelector('.tavus-button-text');
    const chatPopup = document.querySelector('.tavus-chat-popup');
    const closeBtn = document.querySelector('.tavus-close-btn');
    const overlay = document.querySelector('.tavus-overlay');
    const chatFrame = document.querySelector('#tavusChatFrame');
    let currentConversationId = null;

    startChatBtn.addEventListener('click', async () => {
        if (startChatBtn.classList.contains('loading')) return;
        
        startChatBtn.classList.add('loading');
        buttonText.textContent = 'Connecting with agent...';

        try {
            const response = await fetch(`${config.apiUrl}api/create-conversation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    replica_id: config.defaultValues.replica_id,
                    conversation_name: config.defaultValues.conversation_name,
                    persona_id: config.defaultValues.persona_id,
                    conversational_context: config.defaultValues.conversational_context
                })
            });
            
            const data = await response.json();
            if (data.error) {
                alert('Failed to start chat. Please try again.');
                resetButton();
                return;
            }

            currentConversationId = data.conversation_id;
            chatFrame.src = data.join_url;
            chatPopup.classList.add('active');
            overlay.classList.add('active');
            resetButton();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to start chat. Please try again.');
            resetButton();
        }
    });

    function resetButton() {
        startChatBtn.classList.remove('loading');
        buttonText.textContent = 'Start Chatting Now';
    }

    async function closeChat() {
        if (currentConversationId) {
            try {
                await fetch(`${config.apiUrl}api/end-conversation/${currentConversationId}`, {
                    method: 'POST'
                });
            } catch (error) {
                console.error('Error ending conversation:', error);
            }
            currentConversationId = null;
        }

        chatPopup.classList.remove('active');
        overlay.classList.remove('active');
        chatFrame.src = 'about:blank';
    }

    closeBtn.addEventListener('click', closeChat);
    overlay.addEventListener('click', closeChat);

    window.addEventListener('message', function(event) {
        if (event.data === 'meeting-ended') {
            closeChat();
        }
    });
}

// Export the initialization function
window.initTavusWidget = initTavusWidget; 


