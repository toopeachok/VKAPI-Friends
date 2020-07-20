export default class FriendCard {
  constructor(friend, parentSelector) {
    this.firstName = friend.firstName;
    this.lastName = friend.lastName || '';
    this.city = friend.city.title || 'Город не указан';
    this.online = friend.online ? 'online' : 'offline';
    this.parent = document.querySelector(parentSelector);
  }

  render() {
    const element = document.createElement('div');
    element.classList.add('friend-card');
    element.innerHTML = `
        <div class="friend-card__name" ${'style="color: #2a5885"'}>${
      this.firstName
    } ${this.lastName}</div>
        <div class="friend-card__city">${this.city}</div>
        <div class="friend-card__online" ${
          this.online === 'online'
            ? 'style="color: #4bb34b"'
            : 'style="color:#939393"'
        }>${this.online}</div>
      `;
    this.parent.append(element);
  }
}
