function randomAvatar() {
    const number = Math.floor(Math.random() * 10 + 1);
    const avatar = `/avatars/${number}.png`;
    return `url(${avatar})`;
}

export default randomAvatar;

// Avatars are downloaded from Flaticon: https://www.flaticon.com/free-icons
