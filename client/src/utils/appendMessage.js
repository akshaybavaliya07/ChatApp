// const audio = new Audio('/ting.mp3');

export const appendMessage = async (message, position) => {
    const msgContainer = document.querySelector('.container');
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    msgContainer.appendChild(messageElement);
    // if(position === 'left') audio.play();
};