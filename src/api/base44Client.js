import { generateId } from '../utils';

const STORAGE_KEY = 'base44_games';
let memoryStore = [];

const seededGame = {
  title: 'Demo vs. Generics',
  opponent: 'Generics',
  tournament: 'Showcase',
  date: new Date().toISOString(),
  video_url: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
  analysis_status: 'completed',
  coach_notes: 'Try blitzing their high pick and roll to force the ball out early.',
};

const defaultReport = {
  key_players: [
    {
      name: 'Alex Johnson',
      number: '#3',
      position: 'Guard',
      strengths: ['Quick first step', 'Confident shooter'],
      weaknesses: ['Size in the post', 'Risky passing'],
      tendencies: 'Prefers right-hand drives and pull-up jumpers.',
    },
  ],
  offensive_sets: [
    {
      name: 'High Pick & Roll',
      frequency: '35%',
      description: 'Primary action with guard/big partnership to collapse defense.',
    },
  ],
  defensive_schemes: [
    {
      name: 'Man-to-Man',
      frequency: '70%',
      description: 'Aggressive on-ball pressure with help from the weak side.',
    },
  ],
  coaching_keys: [
    'Force the ball-handler left and shrink driving gaps.',
    'Make them finish through contact in the paint.',
    'Push pace in transition to exploit mismatches.',
  ],
};

function loadGames() {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      memoryStore = JSON.parse(stored);
      return memoryStore;
    }
  }

  if (memoryStore.length === 0) {
    const seeded = {
      id: generateId(),
      created_date: new Date().toISOString(),
      scouting_report: defaultReport,
      ...seededGame,
    };
    memoryStore = [seeded];
    saveGames(memoryStore);
  }

  return memoryStore;
}

function saveGames(games) {
  memoryStore = games;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
  }
}

function normalizeFileUrl(file) {
  if (!file) return '';
  if (typeof file === 'string') return file;
  if (typeof URL !== 'undefined' && file instanceof File) {
    return URL.createObjectURL(file);
  }
  return '';
}

export const base44 = {
  integrations: {
    Core: {
      async UploadFile({ file }) {
        return { file_url: normalizeFileUrl(file) };
      },
      async InvokeLLM() {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return defaultReport;
      },
    },
  },
  entities: {
    Game: {
      async create(data) {
        const games = loadGames();
        const newGame = {
          id: generateId(),
          created_date: new Date().toISOString(),
          scouting_report: defaultReport,
          ...data,
        };
        games.unshift(newGame);
        saveGames(games);
        return newGame;
      },
      async update(id, updates) {
        const games = loadGames();
        const idx = games.findIndex((g) => g.id === id);
        if (idx !== -1) {
          games[idx] = { ...games[idx], ...updates };
          saveGames(games);
          return games[idx];
        }
        return null;
      },
      async filter({ id }) {
        const games = loadGames();
        if (!id) return [];
        return games.filter((g) => g.id === id);
      },
      async list(sort) {
        const games = loadGames();
        if (sort === '-created_date') {
          return [...games].sort(
            (a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()
          );
        }
        return games;
      },
    },
  },
};
