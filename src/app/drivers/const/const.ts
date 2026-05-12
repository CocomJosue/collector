import { Country } from "../../core/models/country.interface";
import { Group } from "../../core/models/group.interface";

export const TOTAL_COUNT = 994;

export const APP_URL = 'https://app-collector.netlify.app/'

export const GROUPS: Group[] = [
  { 
    letter: 'Grupo A',
    countries: [
      { code: 'MEX', name: 'México', group: 'A' },
      { code: 'RSA', name: 'Sudáfrica', group: 'A' },
      { code: 'KOR', name: 'Corea', group: 'A' },
      { code: 'CZE', name: 'Chequia', group: 'A' },
    ]
  },
  { 
    letter: 'Grupo B',
    countries: [
      { code: 'CAN', name: 'Canadá', group: 'B' },
      { code: 'BIH', name: 'Bosnia y Herzegovina', group: 'B' },
      { code: 'QAT', name: 'Qatar', group: 'B' },
      { code: 'SUI', name: 'Suiza', group: 'B' },
    ]
  },
  { 
    letter: 'Grupo C',
    countries: [
      { code: 'BRA', name: 'Brasil', group: 'C' },
      { code: 'MAR', name: 'Marruecos', group: 'C' },
      { code: 'HAI', name: 'Haití', group: 'C' },
      { code: 'SCO', name: 'Escocia', group: 'C' },
    ]
  },
  { 
    letter: 'Grupo D',
    countries: [
      { code: 'USA', name: 'Estados Unidos', group: 'D' },
      { code: 'PAR', name: 'Paraguay', group: 'D' },
      { code: 'AUS', name: 'Australia', group: 'D' },
      { code: 'TUR', name: 'Turquía', group: 'D' },
    ]
  },
  { 
    letter: 'Grupo E',
    countries: [
      { code: 'GER', name: 'Alemania', group: 'E' },
      { code: 'CUW', name: 'Curazao', group: 'E' },
      { code: 'CIV', name: 'Costa de Marfil', group: 'E' },
      { code: 'ECU', name: 'Ecuador', group: 'E' },
    ]
  },
  { 
    letter: 'Grupo F',
    countries: [
      { code: 'NED', name: 'Países Bajos', group: 'F' },
      { code: 'JPN', name: 'Japón', group: 'F' },
      { code: 'SWE', name: 'Suecia', group: 'F' },
      { code: 'TUN', name: 'Túnez', group: 'F' },
    ]
  },
  { 
    letter: 'Grupo G',
    countries: [
      { code: 'BEL', name: 'Bélgica', group: 'G' },
      { code: 'EGY', name: 'Egipto', group: 'G' },
      { code: 'IRN', name: 'Irán', group: 'G' },
      { code: 'NZL', name: 'Nueva Zelanda', group: 'G' },
    ]
  },
  { 
    letter: 'Grupo H',
    countries: [
      { code: 'ESP', name: 'España', group: 'H' },
      { code: 'CPV', name: 'Cabo Verde', group: 'H' },
      { code: 'KSA', name: 'Arabia Saudita', group: 'H' },
      { code: 'URU', name: 'Uruguay', group: 'H' },
    ]
  },
  { 
    letter: 'Grupo I',
    countries: [
      { code: 'FRA', name: 'Francia', group: 'I' },
      { code: 'SEN', name: 'Senegal', group: 'I' },
      { code: 'IRQ', name: 'Irak', group: 'I' },
      { code: 'NOR', name: 'Noruega', group: 'I' },
    ]
  },
  { 
    letter: 'Grupo J',
    countries: [
      { code: 'ARG', name: 'Argentina', group: 'J' },
      { code: 'ALG', name: 'Argelia', group: 'J' },
      { code: 'AUT', name: 'Austria', group: 'J' },
      { code: 'JOR', name: 'Jordania', group: 'J' },
    ]
  },
  { 
    letter: 'Grupo K',
    countries: [
      { code: 'POR', name: 'Portugal', group: 'K' },
      { code: 'COD', name: 'RD Congo', group: 'K' },
      { code: 'UZB', name: 'Uzbekistán', group: 'K' },
      { code: 'COL', name: 'Colombia', group: 'K' },
    ]
  },
  { 
    letter: 'Grupo L',
    countries: [
      { code: 'ENG', name: 'Inglaterra', group: 'L' },
      { code: 'CRO', name: 'Croacia', group: 'L' },
      { code: 'GHA', name: 'Ghana', group: 'L' },
      { code: 'PAN', name: 'Panamá', group: 'L' },
    ]
  },
  {
    letter: 'Especiales',
    countries:[
      { code: 'FWC', name: 'Fifa World Cup', group:'S' },
      { code: 'CC', name: 'Coca-Cola', group:'S' },
    ]
  }
];

