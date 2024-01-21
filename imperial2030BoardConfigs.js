// Imperial 2030
import alaska from './components/board2030/alaska.svg';
import afghanistan from './components/board2030/afghanistan.svg';
import argentina from './components/board2030/argentina.svg';
import australia from './components/board2030/australia.svg';
import beijing from './components/board2030/beijing.svg';
import berlin2030 from './components/board2030/berlin.svg';
import blackSea2030 from './components/board2030/black_sea.svg';
import brasilia from './components/board2030/brasilia.svg';
import canada from './components/board2030/canada.svg';
import caribbeanSea from './components/board2030/caribbean_sea.svg';
import caspianSea from './components/board2030/caspian_sea.svg';
import chennai from './components/board2030/chennai.svg';
import chicago from './components/board2030/chicago.svg';
import chinaSea from './components/board2030/china_sea.svg';
import chongqing from './components/board2030/chongqing.svg';
import colombia from './components/board2030/colombia.svg';
import congo from './components/board2030/congo.svg';
import eastAfrica from './components/board2030/east_africa.svg';
import fortaleza from './components/board2030/fortaleza.svg';
import gulfOfGuinea from './components/board2030/gulf_of_guinea.svg';
import guinea from './components/board2030/guinea.svg';
import indianOcean from './components/board2030/indian_ocean.svg';
import indochina from './components/board2030/indochina.svg';
import indonesia from './components/board2030/indonesia.svg';
import iran from './components/board2030/iran.svg';
import japan from './components/board2030/japan.svg';
import kazakhstan from './components/board2030/kazakhstan.svg';
import kolkata from './components/board2030/kolkata.svg';
import korea from './components/board2030/korea.svg';
import london2030 from './components/board2030/london.svg';
import manaus from './components/board2030/manaus.svg';
import mediterraneanSea from './components/board2030/mediterranean_sea.svg';
import mexico from './components/board2030/mexico.svg';
import mongolia from './components/board2030/mongolia.svg';
import moscow2030 from './components/board2030/moscow.svg';
import mumbai from './components/board2030/mumbai.svg';
import murmansk from './components/board2030/murmansk.svg';
import nearEast from './components/board2030/near_east.svg';
import newDelhi from './components/board2030/new_delhi.svg';
import newOrleans from './components/board2030/new_orleans.svg';
import newYork from './components/board2030/new_york.svg';
import newZealand from './components/board2030/new_zealand.svg';
import nigeria from './components/board2030/nigeria.svg';
import northAfrica from './components/board2030/north_africa.svg';
import northAtlantic from './components/board2030/north_atlantic.svg';
import northPacific from './components/board2030/north_pacific.svg';
import novosibirsk from './components/board2030/novosibirsk.svg';
import paris2030 from './components/board2030/paris.svg';
import peru from './components/board2030/peru.svg';
import philippines from './components/board2030/philippines.svg';
import quebec from './components/board2030/quebec.svg';
import rioDeJaneiro from './components/board2030/rio_de_janeiro.svg';
import rome2030 from './components/board2030/rome.svg';
import sanFrancisco from './components/board2030/san_francisco.svg';
import seaOfJapan from './components/board2030/sea_of_japan.svg';
import shanghai from './components/board2030/shanghai.svg';
import southAfrica from './components/board2030/south_africa.svg';
import southAtlantic from './components/board2030/south_atlantic.svg';
import southPacific from './components/board2030/south_pacific.svg';
import tasmanSea from './components/board2030/tasman_sea.svg';
import turkey2030 from './components/board2030/turkey.svg';
import ukraine from './components/board2030/ukraine.svg';
import urumqi from './components/board2030/urumqi.svg';
import vladivostok from './components/board2030/vladivostok.svg';

