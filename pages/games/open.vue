<template>
  <v-container>
    <span class="text-h5">Open Games</span>
    <v-table
      density="compact"
      hover
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Players</th>
          <th>Host</th>
          <th>Open Since</th>
          <th>Variant</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="game of openGames"
          :key="game.id"
        >
          <td>
            <router-link :to="{ path: '/games/' + game.id }">
              <span>{{ game.name }}</span>
            </router-link>
          </td>
          <td>
            {{ game.players.length }}
          </td>
          <td>
            {{ game.host }}
          </td>
          <td>
            {{ toTime(game.createdAt) }}
          </td>
          <td>
            {{ variant(game.baseGame) }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup>
import toTime from '../toTime';

const props = defineProps({
  openGames: { type: Array, default: () => [] }, profile: { type: Object, default: () => {} },
});

const variant = (baseGame) => {
  if (baseGame === 'imperial') {
    return 'Imperial (Classic)';
  } if (baseGame === 'imperialEurope2030') {
    return 'Imperial (2030 Rules)';
  } if (baseGame === 'imperial2030') {
    return 'Imperial 2030';
  } if (baseGame === 'imperialAsia') {
    return 'Imperial Asia';
  }
  return '';
}
</script>
