import favicon from './assets/favicon.ico';
import favicon2 from './assets/favicon2.ico';
import favicon3 from './assets/favicon3.ico';

export default (games, user, routeId) => {
  const link = document.createElement('link');
  link.rel = 'icon';
  document.getElementsByTagName('head')[0].appendChild(link);

  const itsMyTurnInThisGame = games.find((game) => (
    game.currentPlayerName === user?.displayName
    && game.id === routeId
    && !game.winner
  ));
  const itsMyTurnInAGame = games.some(
    (game) => game.currentPlayerName === user?.displayName && !game.winner,
  );

  if (itsMyTurnInThisGame) {
    link.href = favicon2;
  } else if (itsMyTurnInAGame) {
    link.href = favicon3;
  } else {
    link.href = favicon;
  }
};
