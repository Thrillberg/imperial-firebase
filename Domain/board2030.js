import { Nation2030 } from './constants';
import GameBoard from './gameBoard';

const nodes = [
  { isOcean: true, name: 'northpacific' },
  { isOcean: true, name: 'southpacific' },
  { isOcean: true, name: 'northatlantic' },
  { isOcean: true, name: 'caribbeansea' },
  { isOcean: true, name: 'southatlantic' },
  { isOcean: true, name: 'gulfofguinea' },
  { isOcean: true, name: 'mediterraneansea' },
  { isOcean: true, name: 'indianocean' },
  { isOcean: true, name: 'seaofjapan' },
  { isOcean: true, name: 'chinasea' },
  { isOcean: true, name: 'tasmansea' },
  { isOcean: false, name: 'alaska' },
  { isOcean: false, name: 'canada' },
  { isOcean: false, name: 'quebec' },
  { isOcean: false, name: 'mexico' },
  { isOcean: false, name: 'colombia' },
  { isOcean: false, name: 'peru' },
  { isOcean: false, name: 'argentina' },
  { isOcean: false, name: 'guinea' },
  { isOcean: false, name: 'northafrica' },
  { isOcean: false, name: 'nigeria' },
  { isOcean: false, name: 'congo' },
  { isOcean: false, name: 'southafrica' },
  { isOcean: false, name: 'eastafrica' },
  { isOcean: false, name: 'neareast' },
  { isOcean: false, name: 'turkey' },
  { isOcean: false, name: 'ukraine' },
  { isOcean: false, name: 'iran' },
  { isOcean: false, name: 'afghanistan' },
  { isOcean: false, name: 'kazakhstan' },
  { isOcean: false, name: 'mongolia' },
  { isOcean: false, name: 'indochina' },
  { isOcean: false, name: 'korea' },
  { isOcean: false, name: 'japan' },
  { isOcean: false, name: 'philippines' },
  { isOcean: false, name: 'indonesia' },
  { isOcean: false, name: 'australia' },
  { isOcean: false, name: 'newzealand' },
  {
    nation: Nation2030.RU, factoryType: 'armaments', name: 'moscow', isHome: true,
  },
  {
    nation: Nation2030.RU,
    factoryType: 'shipyard',
    name: 'murmansk',
    egress: 'northatlantic',
  },
  {
    nation: Nation2030.RU,
    factoryType: 'shipyard',
    name: 'vladivostok',
    egress: 'seaofjapan',
  },
  { nation: Nation2030.RU, factoryType: 'armaments', name: 'novosibirsk' },
  {
    nation: Nation2030.CN, factoryType: 'armaments', name: 'beijing', isHome: true,
  },
  { nation: Nation2030.CN, factoryType: 'armaments', name: 'urumqi' },
  {
    nation: Nation2030.CN,
    factoryType: 'shipyard',
    name: 'shanghai',
    egress: 'chinasea',
  },
  { nation: Nation2030.CN, factoryType: 'armaments', name: 'chongqing' },
  {
    nation: Nation2030.IN, factoryType: 'armaments', name: 'newdelhi', isHome: true,
  },
  {
    nation: Nation2030.IN,
    factoryType: 'shipyard',
    name: 'mumbai',
    egress: 'indianocean',
  },
  {
    nation: Nation2030.IN,
    factoryType: 'shipyard',
    name: 'kolkata',
    egress: 'indianocean',
  },
  { nation: Nation2030.IN, factoryType: 'armaments', name: 'chennai' },
  {
    nation: Nation2030.BR, factoryType: 'armaments', name: 'brasilia', isHome: true,
  },
  {
    nation: Nation2030.BR,
    factoryType: 'shipyard',
    name: 'riodejaneiro',
    egress: 'southatlantic',
  },
  {
    nation: Nation2030.BR,
    factoryType: 'shipyard',
    name: 'fortaleza',
    egress: 'caribbeansea',
  },
  { nation: Nation2030.BR, factoryType: 'armaments', name: 'manaus' },
  {
    nation: Nation2030.US, factoryType: 'armaments', name: 'chicago', isHome: true,
  },
  {
    nation: Nation2030.US,
    factoryType: 'shipyard',
    name: 'newyork',
    egress: 'northatlantic',
  },
  {
    nation: Nation2030.US,
    factoryType: 'shipyard',
    name: 'neworleans',
    egress: 'caribbeansea',
  },
  {
    nation: Nation2030.US,
    factoryType: 'shipyard',
    name: 'sanfrancisco',
    egress: 'northpacific',
  },
  {
    nation: Nation2030.EU, factoryType: 'armaments', name: 'paris', isHome: true,
  },
  {
    nation: Nation2030.EU,
    factoryType: 'shipyard',
    name: 'london',
    egress: 'northatlantic',
  },
  {
    nation: Nation2030.EU,
    factoryType: 'shipyard',
    name: 'rome',
    egress: 'mediterraneansea',
  },
  { nation: Nation2030.EU, factoryType: 'armaments', name: 'berlin' },

];

