export const db = {
  users: [
    {
      id: '6b6e261f-3dbe-45ae-9ac4-6f6da02e289c',
      login: 'Tonni',
      password: 'secret',
      version: 0.1,
      createdAt: 1657700046,
      updatedAt: 1657700046,
    },
    {
      id: '6b6e261f-3dbe-45ae-9ac4-6f6da02e289b',
      login: 'Artur',
      password: 'world',
      version: 0.1,
      createdAt: 1657700046,
      updatedAt: 1657700046,
    },
  ],
  tracks: [
    {
      id: '6b6e261f-3dbe-45ae-9ac4-6f6da02e289a',
      name: 'new track',
      artistId: null,
      albumId: null,
      duration: 5,
    },
    {
      id: '6b6e261f-3dbe-45ae-9ac4-6f6da02e289d',
      name: 'mega track',
      artistId: null,
      albumId: null,
      duration: 4,
    },
  ],
  artists: [
    {
      id: '6b6e261f-3dbe-45ae-9ac4-6f6da02e287b',
      name: 'Linkin park',
      grammy: true,
    },
    {
      id: '6b6e261f-3dbe-45ae-9ac4-6f6da02e288b',
      name: 'Ocean',
      grammy: false,
    },
  ],
  albums: [
    {
      id: '6b6e261f-3dbe-45ae-9ac4-6f6da02e288c',
      name: 'mega alb',
      year: 1988,
      artistId: '6b6e261f-3dbe-45ae-9ac4-6f6da02e287b',
    },
    {
      id: '6b6e261f-3dbe-45ae-9ac4-6f6da02e288d',
      name: 'world',
      year: 2001,
      artistId: '6b6e261f-3dbe-45ae-9ac4-6f6da02e287b',
    },
  ],
  favorites: [],
};
