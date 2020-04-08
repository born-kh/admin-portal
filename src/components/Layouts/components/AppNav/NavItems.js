// function MainNav(permissions) {
//   var Nav = [];
//   if (permissions) {
//     if (permissions.ACC_SYS_MODIFY_TRACER_MANAGER === 'ALLOW') {
//       Nav.push({
//         icon: 'pe-7s-rocket',
//         label: 'Tracer-Manager',
//         content: [
//           {
//             label: 'Tracers',
//             to: '/tracer-manager/tracers'
//           }
//         ]
//       });
//     }

//     if (permissions.ACC_SYS_MODIFY_PASSPORT_MANAGER === 'ALLOW') {
//       Nav.push({
//         icon: 'pe-7s-plugin',
//         label: 'Passport-Manager',

//         content: [
//           {
//             label: 'New Documents',
//             to: '/passport-manager/applications'
//           },
//           {
//             label: 'Search Account',
//             to: '/passport-manager/search'
//           }
//         ]
//       });
//     }

//     if (permissions.ACC_SYS_MODIFY_USER_MANAGER === 'ALLOW') {
//       Nav.push({
//         icon: 'pe-7s-browser',
//         label: 'User-Manager',
//         content: [
//           {
//             label: 'Users',
//             to: '/user-manager/users'
//           }
//         ]
//       });
//     }
//   }
//   return Nav;
// }

// export default MainNav;

export const MainNav = [
  {
    icon: 'pe-7s-browser',
    label: 'User-Manager',
    content: [
      {
        label: 'Users',
        to: '/user-manager/users'
      }
    ]
  },
  {
    icon: 'pe-7s-plugin',
    label: 'Passport-Manager',

    content: [
      {
        label: 'New Documents',
        to: '/passport-manager/applications'
      }
    ]
  },
  {
    icon: 'pe-7s-rocket',
    label: 'Tracer-Manager',
    content: [
      {
        label: 'Tracers',
        to: '/tracer-manager/tracers'
      }
    ]
  },
  {
    icon: 'pe-7s-rocket',
    label: 'ApiKey-Manager',
    content: [
      {
        label: 'ApiKey List',
        to: '/apikey-manager/apikeys'
      }
    ]
  }
];
