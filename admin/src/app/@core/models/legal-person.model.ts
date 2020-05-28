export const enum TypePerson {
  LLC = 'ТОО', // limited liability companies
  SP = 'ИП', // Sole Proprietor
  NP = 'ФЗ', // natural person
}

export const TypesPerson = [
  { key: TypePerson.LLC, value: 'ТОО' },
  { key: TypePerson.SP, value: 'ИП' },
  { key: TypePerson.NP, value: 'ФЗ' },
];

export class LegalPerson {
  id?: number;
  companyId?: number;

  name: string;
  type: TypePerson;
  personDetails: string;

  createdAt?: Date;
  updatedAt?: Date;
}