const edges = [
  ['alaska', 'canada'],
  ['alaska', 'northpacific'],
  ['canada', 'alaska'],
  ['canada', 'quebec'],
  ['canada', 'sanfrancisco'],
  ['canada', 'chicago'],
  ['canada', 'newyork'],
  ['canada', 'northpacific'],
  ['canada', 'northatlantic'],
  ['quebec', 'canada'],
  ['quebec', 'newyork'],
  ['quebec', 'northatlantic'],
  ['sanfrancisco', 'northpacific'],
  ['sanfrancisco', 'canada'],
  ['sanfrancisco', 'chicago'],
  ['sanfrancisco', 'neworleans'],
  ['sanfrancisco', 'mexico'],
  ['chicago', 'canada'],
  ['chicago', 'newyork'],
  ['chicago', 'neworleans'],
  ['chicago', 'sanfrancisco'],
  ['newyork', 'northatlantic'],
  ['newyork', 'chicago'],
  ['newyork', 'canada'],
  ['newyork', 'neworleans'],
  ['neworleans', 'caribbeansea'],
  ['neworleans', 'newyork'],
  ['neworleans', 'mexico'],
  ['neworleans', 'sanfrancisco'],
  ['neworleans', 'chicago'],
  ['mexico', 'neworleans'],
  ['mexico', 'colombia'],
  ['mexico', 'sanfrancisco'],
  ['mexico', 'northpacific'],
  ['mexico', 'caribbeansea'],
  ['colombia', 'mexico'],
  ['colombia', 'manaus'],
  ['colombia', 'peru'],
  ['colombia', 'northpacific'],
  ['colombia', 'caribbeansea'],
  ['peru', 'colombia'],
  ['peru', 'manaus'],
  ['peru', 'brasilia'],
  ['peru', 'argentina'],
  ['peru', 'southpacific'],
  ['argentina', 'peru'],
  ['argentina', 'brasilia'],
  ['argentina', 'riodejaneiro'],
  ['argentina', 'southpacific'],
  ['argentina', 'southatlantic'],
  ['riodejaneiro', 'southatlantic'],
  ['riodejaneiro', 'argentina'],
  ['riodejaneiro', 'brasilia'],
  ['riodejaneiro', 'fortaleza'],
  ['brasilia', 'riodejaneiro'],
  ['brasilia', 'argentina'],
  ['brasilia', 'manaus'],
  ['brasilia', 'peru'],
  ['brasilia', 'fortaleza'],
  ['manaus', 'brasilia'],
  ['manaus', 'peru'],
  ['manaus', 'colombia'],
  ['manaus', 'fortaleza'],
  ['manaus', 'caribbeansea'],
  ['fortaleza', 'caribbeansea'],
  ['fortaleza', 'manaus'],
  ['fortaleza', 'brasilia'],
  ['fortaleza', 'riodejaneiro'],
  ['london', 'northatlantic'],
  ['london', 'paris'],
  ['paris', 'northatlantic'],
  ['paris', 'london'],
  ['paris', 'berlin'],
  ['paris', 'rome'],
  ['paris', 'mediterraneansea'],
  ['rome', 'paris'],
  ['rome', 'berlin'],
  ['rome', 'ukraine'],
  ['rome', 'turkey'],
  ['rome', 'mediterraneansea'],
  ['berlin', 'northatlantic'],
  ['berlin', 'murmansk'],
  ['berlin', 'ukraine'],
  ['berlin', 'rome'],
  ['berlin', 'paris'],
  ['ukraine', 'berlin'],
  ['ukraine', 'murmansk'],
  ['ukraine', 'moscow'],
  ['ukraine', 'rome'],
  ['murmansk', 'northatlantic'],
  ['murmansk', 'novosibirsk'],
  ['murmansk', 'moscow'],
  ['murmansk', 'ukraine'],
  ['murmansk', 'berlin'],
  ['moscow', 'murmansk'],
  ['moscow', 'novosibirsk'],
  ['moscow', 'kazakhstan'],
  ['moscow', 'ukraine'],
  ['novosibirsk', 'murmansk'],
  ['novosibirsk', 'vladivostok'],
  ['novosibirsk', 'mongolia'],
  ['novosibirsk', 'kazakhstan'],
  ['novosibirsk', 'moscow'],
  ['vladivostok', 'novosibirsk'],
  ['vladivostok', 'seaofjapan'],
  ['vladivostok', 'korea'],
  ['vladivostok', 'beijing'],
  ['vladivostok', 'mongolia'],
  ['kazakhstan', 'moscow'],
  ['kazakhstan', 'novosibirsk'],
  ['kazakhstan', 'mongolia'],
  ['kazakhstan', 'urumqi'],
  ['kazakhstan', 'afghanistan'],
  ['mongolia', 'novosibirsk'],
  ['mongolia', 'vladivostok'],
  ['mongolia', 'beijing'],
  ['mongolia', 'urumqi'],
  ['mongolia', 'kazakhstan'],
  ['korea', 'beijing'],
  ['korea', 'vladivostok'],
  ['korea', 'seaofjapan'],
  ['korea', 'chinasea'],
  ['japan', 'seaofjapan'],
  ['beijing', 'mongolia'],
  ['beijing', 'vladivostok'],
  ['beijing', 'korea'],
  ['beijing', 'chinasea'],
  ['beijing', 'shanghai'],
  ['beijing', 'chongqing'],
  ['beijing', 'urumqi'],
  ['shanghai', 'beijing'],
  ['shanghai', 'chinasea'],
  ['shanghai', 'indochina'],
  ['shanghai', 'chongqing'],
  ['chongqing', 'beijing'],
  ['chongqing', 'shanghai'],
  ['chongqing', 'indochina'],
  ['chongqing', 'kolkata'],
  ['chongqing', 'urumqi'],
  ['urumqi', 'kazakhstan'],
  ['urumqi', 'mongolia'],
  ['urumqi', 'beijing'],
  ['urumqi', 'chongqing'],
  ['urumqi', 'kolkata'],
  ['urumqi', 'newdelhi'],
  ['urumqi', 'afghanistan'],
  ['afghanistan', 'kazakhstan'],
  ['afghanistan', 'urumqi'],
  ['afghanistan', 'newdelhi'],
  ['afghanistan', 'mumbai'],
  ['afghanistan', 'iran'],
  ['iran', 'moscow'],
  ['iran', 'afghanistan'],
  ['iran', 'mumbai'],
  ['iran', 'indianocean'],
  ['iran', 'neareast'],
  ['iran', 'turkey'],
  ['turkey', 'rome'],
  ['turkey', 'moscow'],
  ['turkey', 'iran'],
  ['turkey', 'neareast'],
  ['turkey', 'mediterraneansea'],
  ['neareast', 'mediterraneansea'],
  ['neareast', 'turkey'],
  ['neareast', 'iran'],
  ['neareast', 'indianocean'],
  ['neareast', 'northafrica'],
  ['northafrica', 'northatlantic'],
  ['northafrica', 'mediterraneansea'],
  ['northafrica', 'neareast'],
  ['northafrica', 'indianocean'],
  ['northafrica', 'eastafrica'],
  ['northafrica', 'nigeria'],
  ['northafrica', 'guinea'],
  ['guinea', 'northatlantic'],
  ['guinea', 'northafrica'],
  ['guinea', 'nigeria'],
  ['guinea', 'gulfofguinea'],
  ['nigeria', 'guinea'],
  ['nigeria', 'northafrica'],
  ['nigeria', 'eastafrica'],
  ['nigeria', 'congo'],
  ['nigeria', 'gulfofguinea'],
  ['congo', 'nigeria'],
  ['congo', 'eastafrica'],
  ['congo', 'southafrica'],
  ['congo', 'gulfofguinea'],
  ['southafrica', 'gulfofguinea'],
  ['southafrica', 'congo'],
  ['southafrica', 'eastafrica'],
  ['southafrica', 'indianocean'],
  ['eastafrica', 'northafrica'],
  ['eastafrica', 'indianocean'],
  ['eastafrica', 'southafrica'],
  ['eastafrica', 'congo'],
  ['eastafrica', 'nigeria'],
  ['mumbai', 'iran'],
  ['mumbai', 'afghanistan'],
  ['mumbai', 'newdelhi'],
  ['mumbai', 'chennai'],
  ['mumbai', 'indianocean'],
  ['newdelhi', 'afghanistan'],
  ['newdelhi', 'urumqi'],
  ['newdelhi', 'kolkata'],
  ['newdelhi', 'mumbai'],
  ['kolkata', 'newdelhi'],
  ['kolkata', 'urumqi'],
  ['kolkata', 'chongqing'],
  ['kolkata', 'indochina'],
  ['kolkata', 'indianocean'],
  ['kolkata', 'chennai'],
  ['kolkata', 'mumbai'],
  ['chennai', 'mumbai'],
  ['chennai', 'kolkata'],
  ['chennai', 'indianocean'],
  ['indochina', 'kolkata'],
  ['indochina', 'chongqing'],
  ['indochina', 'shanghai'],
  ['indochina', 'chinasea'],
  ['indochina', 'indianocean'],
  ['philippines', 'chinasea'],
  ['indonesia', 'chinasea'],
  ['indonesia', 'indianocean'],
  ['indonesia', 'tasmansea'],
  ['australia', 'tasmansea'],
  ['newzealand', 'tasmansea'],
  ['northpacific', 'alaska'],
  ['northpacific', 'canada'],
  ['northpacific', 'sanfrancisco'],
  ['northpacific', 'mexico'],
  ['northpacific', 'colombia'],
  ['northpacific', 'seaofjapan'],
  ['northpacific', 'chinasea'],
  ['northpacific', 'caribbeansea'],
  ['northpacific', 'southpacific'],
  ['southpacific', 'chinasea'],
  ['southpacific', 'tasmansea'],
  ['southpacific', 'peru'],
  ['southpacific', 'argentina'],
  ['southpacific', 'northpacific'],
  ['caribbeansea', 'northatlantic'],
  ['caribbeansea', 'gulfofguinea'],
  ['caribbeansea', 'southatlantic'],
  ['caribbeansea', 'fortaleza'],
  ['caribbeansea', 'manaus'],
  ['caribbeansea', 'colombia'],
  ['caribbeansea', 'northpacific'],
  ['caribbeansea', 'mexico'],
  ['caribbeansea', 'neworleans'],
  ['northatlantic', 'quebec'],
  ['northatlantic', 'london'],
  ['northatlantic', 'murmansk'],
  ['northatlantic', 'paris'],
  ['northatlantic', 'mediterraneansea'],
  ['northatlantic', 'northafrica'],
  ['northatlantic', 'guinea'],
  ['northatlantic', 'gulfofguinea'],
  ['northatlantic', 'caribbeansea'],
  ['northatlantic', 'newyork'],
  ['southatlantic', 'argentina'],
  ['southatlantic', 'riodejaneiro'],
  ['southatlantic', 'caribbeansea'],
  ['southatlantic', 'gulfofguinea'],
  ['southatlantic', 'indianocean'],
  ['southatlantic', 'southpacific'],
  ['gulfofguinea', 'northatlantic'],
  ['gulfofguinea', 'guinea'],
  ['gulfofguinea', 'nigeria'],
  ['gulfofguinea', 'congo'],
  ['gulfofguinea', 'southafrica'],
  ['gulfofguinea', 'indianocean'],
  ['gulfofguinea', 'southatlantic'],
  ['gulfofguinea', 'caribbeansea'],
  ['mediterraneansea', 'northatlantic'],
  ['mediterraneansea', 'paris'],
  ['mediterraneansea', 'rome'],
  ['mediterraneansea', 'turkey'],
  ['mediterraneansea', 'neareast'],
  ['mediterraneansea', 'indianocean'],
  ['mediterraneansea', 'northafrica'],
  ['indianocean', 'southatlantic'],
  ['indianocean', 'gulfofguinea'],
  ['indianocean', 'southafrica'],
  ['indianocean', 'eastafrica'],
  ['indianocean', 'neareast'],
  ['indianocean', 'mediterraneansea'],
  ['indianocean', 'iran'],
  ['indianocean', 'mumbai'],
  ['indianocean', 'chennai'],
  ['indianocean', 'kolkata'],
  ['indianocean', 'indochina'],
  ['indianocean', 'indonesia'],
  ['indianocean', 'chinasea'],
  ['indianocean', 'tasmansea'],
  ['seaofjapan', 'vladivostok'],
  ['seaofjapan', 'japan'],
  ['seaofjapan', 'korea'],
  ['seaofjapan', 'northpacific'],
  ['seaofjapan', 'chinasea'],
  ['chinasea', 'shanghai'],
  ['chinasea', 'beijing'],
  ['chinasea', 'korea'],
  ['chinasea', 'seaofjapan'],
  ['chinasea', 'northpacific'],
  ['chinasea', 'southpacific'],
  ['chinasea', 'tasmansea'],
  ['chinasea', 'philippines'],
  ['chinasea', 'indonesia'],
  ['chinasea', 'indochina'],
  ['tasmansea', 'australia'],
  ['tasmansea', 'newzealand'],
  ['tasmansea', 'chinasea'],
  ['tasmansea', 'southpacific'],
  ['tasmansea', 'indonesia'],
  ['tasmansea', 'indianocean'],
];

export default new GameBoard({ nodes, edges });
