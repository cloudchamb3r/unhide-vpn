const ipList = [];

function addIp(ip) { 
    const $list = document.getElementById('ip-list'); 
    if (!$list) return; 
    if (ipList.includes(ip)) return; 
    const $el = document.createElement('li'); 
    $el.innerText = ip; 
    $list.append($el);
    ipList.push(ip);
}

async function UnHide() {
    const servers = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // Corrected port
    };

    const localConnection = new RTCPeerConnection(servers);

    localConnection.onicecandidate = (event) => {
        if (event && event.candidate) {
            const ip = event.candidate.address;
            addIp(ip);
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


