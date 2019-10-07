import PERMISSIONS from 'constants';
import PROFILE_DATA from 'constants';

let permissions = JSON.parse(localStorage.getItem(PERMISSIONS));
let profile_data = JSON.parse(localStorage.getItem(PROFILE_DATA));
console.log('localPermission', profile_data);

var MainNav = [];
if (!permissions) {
  // const userManager = permissions.filter(obj => obj.SYS_MODIFY_USER_MANAGER);
  // const passportManager = permissions.filter(
  //   obj => obj.SYS_MODIFY_PASSPORT_MANAGER
  // );
  // const tracerManager = permissions.filter(
  //   obj => obj.SYS_MODIFY_TRACER_MANAGER
  // );

  if ('ALLOW' === 'ALLOW') {
    MainNav.push({
      icon: 'pe-7s-rocket',
      label: 'Tracer-Manager',
      content: [
        {
          label: 'Tracers',
          to: '#tracer-manager/tracers'
        }
      ]
    });
  }

  if ('ALLOW' === 'ALLOW') {
    MainNav.push({
      icon: 'pe-7s-plugin',
      label: 'Passport-Manager',
      content: [
        {
          label: 'New Documents',
          to: '#passport-manager/accounts'
        }
      ]
    });
  }

  if ('ALLOW' == 'ALLOW') {
    MainNav.push({
      icon: 'pe-7s-browser',
      label: 'User-Manager',
      content: [
        {
          label: 'Users',
          to: '#user-manager/users'
        }
      ]
    });
  }
}

export default MainNav;