export const COUNTRIES: Country[] = [
  { code: 'MEX', name: 'México', group: 'A' },
  { code: 'RSA', name: 'Sudáfrica', group: 'A' },
  { code: 'KOR', name: 'Corea', group: 'A' },
  { code: 'CZE', name: 'Chequia', group: 'A' },
  { code: 'CAN', name: 'Canadá', group: 'B' },
  { code: 'BIH', name: 'Bosnia y Herzegovina', group: 'B' },
  { code: 'QAT', name: 'Qatar', group: 'B' },
  { code: 'SUI', name: 'Suiza', group: 'B' },
  { code: 'BRA', name: 'Brasil', group: 'C' },
  { code: 'MAR', name: 'Marruecos', group: 'C' },
  { code: 'HAI', name: 'Haití', group: 'C' },
  { code: 'SCO', name: 'Escocia', group: 'C' },
  { code: 'USA', name: 'Estados Unidos', group: 'D' },
  { code: 'PAR', name: 'Paraguay', group: 'D' },
  { code: 'AUS', name: 'Australia', group: 'D' },
  { code: 'TUR', name: 'Turquía', group: 'D' },
  { code: 'GER', name: 'Alemania', group: 'E' },
  { code: 'CUW', name: 'Curazao', group: 'E' },
  { code: 'CIV', name: 'Costa de Marfil', group: 'E' },
  { code: 'ECU', name: 'Ecuador', group: 'E' },
  { code: 'NED', name: 'Países Bajos', group: 'F' },
  { code: 'JPN', name: 'Japón', group: 'F' },
  { code: 'SWE', name: 'Suecia', group: 'F' },
  { code: 'TUN', name: 'Túnez', group: 'F' },
  { code: 'BEL', name: 'Bélgica', group: 'G' },
  { code: 'EGY', name: 'Egipto', group: 'G' },
  { code: 'IRN', name: 'Irán', group: 'G' },
  { code: 'NZL', name: 'Nueva Zelanda', group: 'G' },
  { code: 'ESP', name: 'España', group: 'H' },
  { code: 'CPV', name: 'Cabo Verde', group: 'H' },
  { code: 'KSA', name: 'Arabia Saudita', group: 'H' },
  { code: 'URU', name: 'Uruguay', group: 'H' },
  { code: 'FRA', name: 'Francia', group: 'I' },
  { code: 'SEN', name: 'Senegal', group: 'I' },
  { code: 'IRQ', name: 'Irak', group: 'I' },
  { code: 'NOR', name: 'Noruega', group: 'I' },
  { code: 'ARG', name: 'Argentina', group: 'J' },
  { code: 'ALG', name: 'Argelia', group: 'J' },
  { code: 'AUT', name: 'Austria', group: 'J' },
  { code: 'JOR', name: 'Jordania', group: 'J' },
  { code: 'POR', name: 'Portugal', group: 'K' },
  { code: 'COD', name: 'RD Congo', group: 'K' },
  { code: 'UZB', name: 'Uzbekistán', group: 'K' },
  { code: 'COL', name: 'Colombia', group: 'K' },
  { code: 'ENG', name: 'Inglaterra', group: 'L' },
  { code: 'CRO', name: 'Croacia', group: 'L' },
  { code: 'GHA', name: 'Ghana', group: 'L' },
  { code: 'PAN', name: 'Panamá', group: 'L' },
  { code: 'FWC', name: 'Fifa World Cup', group:'S' },
  { code: 'CC', name: 'Coca-Cola', group:'S' },
];
