import { CanDeactivateFn } from '@angular/router';
import { MemberProfile } from '../../features/members/member-profile/member-profile';

export const preventChangeGuard: CanDeactivateFn<MemberProfile> =
  (component, currentRoute, currentState, nextState) => {

   
    if (!component.editForm?.dirty) {
      return true;
    }

  
    return confirm('You have unsaved changes. Are you sure you want to leave?');
};
