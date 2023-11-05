export interface IMenuItem {
  label: string
  url: string
}

export const menuItems: IMenuItem[] = [
  {
    label: 'Supervisors',
    url: '/',
  },
  {
    label: 'Ordinances',
    url: '/ordinances',
  },
]
