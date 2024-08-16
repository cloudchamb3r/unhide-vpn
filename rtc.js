async function UnHide() {
    const servers = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // Corrected port
    };

    const localConnection = new RTCPeerConnection(servers);

    localConnection.onicecandidate = (event) => {
        if (event && event.candidate) {
            const candidate = event.candidate;
            const ip = candidate.address;
            const list = document.getElementById('ip-list');
            const elem = document.createElement('li');
            elem.innerText = ip;
            list.append(elem);
        }
    };

    try {
        await window.navigator.mediaDevices.getUserMedia({ audio: true });
        const offer = await localConnection.createOffer({ offerToReceiveAudio: true });
        await localConnection.setLocalDescription(offer);
    } catch (err) {
        console.error('Error:', err);
    }
}

UnHide().then();


