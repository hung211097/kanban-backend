export const PROVIDE_NAMES = {
  USER_MODEL: 'USER_MODEL',
  DATABASE_MONGO_CONNECTION: 'DATABASE_MONGO_CONNECTION',
  COUNTER_MODEL: 'COUNTER_MODEL',
  BOARD_MODEL: 'BOARD_MODEL'
};

export enum TAG {
  IOS = 'iOS',
  ANDROID = 'Android',
  WEB = 'Web',
  DESKTOP = 'Desktop'
}

export enum TYPE_LINK {
  DOCUMENT = 1,
  PROJECT = 2,
  DESIGN = 3,
}

export const DATA_SEEDING = [
  {
    id: '1',
    title: 'Pending Task',
    titleBgColor: '#1C5A7C',
    tasks: [],
  },
  {
    id: '2',
    title: 'Ongoing Task',
    titleBgColor: '#106354',
    tasks: [],
  },
  {
    id: '3',
    title: 'Completed',
    titleBgColor: '#54117D',
    tasks: [],
  },
  {
    id: '4',
    title: 'In Development',
    titleBgColor: '#71441B',
    tasks: [],
  },
  {
    id: '5',
    title: 'Live in Build',
    titleBgColor: '#6E6D6D',
    tasks: [],
  }
]