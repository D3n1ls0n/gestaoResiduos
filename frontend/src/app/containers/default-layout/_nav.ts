import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Menu Principal',
    url: '/dashboard',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Clientes',
    url: '/clients',

    iconComponent: { name: 'cil-User' },
  },
  {
    name: 'Resíduos',
    url: '/sadness',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-drop' },
  },
  {
    name: 'Itens Disponíveis',
    url: '/items',
    iconComponent: { name: 'cil-baby-carriage' },
  },
  {
    name: 'Recompensas',
    url: '/rewards',
    iconComponent: { name: 'cil-gem' },
  },
  {
    name: 'Empresas',
    url: '/company',
    iconComponent: { name: 'cil-home' },
  },
  {
    name: 'Configurações',
    url: '/base',
    iconComponent: { name: 'cil-cog' },
    children: [
      {
        name: 'Tipo de Recompensa',
        url: '/rewards-types',
        iconComponent: { name: 'cil-gem' },
      },
      {
        name: 'Tipo de Resíduo',
        url: '/wast-types',
        iconComponent: { name: 'cil-drop' },
      },
    ],
  },
];
