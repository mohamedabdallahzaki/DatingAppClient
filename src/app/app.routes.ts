import { Routes } from '@angular/router';
import { HomePage } from '../features/home-page/home-page';
import { MemberList } from './features/members/member-list/member-list';
import { MemberDetalied } from './features/members/member-detalied/member-detalied';
import { Message } from '../features/message/message';
import { List } from '../features/list/list';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberList, canActivate: [authGuard] },
      { path: 'members/:id', component: MemberDetalied },
      { path: 'list', component: List },
      { path: 'message', component: Message },
    ],
  },

  { path: '**', component: HomePage },
];
