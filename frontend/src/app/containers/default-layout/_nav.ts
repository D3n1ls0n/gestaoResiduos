import { INavData } from '@coreui/angular';

const cliente_id: any = localStorage.getItem('cliente_id');
const empresa_id: any = localStorage.getItem('empresa_id');
const is_superadmin: any = localStorage.getItem('is_superadmin');

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
    class: cliente_id > 0 || is_superadmin == 'true' ? '' : 'd-none',
  },
  {
    name: 'Resíduos',
    url: '/sadness',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-drop' },
    class: cliente_id > 0 || is_superadmin == 'true' ? '' : 'd-none',
  },
  {
    name: 'Itens Disponíveis',
    url: '/items',
    iconComponent: { name: 'cil-baby-carriage' },
    class:
      cliente_id > 0 || is_superadmin == 'true' || empresa_id > 0
        ? ''
        : 'd-none',
  },
  {
    name: 'Recompensas',
    url: '/rewards',
    iconComponent: { name: 'cil-gem' },
    class:
      cliente_id > 0 || is_superadmin == 'true' || empresa_id > 0
        ? ''
        : 'd-none',
  },
  {
    name: 'Empresas',
    url: '/company',
    iconComponent: { name: 'cil-home' },
    class: empresa_id > 0 || is_superadmin == 'true' ? '' : 'd-none',
  },
  /* {
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
  }, */
];
