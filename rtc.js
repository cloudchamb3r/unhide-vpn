/**
 * @type {RTCConfiguration}
 */
const servers = {
    iceServers: [
        {urls: 'stun:stun.l.google.com:19032'}
    ]
}

const localConnection = new RTCPeerConnection(servers);
const channel = localConnection.createDataChannel('unhide-vpn');

window.navigator.mediaDevices.getUserMedia({audio: true}).then((ms) => {
    localConnection.createOffer({ offerToReceiveAudio: true })
    .then((desc) => {
        console.log(desc.sdp);
        localConnection.setLocalDescription(desc);
    })
})

localConnection.createOffer({ offerToReceiveAudio: true })
.then((desc) => {
    console.log(desc.sdp);
    localConnection.setLocalDescription(desc);
});

localConnection.onicecandidate = (ev) => {
    const list = document.getElementById('ip-list');
    const elem = document.createElement('li'); 
    elem.innerText = ev.candidate.address;  
    list.append(elem);
}


