export const defaultLatestState = (baseGame) => {
  switch (baseGame) {
    case 'imperial':
      return {
        baseGame: 'imperial',
        currentNation: 'AH',
        nations: [],
        units: {},
      };
    case 'imperialEurope2030':
      return {
        baseGame: 'imperialEurope2030',
        currentNation: 'AH',
        nations: [],
        units: {},
      };
    case 'imperial2030':
      return {
        baseGame: 'imperial2030',
        currentNation: 'RU',
        nations: [],
        units: {},
      };
    case 'imperialAsia':
      return {
        baseGame: 'imperialAsia',
        currentNation: 'CN',
        nations: [],
        units: {},
      };
    default:
      return {
        baseGame: 'imperial',
        currentNation: 'AH',
        nations: [],
        units: {},
      };
  }
};

export default (game) => {
  let latestState;

  const nullsafeLatestState = game.latest_state || '{}';
  if (Object.keys(JSON.parse(nullsafeLatestState)).length > 0) {
    latestState = game.latestState;
  } else {
    latestState = JSON.stringify(defaultLatestState(game.baseGame));
  }

  return {
    host: game.host,
    baseGame: game.baseGame,
    players: game.players,
    name: game.name,
    id: game.id,
    currentPlayerName: game.currentPlayerName,
    winner: game.winnerName,
    forceEndedAt: game.forceEndedAt,
    cancelledAt: game.cancelledAt,
    createdAt: game.createdAt,
    startedAt: game.startedAt,
    observers: game.observers,
    variant: game.variant,
    lastMoveAt: game.lastMoveAt,
    clonedFromGame: game.clonedFromGame,
    isPublic: game.isPublic,
    latestState,
  };
};
