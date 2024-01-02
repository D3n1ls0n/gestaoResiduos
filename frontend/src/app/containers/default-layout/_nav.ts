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
    name: 'Configurações',
    url: '/base',
    iconComponent: { name: 'cil-cog' },
    children: [
      {
        name: 'Empresas',
        url: '/company',
        iconComponent: { name: 'cil-home' },
      },
      {
        name: 'Recompensas',
        url: '/rewards',
        iconComponent: { name: 'cil-gem' },
      },
    ],
  },
];
