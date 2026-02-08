import { Routes } from '@angular/router';
import { HomePage } from '../features/home-page/home-page';


import { List } from '../features/list/list';
import { authGuard } from '../core/guards/auth-guard';
import { NotFound } from './shared/notFound/not-found/not-found';
import { MembersList } from '../features/members/members-list/members-list';
import { MembersDetalied } from '../features/members/members-detalied/members-detalied';
import { ServerError } from './shared/server-Error/server-error/server-error';
import { MemberProfile } from '../features/members/member-profile/member-profile';
import { MemberMessage } from '../features/members/member-message/member-message';
import { memberResloverResolver } from './src/features/members/member-reslover-resolver';
import { MemberPhotos } from '../features/members/member-photos/member-photos';
import { Message } from '../features/message/message';
import { preventChangeGuard } from '../core/guards/prevent-change-guard';

export const routes: Routes = [
  { path: '', component: HomePage },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MembersList },
      { path: 'members/:id', component: MembersDetalied, 
        resolve:{member:memberResloverResolver},
        runGuardsAndResolvers:'always',
        children:[
          {path:'' , redirectTo: 'profile', pathMatch:'full'},
          {path:"profile",component: MemberProfile, title:'Profile',canDeactivate:[preventChangeGuard]},
          {path:"photos",component: MemberPhotos, title:'Photos'},
          {path:"message",component: MemberMessage, title:'Message'}
        ]
      },
      { path: 'list', component: List },
      { path: 'message', component: Message },
    ],
  },
  {path:'ServerError',component:ServerError},
  {path:'Not-Found',component:NotFound},
  { path: '**', component: NotFound },
];
