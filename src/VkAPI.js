import FriendCard from '@/components/FriendCard';
import Button from '@/components/Button';

const parseUserData = (data) => {
  if (!data.error) {
    const users = data.response.items;
    let friends = [];
    users.forEach((user) => {
      friends.push({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        city: user.city || {},
        online: user.online,
      });
    });

    return friends;
  } else {
    console.log('Error while receiving data');
  }
};

const renderFriendsCards = (data) => {
  const friends = parseUserData(data);

  friends.forEach((friend) => {
    new FriendCard(friend, '.friends-box').render();
  });
};

const getLoginStatus = () => {
  let loginStatus = 'unknown';

  VK.Auth.getLoginStatus((response) => {
    if (response.status === 'connected') loginStatus = 'connected';
  });

  return loginStatus;
};

const showAuthError = (element) => {
  element.insertAdjacentHTML(
    'beforebegin',
    `
        <div class="login-message">
          Ошибка аутентификации
        </div>
      `,
  );
  element.style.opacity = '.5';
  element.disabled = true;
  setTimeout(() => {
    document.querySelector('.login-message').remove();
    element.disabled = false;
  }, 2000);
};

const authHandler = (e) => {
  e.preventDefault();
  VK.Auth.login((response) => {
    if (response.status === 'connected') {
      VK.Api.call(
        'friends.get',
        {
          order: 'random',
          count: 5,
          offset: 5,
          fields: 'city',
          name_case: 'nom',
          v: '5.120',
        },
        renderFriendsCards,
      );
    } else {
      showAuthError(e.target);
    }
  }, VK.access.FRIENDS);
};

const onAppLoad = () => {
  VK.init({
    apiId: 7541109,
  });

  if (getLoginStatus() === 'unknown') {
    new Button(
      'Авторизоваться',
      'btn vk-auth-btn',
      authHandler,
      '.container',
    ).render();
    return;
  }
  if (getLoginStatus() === 'connected') {
    VK.Api.call(
      'friends.get',
      {
        order: 'random',
        count: 5,
        offset: 5,
        fields: 'city',
        name_case: 'nom',
        v: '5.120',
      },
      renderFriendsCards,
    );
  }
};

export const initApp = () => {
  onAppLoad();
};
