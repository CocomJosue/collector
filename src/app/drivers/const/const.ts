import { Group } from "../../core/models/group.interface";

export const GROUPS: Group[] = [
  { 
    letter: 'A',
    countries: [
      { code: 'MEX', name: 'México', colors: ['#1d6e4a', '#fafdfe'] },
      { code: 'RSA', name: 'Sudáfrica', colors: ['#c1c624', '#10400f'] },
      { code: 'KOR', name: 'Corea', colors: ['#c7383e', '#26479b'] },
      { code: 'CZE', name: 'Chequia', colors: ['#d22925', '#ffffff'] },
    ]
  },
  {
    letter: 'B',
    countries: [
      { code: 'CAN', name: 'Canadá', colors: ['#e54a39', '#fdfefb'] },
      { code: 'BIH', name: 'Bosnia y Herzegovina', colors: ['#100971', '#f4db2a'] },
    ]
  }
];