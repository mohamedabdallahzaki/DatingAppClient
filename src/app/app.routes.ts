import { Routes } from '@angular/router';
import { HomePage } from '../features/home-page/home-page';

import { Message } from '../features/message/message';
import { List } from '../features/list/list';
import { authGuard } from '../core/guards/auth-guard';
import { NotFound } from './shared/notFound/not-found/not-found';
import { MembersList } from '../features/members/members-list/members-list';
import { MembersDetalied } from '../features/members/members-detalied/members-detalied';
import { ServerError } from './shared/server-Error/server-error/server-error';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MembersList },
      { path: 'members/:id', component: MembersDetalied },
      { path: 'list', component: List },
      { path: 'message', component: Message },
    ],
  },
  {path:'ServerError',component:ServerError},
  {path:'Not-Found',component:NotFound},
  { path: '**', component: NotFound },
];