export default {
  adjustments: {
    Beijing: {
      factoryX: 40,
      factoryY: -5,
      flagArmyX: 10,
      labelY: 20,
    },
    Berlin: {
      factoryY: 25,
    },
    'Caribbean Sea': {
      dotX: 40,
      flagFleetX: 40,
      flagFleetY: -10,
      labelX: 10,
      labelY: -10,
    },
    Chongqing: {
      factoryY: -20,
    },
    Fortaleza: {
      factoryY: -20,
      flagFleetX: 8,
      flagFleetY: -10,
    },
    Indonesia: {
      labelX: -20,
    },
    Japan: {
      labelX: 5,
      labelY: 25,
    },
    London: {
      factoryX: 25,
      factoryY: 5,
      labelX: 20,
      labelY: 25,
    },
    Mexico: {
      dotX: -30,
      flagArmyX: -30,
      labelX: -28,
    },
    Moscow: {
      factoryX: 10,
      factoryY: 10,
      flagArmyY: -20,
    },
    Murmansk: {
      factoryY: -30,
    },
    'New Orleans': {
      factoryX: 50,
      factoryY: 20,
      labelX: 10,
      labelY: 15,
    },
    'North Pacific': {
      dotX: -50,
      flagFleetX: -50,
      labelX: -50,
      labelY: 30,
    },
    Peru: {
      labelY: 10,
    },
    'Rio de Janeiro': {
      flagFleetX: 10,
      flagFleetY: -30,
    },
    'Sea of Japan': {
      dotX: 100,
      dotY: 30,
      flagFleetX: 100,
      flagFleetY: 30,
      labelX: 120,
      labelY: 60,
    },
    Shanghai: {
      factoryX: 30,
    },
  },
  nationColors: {
    CN: '#ebe084',
    BR: '#6E8D4E',
    EU: '#54bff9',
    US: '#ef7f72',
    IN: 'silver',
    RU: '#9c6bae',
  },
  seaProvinces: {
    'Caribbean Sea': caribbeanSea,
    'Caspian Sea': caspianSea,
    'Gulf of Guinea': gulfOfGuinea,
    'Indian Ocean': indianOcean,
    'Mediterranean Sea': mediterraneanSea,
    'Black Sea': blackSea2030,
    'North Atlantic': northAtlantic,
    'North Pacific': northPacific,
    'Sea of Japan': seaOfJapan,
    'South Atlantic': southAtlantic,
    'South Pacific': southPacific,
    'Tasman Sea': tasmanSea,
    'China Sea': chinaSea,
  },
  landProvinces: {
    Alaska: alaska,
    Afghanistan: afghanistan,
    Argentina: argentina,
    Australia: australia,
    Beijing: beijing,
    Berlin: berlin2030,
    Brasilia: brasilia,
    Canada: canada,
    Chennai: chennai,
    Chongqing: chongqing,
    Colombia: colombia,
    Congo: congo,
    'East Africa': eastAfrica,
    Fortaleza: fortaleza,
    Guinea: guinea,
    Indonesia: indonesia,
    Iran: iran,
    Japan: japan,
    Kazakhstan: kazakhstan,
    Kolkata: kolkata,
    Korea: korea,
    London: london2030,
    Manaus: manaus,
    Moscow: moscow2030,
    Mumbai: mumbai,
    Murmansk: murmansk,
    'Near East': nearEast,
    'New Delhi': newDelhi,
    'New Orleans': newOrleans,
    'New York': newYork,
    'New Zealand': newZealand,
    Nigeria: nigeria,
    'North Africa': northAfrica,
    Novosibirsk: novosibirsk,
    Chicago: chicago,
    Paris: paris2030,
    Quebec: quebec,
    'Rio de Janeiro': rioDeJaneiro,
    Rome: rome2030,
    'San Francisco': sanFrancisco,
    Shanghai: shanghai,
    'South Africa': southAfrica,
    Turkey: turkey2030,
    Ukraine: ukraine,
    Urumqi: urumqi,
    Mexico: mexico,
    Mongolia: mongolia,
    Peru: peru,
    Philippines: philippines,
    Vladivostok: vladivostok,
    Indochina: indochina,
  },
  viewBox: '0 0 1016.371 514.609',
};
